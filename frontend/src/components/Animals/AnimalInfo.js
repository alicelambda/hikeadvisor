import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Highlight from 'react-highlighter';
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
  }));
  

export default function AnimalInfo(props) {
    const info = props.info;
    const classes = useStyles();
   
    return (
      
      <div className={classes.root}  >
        <Box p={1}>
         <Grid item xs={12} spacing={5}>
        <Link to={("/animal/" + info.animal_id)} style={{ textDecoration: 'none' }}>
        <Paper >
          <Box p={3} 
              maxWidth={350}
              minWidth={350}
              textAlign="left"
              >
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar  className={classes.large} src={info.animal_picURL}/>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="h2" id="blurbtitle">
                    <Highlight search={props.query.length > 0 ? props.query : ""}>{info.animal_commonName}</Highlight>
                  </Typography>
                  </Grid>
              </Grid>
              <Box minHeight={100}>
              <Divider/>
            <Typography variant="body1" component="h2" id="blurbtitle">
                Scientific name: {info.animal_scientificName} <br/>
                Taxonomy name: {info.animal_taxonName} <br/>
                Place of Origin: {info.animal_location} <br/>
                Sightings: {info.animal_numObser} <br/>
                Last seen: {info.animal_lastSighting} <br/>
                Extinct? {info.animal_isExtinct == false ? "No" : "Yes"}
            </Typography>
            </Box>
          </Box>
        </Paper>
        </Link>
        </Grid>
        </Box>
      </div>
  )


}