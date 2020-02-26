import React from 'react';
import Home from './components/Home'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Home/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
