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
                        Northern Cardinal
                    </Typography>
                </Box>

                <Box textAlign="left" p={3} alignContent="center">
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/d/da/Cardinal.jpg"}/>
                  <img className={classes.photo} src={"https://upload.wikimedia.org/wikipedia/commons/3/33/Northern_Cardinal-rangemap.gif"}/>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/d/da/Cardinal.jpg"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                Northern Cardinal
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
        The northern cardinal (Cardinalis cardinalis) is a bird in the genus Cardinalis; it is also known colloquially as the redbird, common cardinal or just cardinal (which was its name prior to 1985). It can be found in southern eastern Canada, through the eastern United States from Maine to Minnesota to Texas, and south through Mexico, Belize, and Guatemala. It is also an introduced species in a few locations such as Bermuda and Hawaii. Its habitat includes woodlands, gardens, shrublands, and wetlands.\nThe northern cardinal is a mid-sized songbird with a body length of 21–23 cm (8.3–9.1 in). It has a distinctive crest on the head and a mask on the face which is black in the male and gray in the female. The male is a vibrant red, while the female is a reddish olive color. The northern cardinal is mainly granivorous, but also feeds on insects and fruit. The male behaves territorially, marking out his territory with song. During courtship, the male feeds seed to the female beak-to-beak. A clutch of three to four eggs is laid, and two to four clutches are produced each year. It was once prized as a pet, but its sale as a cage bird was banned in the United States by the Migratory Bird Treaty Act of 1918.
        </Typography>
        <Divider/>
        <Typography variant="h6" component="h2" id="blurbtitle">
                States:<br/>
                <Link to="/states/Texas" style={{ textDecoration: 'none' }}>Texas</Link><br/>
                <Link to="/states/Colorado" style={{ textDecoration: 'none' }}>Colorado</Link><br/>
              </Typography>
        <Typography variant="body1" component="h2" id="blurbtitle"></Typography>
        <a href="https://en.wikipedia.org/wiki/Northern_cardinal">Read More</a>
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
