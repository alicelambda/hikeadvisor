import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles,withStyles } from '@material-ui/core/styles';
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
    photo: {
        height: 250,
      },
    
  }));
  

  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiPaper-root': {
            backgroundColor: "#06d6a0"
        },

    },
})(() => null);


export default function StateInstance() {
    const [states, setStates] = React.useState([]);
    const [state, setState] = React.useState(null);

    React.useEffect(() => {
        getStateData();
    }, []);

    let { stateId, statePage } = useParams();
    console.log(statePage)
    console.log(stateId)

    const getStateData = () => {
        fetch("https://api.hikeadvisor.me/api/state?page=" + statePage / 10 + 1)
            .then(response => response.json())
            .then(data => {
                setStates(data.objects)
            })
    }

    React.useEffect(() => {
        setState(states.filter(state => {
            return state.state_name == stateId
        })[0])

    }, [states]);
 
  const classes = useStyles();
  return (

    <div>
          <GlobalCss/>

    <Navigation/> 
    {state ?
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
                      <img className={classes.photo} src={state.state_mapPicURL}/>
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
            Popular Animals: <br/>
            <Link to={("/state/" + state.state_animals[0])} style={{ textDecoration: 'none' }}> {state.state_animals[1]}</Link>,
                                        <Link to={("/animal/" + state.state_animals[2])} style={{ textDecoration: 'none' }}> {state.state_animals[3]}</Link>
            </Typography>
            <Divider/>
            <Typography variant="h6" component="h2" id="blurbtitle">
            Favorite Trails: <br/>
            <Link to={("/state/" + state.state_trails[0])} style={{ textDecoration: 'none' }}> {state.state_trails[1]}</Link>,
                                        <Link to={("/animal/" + state.state_trails[2])} style={{ textDecoration: 'none' }}> {state.state_trails[3]}</Link>
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
    : null}
    </div>
      )


}
