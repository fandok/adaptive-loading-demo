import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useNetworkStatus } from 'react-adaptive-hooks/network';
import useAdaptiveLoading from './useAdaptiveLoading';
import gambar2g from './3g.jpg';
import gambar4g from './4g.jpg';
import morbius from './movie.mp4';

const Home = () => {
  const { effectiveConnectionType } = useNetworkStatus();

  const renderContent = () => {
    switch(effectiveConnectionType) {
        case 'slow-2g':
        return <div>HARUSNYA GAMBAR HEHE</div>;
        
        case '2g':
        return <img src={gambar2g} alt='medium resolution' width="560" height="315" />;
        
        case '3g':
        return <img src={gambar4g} alt='high resolution' width="560" height="315" />;
        
        case '4g':
        return <video width="560" height="315" controls>
          <source src={morbius} type='video/mp4' />
        </video>;
        
        default:
        return <div>INTERNET BAKIKUK</div>;   
    }
  }

  return (
    <div>
      <p>Network Type: {effectiveConnectionType}</p>
      {renderContent()}
    </div>
  )
}

const Lite = () => {
const { networkType, deviceMemory, processorCore, downlink, isMobile } = useAdaptiveLoading();

  return (
  <div>
    <p>Tipe Koneksi: {networkType}</p>
  <p>Device Memory: {deviceMemory} (Maksimal 8)</p>
  <p>Processor Core: {processorCore} (Jumlah thread-nya, 1 core = 2 thread)</p>
  <p>Downlink: {downlink}</p>
  <p>isMobile: {String(isMobile)}</p>
  </div>
)
}

const App = () => {
    return (
        <Router>
      <div style={{margin: 50}}>
        <ul>
          <li>
            <Link to="/">Google Adaptive Hooks</Link>
          </li>
          <li>
            <Link to="/lite">Lite Adaptive Hooks</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/lite">
            <Lite />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default App;