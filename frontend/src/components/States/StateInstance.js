import React, {Component} from 'react';
import Navigation from '../Navigation'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { stateData } from './stateData';

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


export default function StateInstance(props) {
  const classes = useStyles();
 
  return (
    <div>
      <Navigation/>
    <div className={classes.root}>
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
              <Avatar  className={classes.large} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Seal_of_California.svg/1920px-Seal_of_California.svg.png"}/>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="h2" id="blurbtitle">
                {stateData.name} <br/>
              </Typography>
              </Grid>
          </Grid>
          <Box minHeight={100}>
        <Typography variant="body1" component="h2" id="blurbtitle">
          {stateData.short_description} <br/>
            Capital: {stateData.capital} <br/>
            Largest City: {stateData.largest_city} <br/>
            Population: {stateData.pop} <br/>
            {stateData.timezone}
        </Typography>
        </Box>
      </Box>
    </Paper>
    </Grid>
    </Box>
  </div>
  </div>
  )

}
