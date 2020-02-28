import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { animalData } from './animalData';
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
                        Bald Eagle
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/About_to_Launch_%2826075320352%29.jpg/1920px-About_to_Launch_%2826075320352%29.jpg"}/>
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/5/57/Distribution_H._leucocephalus.png"}/>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/About_to_Launch_%2826075320352%29.jpg/1920px-About_to_Launch_%2826075320352%29.jpg"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                Bald Eagle
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
        The bald eagle (Haliaeetus leucocephalus) is a bird of prey found in North America. A sea eagle, it has two known subspecies and forms a species pair with the white-tailed eagle (Haliaeetus albicilla). Its range includes most of Canada and Alaska, all of the contiguous United States, and northern Mexico. It is found near large bodies of open water with an abundant food supply and old-growth trees for nesting. The bald eagle is an opportunistic feeder which subsists mainly on fish, which it swoops down and snatches from the water with its talons. It builds the largest nest of any North American bird and the largest tree nests ever recorded for any animal species, up to 4 m (13 ft) deep, 2.5 m (8.2 ft) wide, and 1 metric ton (1.1 short tons) in weight. Sexual maturity is attained at the age of four to five years.
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                States:<br/>
                <Link to="/states/Colorado" style={{ textDecoration: 'none' }}>Colorado</Link><br/>
                <Link to="/states/California" style={{ textDecoration: 'none' }}>California</Link><br/>
              </Typography>
              <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                Trails:<br/>
                <Link to="/trails/7000130" style={{ textDecoration: 'none' }}>Bear Peak Out and Back</Link><br/>
                <Link to="/trails/7004226" style={{ textDecoration: 'none' }}>Sunshine Lion's Lair Loop</Link><br/>
              </Typography>
        <Typography variant="body1" component="h2" id="blurbtitle"></Typography>
        <a href="https://en.wikipedia.org/wiki/Bald_eagle">Read More</a>
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
