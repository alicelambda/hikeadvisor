import React from 'react';
import Home from './components/Home'
import About from './components/About'
import Animals from './components/Animals';
import Trails from './components/Trails';
import TrailInstance from './components/Trails/TrailInstance';
import States from './components/States'
import AnimalInstance from './components/Animals/AnimalInstance';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Visualization from './components/Visualization';
import animalData from './components/Animals/animalData';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StateInstance from './components/States/StateInstance';

function App() {

  const [loading, setLoading] = React.useState('true');
  const [stateData, setStateData] = React.useState([]);
  const [trailData, setTrailData] = React.useState([]);
 

  const loadTrailData = (page) => {
    fetch("https://api.hikeadvisor.me/api/trail?page=" + page)
      .then(response => response.json())
      .then(data => {
        Promise.all(
          Array(data.total_pages + 1)
            .fill()
            .map((_, i) => {
              return fetch("https://api.hikeadvisor.me/api/trail?page=" + (i + 1)).then(response => response.json());

            }

            )

        ).then((all) => {
          setTrailData(all.map(x => x.objects).flat());
        })
      })

  }

  const loadStateData = (page) => {
    fetch("https://api.hikeadvisor.me/api/state?page=" + page)
      .then(response => response.json())
      .then(data => {
        Promise.all(
          Array(data.total_pages + 1)
            .fill()
            .map((_, i) => {
              return fetch("https://api.hikeadvisor.me/api/state?page=" + (i + 1)).then(response => response.json());

            }
            )

        ).then((all) => {
          setStateData(all.map(x => x.objects).flat());
        })
      })

  }



  const highSort = (selector,order) => {
    console.log(selector,order);
    const sign = order ? 1 : -1;
    const compare = (fst, snd) => {
      return sign * (snd[selector] - fst[selector]);
    }
    return compare;
  }

  const globalSortBy = (selector,order) => {
    return new Promise((resolve, reject) => {
      const trailDataCopy = trailData.slice();
      trailDataCopy.sort(highSort(selector,order));
      setTrailData(trailDataCopy);
      resolve("done sorting")
    });
  };

  const animalSortBy = (selector,order) => {
    return new Promise((resolve, reject) => {
      const animalDataCopy = animalData.slice();
      animalDataCopy.sort(highSort(selector,order));
      resolve("done sorting")
    });
  };

  const stateSortBy = (selector,order) => {
    return new Promise((resolve, reject) => {
      const stateDataCopy = stateData.slice();
      stateDataCopy.sort(highSort(selector,order));
      setStateData(stateDataCopy);
      resolve("done sorting")
    });
  };

  const loadAllData = () => {
    loadTrailData(1)
    loadStateData(1)
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
            <Route path="/state/:stateId">
              <StateInstance stateData={stateData}/>
            </Route>
            <Route path="/states/:offset">
              <States stateData={stateData}
              globalSortBy={stateSortBy} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/animal/:animalId">
              <AnimalInstance animalData={animalData}/>
            </Route>
            <Route path="/animals/:offset">
              <Animals animalData={animalData}
              globalSortBy={animalSortBy} />
            </Route>
            <Route path="/trail/:trailId">
              <TrailInstance trailData={trailData} />
            </Route>
            <Route path="/trails/:offset">
              <Trails
                trailData={trailData}
                animalData={animalData}
                stateData={stateData}
                globalSortBy={globalSortBy}
              />
            </Route>
            <Route path="/visualization">
              <Visualization />
            </Route>
            <Route path="/">
              <Home
                loading={loading}
                trailData={trailData}
                animalData={animalData}
                stateData={stateData}
              />
            </Route>
          </Switch>
        </Router>


      </MuiThemeProvider>
    </div>
  );
}

export default App;
