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
                        American Toad
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bufo_americanus_PJC1.jpg/2560px-Bufo_americanus_PJC1.jpg"}/>
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/8/84/B_americanus_range23.png"}/>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bufo_americanus_PJC1.jpg/2560px-Bufo_americanus_PJC1.jpg"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                American Toad
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
        The American toad (Anaxyrus americanus) is a common species of toad found throughout the eastern United States and Canada. It is divided into three subspecies—the eastern American toad (A. a. americanus), the dwarf American toad (A. a. charlesmithi), and the rare Hudson Bay toad (A. a. copei). Recent taxonomic treatments place this species in the genus Anaxyrus instead of Bufo.
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                States:<br/>
                <Link to="/states/Texas" style={{ textDecoration: 'none' }}>Texas</Link><br/>
              </Typography>
              <Divider/>
              <Typography variant="h6" component="h2" id="blurbtitle">
                Trails:<br/>
                <Link to="/trail/7011192" style={{ textDecoration: 'none' }}>Boulder Skyline Traverse</Link><br/>
              </Typography>
        <Typography variant="body1" component="h2" id="blurbtitle"></Typography>
        <a href="https://en.wikipedia.org/wiki/American_toad">Read More</a>
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
