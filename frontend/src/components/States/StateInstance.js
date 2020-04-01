import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { stateData } from './stateData';
import {  useParams} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


export default function StateInstance() {
  let { stateId } = useParams();
    console.log(stateId)
    const state = stateData.filter(state =>{
       return state["state_name"] == stateId
    })[0]
    
    const classes = useStyles();
    console.log(state)
 
  return (

    <div>
    <Navigation/> 
        <Container maxWidth="md">
            <Box>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    
                    <Box p={2} >
                        <Typography variant="h3" component="h2" maxWidth="xs">
                            {state.state_name}
                        </Typography>
                    </Box>
    
                    <Box textAlign="left" p={3} alignContent="center">
    
                      <img className={classes.photo} src={state.state_flagPicURL}/>
                    </Box>
                </Grid>
                <Divider/>
                <Grid item>
                    <Typography variant="h3" component="h2" maxWidth="xs">
                        
                    </Typography>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item>
                            <Grid container 
                            alignContent="center" 
                            alignItems="center"  
                            justspacing={2}
                            justify="center"
                            >
                                <Box p={1}>
         <Grid item xs={12} spacing={5}>
        <Paper >
          <Box p={3} 
              maxWidth={350}
              minWidth={350}
              textAlign="left"
              >
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar  className={classes.large} src={state.state_flagPicURL}/>
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="h2" id="blurbtitle">
                  {state.state_name}
                  </Typography>
                  </Grid>
              </Grid>
              <Box minHeight={100}>
            <Typography variant="body1" component="h2" id="blurbtitle">
                Elevation: {state.state_elevation} ft.<br/>
                Motto: {state.state_motto}<br/>
                Capital: {state.state_capital} <br/>
                Pop: {state.state_population} <br/>
                Density: {state.state_populationDensity}<br/>
                {state.state_timezone}<br/>
                Area: {state.state_totalArea} square miles<br/>
                Highest: {state.state_highest}<br/>
                Lowest: {state.state_lowest}<br/>
            </Typography>
            <Divider/>
            <Typography variant="h6" component="h2" id="blurbtitle">
            Animals: <br/>
            <Link to={("animals/" + state.state_animals)} style={{ textDecoration: 'none' }}> {state.state_animals} </Link>
            </Typography>
            <Divider/>
            <Typography variant="h6" component="h2" id="blurbtitle">
            Trails: <br/>
            <Link to={("trails/" + state.state_trails)} style={{ textDecoration: 'none' }}> {state.state_trails} </Link>
            </Typography>
            </Box>
          </Box>
        </Paper>
        </Grid>
        </Box>
    
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Divider/>
                <Grid item>
                    <Box p={4}>
                    </Box>
                </Grid>
              </Grid>
              </Box>
        </Container>
    
    </div>
      )

}
