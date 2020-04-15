import React from 'react';
import Home from './components/Home'
import About from './components/About'
import Animals from './components/Animals';
import Trails from './components/Trails';
import TrailStand from './components/Trails/TrailStand';
import States from './components/States'
import AnimalInstance from './components/Animals/AnimalInstance';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StateInstance from './components/States/StateInstance';

function App() {

  const [loading, setLoading] = React.useState('true');
  const [trailData, setTrailData] = React.useState([]);

  const loadTrailData = (page) => {
    fetch("https://api.hikeadvisor.me/api/trail?page=" + page)
      .then(response => response.json())
      .then(data => {
        console.log(data.total_pages)
        Promise.all(
          Array(data.total_pages)
            .fill()
            .map((_, i) => {
              return fetch("https://api.hikeadvisor.me/api/trail?page=" + i).then(response => response.json());

            }

            )

        ).then((all) => {
          setTrailData(all.map(x => x.objects).flat());
        })
      })

  }

  const loadAllData = () => {
    loadTrailData(1)
    setLoading("false");
  }

  React.useEffect(() => {
    loadAllData();
  }, []);


  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          borderRadius: 3,
          border: 0,
          color: "red",
          height: 48,
          padding: "0 30px",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .30)",
          background: "red",
          fontSize: '1rem',
        },
      },
    },
  });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/state/:stateId/:statePage">
              <StateInstance />
            </Route>
            <Route path="/states/:offset">
              <States />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/animal/:animalId">
              <AnimalInstance />
            </Route>
            <Route path="/animal/:animalId/:animalPage">
              <AnimalInstance />
            </Route>
            <Route path="/animals/:offset">
              <Animals />
            </Route>
            <Route path="/trail/:trailId/:trailPage">
              <TrailStand />
            </Route>
            <Route path="/trails/:offset">
              <Trails trailData={trailData} />
            </Route>
            <Route path="/">
              <Home loading={loading} />
            </Route>
          </Switch>
        </Router>


      </MuiThemeProvider>
    </div>
  );
}

export default App;
