import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles,withStyles } from '@material-ui/core/styles';
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

export default function AnimalInstance() {
    //const [animals, setAnimals] = React.useState([]);
    let { animalId} = useParams();
    console.log(animalId)
    console.log("Debugging")
    const [animal, setAnimal] = React.useState(null);
    React.useEffect(() => {
      fetch("https://api.hikeadvisor.me/api/animal/" + animalId)
        .then(response => response.json())
        .then(data => {setAnimal(data)})
    }, [])

    // React.useEffect(() => {
    //     getAnimalData();
    // }, []);

    
    // console.log(animalPage)
    // console.log(animalId)

    // const getAnimalData = () => {
    //     var temp = parseInt(animalPage) + 1;
    //     fetch("https://api.hikeadvisor.me/api/animal?page=" + temp)
    //         .then(response => response.json())
    //         .then(data => {
    //             setAnimals(data.objects)
    //         })
    // }

    // React.useEffect(() => {
    //     setAnimal(animals.filter(animal => {
    //         return animal.animal_id == animalId
    //     })[0])

    // }, [animals]);
 
  const classes = useStyles();
  return (

    <div>
        <GlobalCss/>
    <Navigation/> 
    {animal ?
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
                      <img className={classes.photo} src={animal.animal_taxonNetwork}/>
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
                    State:<br/><Link to={("/state/" + animal.animal_location)} style={{ textDecoration: 'none' }}> {animal.animal_location} </Link>
                  </Typography>
                  <Divider/>
                  <Typography variant="h6" component="h2" id="blurbtitle">
                    Trails:<br/>
                    <Link to={("/trail/" + animal.animal_trails[0])} style={{ textDecoration: 'none' }}> {animal.animal_trails[1]}</Link>,
                                        <Link to={("/trail/" + animal.animal_trails[2])} style={{ textDecoration: 'none' }}> {animal.animal_trails[3]}</Link>
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
    : null}
    </div>
      )
    

}
