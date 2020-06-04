import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useNetworkStatus } from 'react-adaptive-hooks/network';
import gambar2g from './3g.jpg';
import gambar4g from './4g.jpg';

function Home() {
    const { effectiveConnectionType } = useNetworkStatus();

    console.log(effectiveConnectionType);
    switch(effectiveConnectionType) {
        case 'slow-2g':
        return <img src={gambar2g} alt='low resolution' width="560" height="315" />;
        
        case '2g':
        return <img src={gambar2g} alt='medium resolution' width="560" height="315" />;
        
        case '3g':
        return <img src={gambar4g} alt='high resolution' width="560" height="315" />;
        
        case '4g':
        return <iframe title="4g" width="560" height="315" src="https://www.youtube.com/embed/pjhOjHDX0A8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
        
        default:
        return <div>INTERNET BAKIKUK</div>;   
    }
}
  
function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
}
  
function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
}

const App = () => {
    return (
        <Router>
      <div style={{margin: 50}}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default App;