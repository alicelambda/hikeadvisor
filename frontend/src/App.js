import React from 'react';
import About from './About/About'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <About/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
