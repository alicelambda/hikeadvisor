import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

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
  }));
  

export default function Blurb() {
    const classes = useStyles();
    return (
      
        <div className={classes.root} >
           <Grid item xs={12} spacing={3}>
          <Paper>
                <Avatar alt="Remy Sharp" src="/face.jpg" className={classes.large} />
                <Typography variant="h5" component="h2" id="blurbtitle">
                  Alice Reuter (Frontend)
                </Typography>
                <p>React Developer and cat memes enthusiast.</p>
          </Paper>
          </Grid>
        </div>
    )

}