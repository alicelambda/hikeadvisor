import React from 'react';
import Home from './components/Home'
import About from './components/About'
import Animals from './components/Animals'
import States from './components/States'
import California from './components/States/California'
import Colorado from './components/States/Colorado'
import Texas from './components/States/Texas'
import StateInstance from './components/States/StateInstance.js'
import Trails from './components/Trails'
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
            <Route path="/animals">
              <Animals/>
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
