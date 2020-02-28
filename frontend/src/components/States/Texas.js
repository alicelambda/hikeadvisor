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
                        Texas
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">

                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Texas_in_United_States.svg/2880px-Texas_in_United_States.svg.png"}/>
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/2560px-Flag_of_Texas.svg.png"}/>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Seal_of_Texas.svg/1920px-Seal_of_Texas.svg.png"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                Texas
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
            State in southern United States <br/>
            Nickname: The Lone Star State<br/>
            Motto: Friendship<br/>
            Capital: Austin <br/>
            Largest City: Houston<br/>
            Population: 28,995,881 <br/>
            Pop. Density: 108 people per sq mile<br/>
            Central Daylight Time<br/>
            Area: 268,581 sq miles<br/>
            Land: 261,797 sq miles<br/>
            Water: 6,784 sq miles<br/>
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
            Animals:<br/>
            <Link to="/animals/9083" style={{ textDecoration: 'none' }}>Northern Cardinal</Link><br/>
            <Link to="/animals/5305" style={{ textDecoration: 'none' }}>Bald Eagle</Link><br/>
        </Typography>
        <a href="https://en.wikipedia.org/wiki/Texas">Read More</a>
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
