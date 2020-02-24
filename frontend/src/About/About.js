import React from 'react';
import Container from '@material-ui/core/Container';
import Blurb from './Blurb';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


export default function About() {

    return (
      
        <Container >
            <h1>Hike Advisor</h1>
            <Container  maxWidth="md">
             
            <Box textAlign="left" p={3}  alignContent="center"> 
                
                <Typography variant="body1" component="h2" maxWidth="xs">
                Ethloyers focuses on the environmental aspect of working for different companies. Different cities, locations, and companies have different levels of impact on the environment, and Ethical Employers is here to help potential employees choose positions with the most positive environmental impacts. We hope to have this encompass everything from the transportation method and route that you choose to get to work to the recycling policy involved in the city that the company is located in.

    Why should you use Ethical Employers? It's a ones s stop shop for exploring ethical ramifications of your employer. You can feel comfortable and confident about your employer's ethical actions and know that you're making a positive difference in the world through your work. Even if you don't have a job at the moment, you can find cities with a track record of ethical, environmentally responsible practices to model your own environmentally conscious decisions and to remain politically informed about local government environmental policy around the nation.
                </Typography>
               
            </Box>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
                <Grid container alignContent="center"  spacing={2}>
                    <Blurb/>
                    <Blurb/>
                </Grid>
                <Grid container spacing={2}>
                    <Blurb/>
                    <Blurb/>
                </Grid>
                <Grid container spacing={2}>
                    <Blurb/>
                    <Blurb/>
                </Grid>
            </Grid>
            </Container>
        </Container>
    )
}
