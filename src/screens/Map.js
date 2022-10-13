import React from 'react'
import {Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';
import partfieldsData from '../api/partfields.json'
import soilmapsData from '../api/soilmaps.json'
import logo from '../assets/logo.png';

const initPosition = {
    lat: 49.678206, lng: 4.957082
}

const MyMapContainer = ({google}) => {

    const [currentPolygon, setCurrentPolygon] = React.useState([])
    const [mapData, setMapData] = React.useState(null)
    const [showInfoMap, setShowInfoMap] = React.useState(false)
    const [infoWindowPosition, setInfoWindowPosition] = React.useState(initPosition)
    const [previewMap, setPreviewMap] = React.useState([])

    const onCloseInfoWindow = () => {
        setInfoWindowPosition(null)
        setShowInfoMap(false)
        setMapData(null)
    }

    const constructCoordinatesArray = (data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tmp = {
                ...data[i],
                coords: []
            }
            for (let x = 0; x < data[i].boundaries.coordinates[0][0].length; x++) {
                let coords = {
                    lat: data[i].boundaries.coordinates[0][0][x][1],
                    lng: data[i].boundaries.coordinates[0][0][x][0],
                };
                tmp.coords.push(coords)
            }
            arr.push(tmp)
        }
        return arr
    }

    const handleSelectMap = (id, position) => {
        // Fecth list of maps
        const _mapData = soilmapsData.items.filter((element => element.partfield_id === id));
        if(_mapData[0]){
            setMapData(_mapData[0]);
            setShowInfoMap(true);
            setInfoWindowPosition({lat: position.lat, lng: position.lng})
        }else{
            onCloseInfoWindow();
        }
    }

    const onPreviewMap = (coordinates) => {
        let arr = []
        for (let x = 0; x < coordinates[0][0].length; x++) {
            let coords = {
                lat: coordinates[0][0][x][1],
                lng: coordinates[0][0][x][0]
            };
            arr.push(coords)
        }
        setPreviewMap(arr)
    }

    const map = React.useRef(onPreviewMap);

    React.useEffect(() => {
        const array  = constructCoordinatesArray(partfieldsData.items);
        setCurrentPolygon(array)
    }, [])

    return  <>
        <img src={logo} className="App-logo" alt="logo-myeasyfarm"/>
            <Map 
                google={google}
                zoomControlOptions={{
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT
                }}
                initialCenter={initPosition}
                style={{width: '100%', height: '100%', position: 'relative'}}
                onClick={e => {
                    if (!e.event.target.closest('.info-window')) {
                        alert('ok')
                    }
                }}
                zoom={14}>
                    {
                        currentPolygon.map((item, index) => {
                            return <Polygon
                                key={index}
                                paths={item.coords}
                                strokeColor={"#"+item.color_hex}
                                strokeOpacity={0.8}
                                strokeWeight={2}
                                fillColor={"#"+item.color_hex}
                                fillOpacity={0.35} 
                                onClick={() => handleSelectMap(item.id, item.coords[0])}
                            />
                        })
                    }
                    {
                        showInfoMap && 
                        <InfoWindow
                            position={infoWindowPosition}
                            visible={showInfoMap}
                            onCloseClick={() => onCloseInfoWindow()}
                        >
                        <div>
                            <h3>Available maps : </h3>
                            {   mapData && 
                                mapData.mapdata.features.map((item, index) => {
                                    // TODO fix error onclick event not trigger
                                    return <p key={index}>{item.properties.analysis}&nbsp;
                                            <p className='span-link' onClick={() => map.current(item.geometry.coordinates)}>Preview</p>
                                        </p>
                                })
                            }
                        </div>
                        </InfoWindow>
                    }
                    {
                        previewMap.length > 0 && 
                        <Polygon 
                            paths={previewMap}
                            strokeColor={"#0000ff"}
                            strokeOpacity={0.8}
                            strokeWeight={2}
                            fillColor={"#0000ff"}
                            fillOpacity={0.35} 
                        />
                    }
            </Map>
    </>
}

export default  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MyMapContainer);
