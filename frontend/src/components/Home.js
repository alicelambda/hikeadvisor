
import React, { Component } from 'react';
import '../styles/home.css';
import Navigation from '../components/Navigation';
import ReactSearchBox from 'react-search-box';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';


import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EnhancedTable from './EnhancedTable'

import img from '../images/forest.jpg';
import Highlight from 'react-highlighter';

import Paper from '@material-ui/core/Paper';
import { animalData } from './Animals/animalData';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',

  },
  mybody: {
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  HomeHeader: {
    /*background: '../static_resources/homephoto.jpg' no-repeat 'center';*/
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 100,
    flexDirection: 'column',
    fontFamily: "serif",
    width: '100%',
  },

  TitleSummary: {
    fontSize: '80px',
    fontFamily: "Montserrat",
    fontWeight: 'bold',
    textShadow: '1px 1px #3f3f3f;',
    /*filter: FlipH;*/

  },
  summary: {
    fontFamily: "Montserrat",
    fontSize: '25px',
    fontWeight: 'normal',
    textShadow: '1px 1px #3f3f3f',
    paddingBottom: 0,
  },
  search: {
    color: red,
    marginTop: '2%',
    width: '20%',
  },
  body: {
    backgroundColor: "#32dde3",
    minHeight: "100vh",
  }


});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#000000",
    backgroundColor: "#03d6a0",
    '&:hover': {
      backgroundColor: "#0dd6a0",
    },
  },
}))(Button);

const ColorText = withStyles((theme) => ({
  root: {

  }

}))(Typography);

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiPaper-root': {
      backgroundColor: "#06d6a0"
    }
  },
})(() => null);




