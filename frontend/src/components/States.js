import React from 'react';
import Container from '@material-ui/core/Container';
import {stateData} from './States/stateData';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';
import StateInfo from './States/StateInfo';



  
export default function States() {

    const states = stateData.map(state =>
        <StateInfo
            info={state}
        />)

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
                                State Lookup
                            </Typography>
                        </Box>

                        <Box textAlign="left" p={3} alignContent="center">

                            <Typography variant="body1" component="h2" maxWidth="xs">
                                {"Search what state you're interested in visiting."}
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
                                    {states}

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
