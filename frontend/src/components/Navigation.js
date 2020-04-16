import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import logo from "../images/HikeAdvisorIcon.svg";
import {
  Link
} from "react-router-dom";
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: '#000000',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  link: {
    color: 'white',


  },
  overrides: {
    MuiButton: {
      color: "white",
      root: {
        color: "red"
      }
    }
  }
}));

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiButton-root': {
      fontSize: '1rem',
      color: "#60492c"
    },
    '.MuiSvgIcon-root': {
      color: "#60492c"
    },
    '.MuiInputBase-root': {
      color:"#60492c"
    }
  },
})(() => null);

export default function Navigation(props) {
  const classes = useStyles();

  const onSearch = (event) => {
    props.upcall(event.target.value);
  }


  return (
    <div className={classes.root}>
     
      <AppBar color="#Eff1eD" position="static">
        <Toolbar>
          <img src={logo} width="2.5%" height="2.5%"></img>
          <Box color="#60492c">
            <Typography
              edge="start"
              className={classes.menuButton}
              color="inherit"
              position="center"
              aria-label="open drawer"
              variant="h6">
              HikeAdvisor
          </Typography>

          </Box>
          <Typography className={classes.title} variant="h6" noWrap>
          </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}><Button>Home</Button> </Link>
            <Link to="/states/0" style={{ textDecoration: 'none' }}><Button >States</Button> </Link>
            <Link to="/animals/0" style={{ textDecoration: 'none' }}><Button>Animals</Button> </Link>
            <Link to="/trails/0" style={{ textDecoration: 'none' }}><Button>Trails</Button> </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}><Button>About</Button> </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      {props.loading =="tru" ? <LinearProgress /> : null}
    </div >
  );
}
