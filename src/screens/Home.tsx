import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

import PrimaryButton from '../components/PrimaryButton'

interface Props {
    title: string;
}

const Home: React.FC<Props> = ({title}) => {
    const navigate = useNavigate();
    return  <div>
        <img src={logo} className="App-logo" alt="logo-myeasyfarm"/>
        <div className="App">
        <header className="App-header">
            <h1>Welcome to MyEasyFarm</h1>
            <PrimaryButton title="View map" onClick={() => navigate("/map")} />
        </header>
    </div>
    </div>
}

export default Home;
