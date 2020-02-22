import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

export default function Blurb() {
    const classes = useStyles();
    return (
      
        <div className={classes.root}>
            <Grid container direction={'row'} width="sm">
                <Avatar alt="Remy Sharp" src="/face.jpg" className={classes.large} />
                <Typography variant="h5" component="h2" id="blurbtitle">
                  Alice Reuter (Frontend)
                </Typography>
                <p>React Developer and cat memes enthusiast.</p>
              </Grid>
        </div>
    )

}