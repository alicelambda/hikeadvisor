import React from 'react';
import Home from './components/Home'
import About from './components/About'
import Animals from './components/Animals'
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
          <Route path="/about">
              <About/>
            </Route>
            <Route path="/animals">
              <Animals/>
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
