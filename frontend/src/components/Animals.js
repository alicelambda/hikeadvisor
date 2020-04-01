import React from 'react'
import Navigation from './Navigation';
import img from '../images/forest.jpg';
import {animalData} from './Animals/animalData';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AnimalInfo from './Animals/AnimalInfo';
import Pagination from '@material-ui/lab/Pagination';


  
export default function Animals() {

    const [animalData,setAnimals] = React.useState([]);
    const [animals,setAnimalsCard] = React.useState([]);

    const getAnimalData = () => {
        
        fetch("https://api.hikeadvisor.me/api/animal?page=1")
        .then(response => response.json())
        .then(data => {
            setAnimals(data.objects)
        })
    }

    React.useEffect(() => {
        setAnimalsCard(animalData.map(animal => 
            <AnimalInfo
                key={animal.id}
                info={animal}
            />
            ))

    },[animalData])
    

    React.useEffect(() => {
        getAnimalData();
    }, []);

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
                            Animal Dictionary
                            </Typography>
                        </Box>

                        <Box p={3} alignContent="center">

                            <Typography variant="body1" component="h2" maxWidth="xs">
                                {"Get information about your favorite animals"}
                            </Typography>

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
                                    {animals}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Pagination count={15} />
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
