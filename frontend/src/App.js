import React from 'react';
import Home from './components/Home'
import About from './components/About'
import Animals from './components/Animals';
import Trails from './components/Trails';
import TrailStand from './components/Trails/TrailStand';
import States from './components/States'
import California from './components/States/California'
import Colorado from './components/States/Colorado'
import Cardinal from './components/Animals/Cardinal'
import BaldEagle from './components/Animals/BaldEagle'
import Toad from './components/Animals/AmericanToad'
import Texas from './components/States/Texas'

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Router>
          <Switch>
          <Route path="/states/Colorado">
            <Colorado/>
          </Route>
          <Route path="/states/California">
            <California/>
          </Route>
          <Route path="/states/Texas">
            <Texas/>
          </Route>
          <Route path="/states">
              <States/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/animals/9083">
            <Cardinal/>
          </Route>
          <Route path="/animals/5305">
            <BaldEagle/>
          </Route>
          <Route path="/animals/64968">
            <Toad/>
          </Route>
            <Route path="/animals">
              <Animals/>
            </Route>
            <Route path="/trail/:trailId">
              <TrailStand/>
            </Route>
            <Route path="/trails">
              <Trails/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
