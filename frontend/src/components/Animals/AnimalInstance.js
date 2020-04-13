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

const useStyles = makeStyles();


export default function AnimalInstance() {
  let { animalId } = useParams();
  console.log(animalId)
    // console.log(animalId)
    // const animal = animalData.filter(animal =>{
    //    return animal["animal_id"] == animalId
    // })[0]
    
    // const classes = useStyles();
    // console.log(animal)
  // const [animals, setAnimals] = React.useState([]);
  const [animal, setAnimal] = React.useState(null);
  React.useEffect(async () => {
    var url = "https://api.hikeadvisor.me/api/animal/" + animalId;
    console.log(animalId)
    console.log(url)
    const response = await fetch(url);
    console.log(response)
    const data = await response.json();
    const item = data;
    setAnimal(item);
    console.log(item.animal_id)
  }, [])

  // React.useEffect(() => {
  //   getStateData();
  // }, [])

  // let {animalId} = useParams();
  // console.log(animalId)
  // console.log(animalPage)

  // const getStateData = () => {
  //   fetch("https://api.hikeadvisor.me/api/animal?page=" + animalPage / 10 + 1)
  //   .then(response => response.json())
  //   .then(data => {
  //     setAnimals(data.objects)
  //   })
  // }

  // React.useEffect(() => {
  //   setAnimal(animals.filter(animal => {
  //     return animal.animal_id == animalId
  //   })[0])
  // }, animals);
  const classes = useStyles();
  return (
        <div className={classes}>

            <Navigation />
            {animal ?
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >


                    <Grid item>
                        <img src={animal.animal_picURL}></img>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2">
                            {animal.animal_commonName}
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
                                        <li>State:                   <Link to={("/state/" + animal.animal_location)} style={{ textDecoration: 'none' }}> {animal.animal_location}</Link> </li>
                                        <li>Rank: {animal.animal_rank}</li>
                                        <li>Last Sighting: {animal.animal_lastSighting}</li>
                                        <li>Common Name: {animal.animal_commonName}</li>
                                        <li>Scientific Name: {animal.animal_scientificName}</li>
                                        <li>Taxon Name: {animal.animal_taxonName}</li>
                                    </ul>
                                </Grid>

                                <Grid item>
                                    <ul>
                                        <li>Trails: <Link to={("/trail/" + animal.animal_trails[0])} style={{ textDecoration: 'none' }}> {animal.animal_trails[1]}</Link>, <Link to={("/trail/" + animal.animal_trails[2])} style={{ textDecoration: 'none' }}> {animal.animal_trails[3]}</Link></li>
                                        <li>Number of Observations: {animal.animal_numObser}</li>
                                        <li>Is Extinct: {animal.animal_isExtinct} No</li>
                                        <li>Description: {animal.animal_description}</li>
                                        <li>Taxon Network:</li>
                                        <img src={animal.animal_taxonNetwork}></img>
                                    </ul>

                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>

                </Grid> : null}
        </div>

    )

}
