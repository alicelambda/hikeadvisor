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

const animals = animalData.map(animal =>
    <AnimalInfo
        info={animal}
    />)

  
export default function Animals() {

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

                        <Box textAlign="left" p={3} alignContent="center">

                            <Typography variant="body1" component="h2" maxWidth="xs">
                                {"Find animals and where they are located"}
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
