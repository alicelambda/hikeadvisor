import React from 'react';
import Container from '@material-ui/core/Container';
import Blurb from './About/Blurb';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { blurbData, blurb } from './About/AboutData';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Navigation from '../components/Navigation';
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
  }));
  
export default function About() {

    const blurbs = blurbData.map(blurb =>
        <Blurb
            info={blurb}
        />)
    const classes = useStyles();

    return (
        <div>
        <Navigation/>
        <Container >
            
            <Container maxWidth="md">

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>
                        
                        <Box p={4}>
                            <Typography variant="h2" component="h2" maxWidth="xs">
                                Hike Advisor
                            </Typography>
                        </Box>

                        <Box textAlign="left" p={3} alignContent="center">

                            <Typography variant="body1" component="h2" maxWidth="xs">
                                {blurb}
                            </Typography>

                        </Box>
                    </Grid>
                    <Divider/>
                    <Grid item>
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
                                <Grid container 
                                alignContent="center" 
                                alignItems="center"  
                                justspacing={2}
                                justify="center"
                                >
                                    {blurbs}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid item>
                      <Box p={4}>

                        
                        <Typography variant="h3" component="h2" maxWidth="xs">
                            Data sources
                        </Typography>
                        
                        <Typography variant="body1" component="h2" maxWidth="xs">
                            Our team made use of <a href="https://www.inaturalist.org">iNaturalist data</a> for animal sightings. We used <a href="https://www.hikingproject.com">Hiking Project</a>
                        </Typography>
                            </Box>
                    </Grid>
                  </Grid>
            </Container>

        </Container>
        </div>
    )
}
