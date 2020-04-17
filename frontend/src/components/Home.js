
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
          return createTrailData(
            trail.trail_name,
            trail.trail_location,
            trail.trail_length,
            trail.trail_stars,
            trail.trail_numstars,
            trail.trail_id
          )
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


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }



  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
  ];

  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
    null
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

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

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;


  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const renderEnhancedTable = () => {

   return <Paper className={classes.paper}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  }

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
          {renderTable(trailColumns, trailPage, trailRowsPerPage, trails)}

        </div>

      }
    </div>
  );

}


