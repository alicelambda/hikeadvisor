import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { stateData } from './stateData';
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
  photo: {
    height: 200,
  },
}));


export default function StateInstance(props) {
  const classes = useStyles();
 
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
                        Colorado
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">

                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Colorado_in_United_States.svg/2880px-Colorado_in_United_States.svg.png"}/>
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg/2560px-Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg.png"}/>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Seal_of_Colorado.svg/1920px-Seal_of_Colorado.svg.png"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                Colorado
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
            State in western United States <br/>
            Nickname: The Centennial State<br/>
            Motto: Nil sine numine<br/>
            Capital: Denver <br/>
            Largest City: Denver<br/>
            Population: 5,770,545 <br/>
            Pop. Density: 19.9 people per sq mile<br/>
            Mountain Time Zone<br/>
            Area: 104,094 sq miles<br/>
            Land: 103,718 sq miles<br/>
            Water: 376 sq miles<br/>
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                Trails:<br/>
                <Link to="/trail/7000130" style={{ textDecoration: 'none' }}>Bear Peak Out and Back</Link><br/>
                <Link to="/trail/7011192" style={{ textDecoration: 'none' }}>Boulder Skyline Traverse</Link><br/>
                <Link to="/trail/7004226" style={{ textDecoration: 'none' }}>Sunshine Lion's Lair Loop</Link><br/>
              </Typography>
        <Typography variant="body1" component="h2" id="blurbtitle">
            
            <a href="https://en.wikipedia.org/wiki/Colorado">Read More</a>
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
