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

const useStyles = makeStyles();


export default function StateInstance() {
  let urlSplit = String(window.location.href).split('/');
  let stateName = urlSplit[urlSplit.length - 1];
  console.log(stateName)
  const [state, setState] = React.useState(null);
  React.useEffect(async () => {
    var url = "https://cors-anywhere.herokuapp.com/http://api.hikeadvisor.me/api/state/" + stateName;
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    const item = data;
    setState(item);
    console.log(item.state_name)
  }, [])

    // const state = stateData.filter(state =>{
    //    return state["state_name"] == stateId
    // })[0]
    
    // const classes = useStyles();
    // console.log(state)
 
  const classes = useStyles();
  return (
        <div className={classes}>

            <Navigation />
            {state ?
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >


                    <Grid item>
                        <img src={state.state_flagPicURL}></img>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2">
                            {state.state_name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                        </Typography>
                    </Grid>
                    <Grid item>

                        <Box textAlign="left">
                            <Grid container
                                spacing={2}
                            >


                                <Grid item>

                                    <ul>
                                        <li>Popular Animals: <Link to={("/animal/" + state.state_animals[0])} style={{ textDecoration: 'none' }}> {state.state_animals[1]}</Link>, <Link to={("/animal/" + state.state_animals[2])} style={{ textDecoration: 'none' }}> {state.state_animals[3]}</Link></li>
                                        <li>Capital: {state.state_capital}</li>
                                        <li>Elevation: {state.state_elevation}</li>
                                        <li>Highest Point: {state.state_highest}</li>
                                        <li>Lowest Point: {state.state_lowest}</li>
                                        <li>Total Land Area: {state.state_landArea}</li>
                                    </ul>
                                </Grid>

                                <Grid item>
                                    <ul>
                                        <li>Trails: <Link to={("/trail/" + state.state_trails[0])} style={{ textDecoration: 'none' }}> {state.state_trails[1]}</Link>, <Link to={("/trail/" + state.state_trails[2])} style={{ textDecoration: 'none' }}> {state.state_trails[3]}</Link></li>
                                        <li>State Latitude: {state.state_lat}</li>
                                        <li>State Longitude: {state.state_long}</li>
                                        <li>Population: {state.state_population}</li>
                                        <li>Time Zone: {state.state_timezone}</li>
                                        <li>State Map: </li>
                                        <img src={state.state_mapPicURL}></img>
                                    </ul>

                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>

                </Grid> : null}
        </div>

    )

}
