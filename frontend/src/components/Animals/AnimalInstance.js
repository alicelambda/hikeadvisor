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
import {  useParams} from "react-router-dom";
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


export default function AnimalInstance() {
  let { animalId } = useParams();
    console.log(animalId)
    const animal = animalData.filter(animal =>{
       return animal["animal_id"] == animalId
    })[0]
    
    const classes = useStyles();
    console.log(animal)
 
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
                        {animal.animal_commonName}
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">
                  <img className={classes.photo} src={animal.animal_picURL}/>
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
              <Avatar  className={classes.large} src={animal.animal_picURL}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
              {animal.animal_commonName}
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
        {animal.animal_description}
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                States:<br/>
                <Link to={("trails/" + animal.animal_states)} style={{ textDecoration: 'none' }}> {animal.animal_states} </Link>
              </Typography>
              <Divider/>
              <Typography variant="h6" component="h2" id="blurbtitle">
                Trails:<br/>
                <Link to={("trails/" + animal.animal_trails)} style={{ textDecoration: 'none' }}> {animal.animal_trails} </Link>
              </Typography>
        <Typography variant="body1" component="h2" id="blurbtitle"></Typography>
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