export default function Home(props) {

  const classes = useStyles();
  const [trails, setTrails] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);
  const [states, setStates] = React.useState([]);

  const [trailPage, setTrailPage] = React.useState(0);
  const [trailRowsPerPage, setTrailRowsPerPage] = React.useState(10);

  const [animalPage, setAnimalPage] = React.useState(0);
  const [animalRowsPerPage, setAnimalRowsPerPage] = React.useState(10);

  const [statePage, setStatePage] = React.useState(0);
  const [stateRowsPerPage, setStateRowsPerPage] = React.useState(10);
  const [lquery, setQuery] = React.useState('');

  const searchGeneral = (query, trail, terms) => {
    const splitQuery = query.split(" ")
      .filter(term => term !== "")
    var i;
    var j;
    for (j = 0; j < terms.length; j++) {
      for (i = 0; i < splitQuery.length; i++) {
        if (trail[terms[j]].toLowerCase().includes(splitQuery[i].toLowerCase())) {
          return true
        }
      }
    }
    return false
  }


  const searchTerm = (query) => {
    setQuery(query)
    setTrails(
      props.trailData
        .filter(trail => searchGeneral(query, trail, ['trail_name', 'trail_location']))
        .map(trail => {
          return [
            trail.trail_name,
            trail.trail_location,
            trail.trail_length,
            trail.trail_stars,
            trail.trail_numstars,
            trail.trail_id]
          
        })
    )
    setAnimals(
      props.animalData
        .filter(animal => searchGeneral(query, animal, ['animal_commonName', 'animal_location']))
        .map(animal => createAnimalData(
          animal.animal_commonName,
          animal.animal_location,
          animal.animal_lastSighting,
          animal.animal_numObser,
          animal.animal_isExtinct,
          animal.animal_id

        ))
    )
    setStates(
      props.stateData
        .filter(state => searchGeneral(query, state, ['state_name']))
        .map(state => createStateData(
          state.state_name,
          state.state_capital,
          state.state_population,
          state.state_populationDensity,
          state.state_totalArea,

        ))
    )
  };

  function createTrailData(trailname, traillocation, length, ranking, noranking, trailid) {
    return { trailname, traillocation, length, ranking, noranking, trailid };
  }

  function createStateData(statename, capital, population, popdensity, landarea) {
    return { statename, capital, population, popdensity, landarea }
  }

  function createAnimalData(animalname, location, lastsighting, numsightings, isextinct, animalid) {
    const extinct = isextinct == false ? "No" : "Yes"
    return { animalname, location, lastsighting, numsightings, extinct, animalid }
  }

  const handleChangePage = (event, newPage) => {
    setTrailPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setTrailRowsPerPage(+event.target.value);
    setTrailPage(0);
  };




  const trailColumns = [
    { id: 'trailname', label: 'Name', minWidth: 200, maxWidth: 200 },
    { id: 'traillocation', label: 'Location', minWidth: 200, maxHeight: 200 },
    {
      id: 'length',
      label: 'Length',
    },
    {
      id: 'ranking',
      label: 'Ranking',
    },
    {
      id: 'noranking',
      label: 'No Rankings',
    },

  ];

  const animalColumns = [
    { id: 'animalname', label: 'Name' },
    { id: 'location', label: 'Location' },
    { id: 'lastsighting', label: "Last Sighting" },
    { id: 'numsightings', label: "Number of Sightings" },
    { id: 'extinct', label: "Is Extinct" },
  ]

  const stateColumns = [
    { id: 'statename', label: "Name" },
    { id: 'capital', label: "Capital" },
    { id: 'population', label: "Population" },
    { id: 'popdensity', label: "Population Density" },
    { id: 'landarea', label: "Land Area" },
  ]

  const renderRow = (column, row, value) => {
    let rendrow;
    const query = lquery.split(" ").filter(x => x !== " ")
    let text = <Highlight search={query.length > 0 ? new RegExp(query.reduce((a, b) => a.concat('|', b)), 'i') : ""}>{column.format && typeof value === 'number' ? column.format(value) : value}</Highlight>
    if (column.id == "location" || column.id == 'statename') {
      rendrow = <TableCell key={column.id} align={column.align}>
        <Link to={"/state/" + value} style={{ textDecoration: 'none' }}> {text} </Link>
      </TableCell>
    } else if (column.id == "traillocation") {
      const state = value.split(", ")[1]
      rendrow = <TableCell key={column.id} align={column.align}>
        <Link to={"/state/" + state} style={{ textDecoration: 'none' }}> {text} </Link>
      </TableCell>
    } else if (column.id == "trailname") {
      const id = row['trailid'];
      rendrow = <TableCell key={column.id} align={column.align}>
        <Link to={"/trail/" + id} style={{ textDecoration: 'none' }}> {text}  </Link>
      </TableCell>
    } else if (column.id == "animalname") {
      const id = row['animalid'];
      rendrow = <TableCell key={column.id} align={column.align}>
        <Link to={"/animal/" + id} style={{ textDecoration: 'none' }}> {text}  </Link>
      </TableCell>

    } else {
      rendrow = <TableCell key={column.id} align={column.align}>
        {text}
      </TableCell>

    }

    return rendrow;
  }

 
  const trailHeadCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'length', numeric: true, disablePadding: false, label: 'Length' },
    { id: 'ranking', numeric: true, disablePadding: false, label: 'Ranking' },
    { id: 'noranking', numeric: true, disablePadding: false, label: 'No. Rankings' },
  ];

  
  const renderTable = (columns, page, rowsPerPage, rows) => {
    return <Paper >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (

                      renderRow(column, row, value)


                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  }
  const isQuery = lquery.length == 0
  return (
    <div>
      <Navigation upcall={searchTerm}
        loading={props.loading} />

      {isQuery ?
        <div>
          <GlobalCss />
          <body id='mybody' background={img} className="home">
            <header className="Home-header">
              <div className="Title-summary">
                HikeAdvisor
              </div>
              <div className="summary">
                Here to plan your next hike
              </div>
              <div className="search">
                <Link to="/trails/0" style={{ textDecoration: 'none' }}>
                  <ColorButton variant="contained" color="primary">
                    Find A Trail
              </ColorButton>
                </Link>
              </div>
            </header>
          </body>
        </div>

        :

        <div className={classes.body}>
          <GlobalCss />
          <Typography variant="h2">Animals</Typography>

          {renderTable(animalColumns, animalPage, animalRowsPerPage, animals)}

          <Typography variant="h2">States</Typography>
          {renderTable(stateColumns, statePage, stateRowsPerPage, states)}


          <Typography variant="h2">Trails</Typography>
          {renderTable(trailColumns, trailPage, trailRowsPerPage, [])}

          {<EnhancedTable rows={trails}
                          headCells={trailHeadCells}
                          name={""}
                                />}
        </div>

      }
    </div>
  );

}


