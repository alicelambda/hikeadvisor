import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
      
        <div className={classes.root}  >
           <Grid item xs={12} spacing={2}>
          <Paper >
            <Box p={2}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src="/face.jpg" className={classes.large} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2" id="blurbtitle">
                      Alice Reuter (Frontend)
                    </Typography>
                    </Grid>
                </Grid>
              <Typography variant="body1" component="h2" id="blurbtitle">
              React Developer and cat memes enthusiast.
              </Typography>
            </Box>
          </Paper>
          </Grid>
        </div>
    )

}