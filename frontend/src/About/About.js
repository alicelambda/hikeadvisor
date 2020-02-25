import React from 'react';
import Container from '@material-ui/core/Container';
import Blurb from './Blurb';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {blurbData,blurb} from './AboutData';

export default function About() {

    const blurbs = blurbData.map(blurb=> 
        <Blurb
            info={blurb}
        />)

    return (
        <Container >
            <Box p={4}>
                <Typography variant="h2" component="h2" maxWidth="xs">
                    Hike Advisor
                </Typography>
            </Box>
            <Container  maxWidth="md">
             
            <Box textAlign="left" p={3}  alignContent="center"> 
                
                <Typography variant="body1" component="h2" maxWidth="xs">
                    {blurb}
                </Typography>
               
            </Box>
            <Typography variant="h3" component="h2" maxWidth="xs">
                Team
            </Typography>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
                <Grid item>
                    <Grid container alignContent="center"  spacing={2}>
                        {blurbs}
                    </Grid>
                </Grid>
            </Grid>

                       
    <Typography variant="h3" component="h2" maxWidth="xs">
       Data sources
    </Typography>

                   
    <Typography variant="h3" component="h2" maxWidth="xs">
        Tools Used
    </Typography>

            </Container>
     
        </Container>
        
    )
}
