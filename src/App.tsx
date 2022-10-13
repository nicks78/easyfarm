import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import MyMap from './screens/Map';

import './App.css';

function App() {
  return  <BrowserRouter>
            <Routes>
              <Route index element={<Home  title='Welcome to MyEasyFarm'/>} />
              <Route path="map" element={<MyMap />} />
            </Routes>
          </BrowserRouter>
}


export default App;
