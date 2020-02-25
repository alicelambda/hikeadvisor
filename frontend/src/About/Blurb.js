import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
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
  

export default function Blurb(props) {
    const classes = useStyles();
   
    return (
      
        <div className={classes.root}  >
          <Box p={1}>
           <Grid item xs={12} spacing={5}>
          <Paper >
            <Box p={2} 
                maxWidth={350}
                minWidth={350}
                textAlign="left"
                >
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar alt={props.info["name"]} src={'/blurb/' +props.info["photo"]} className={classes.large} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2" id="blurbtitle">
                      {props.info["name"] + " (" + props.info["role"] + ")"}
                    </Typography>
                    </Grid>
                </Grid>
                <Box minHeight={100}>
              <Typography variant="body1" component="h2" id="blurbtitle">
                {props.info["description"]}
              </Typography>
              </Box>
              <Divider/>
              <Box pt={1}>
                <Typography varient="body1">
                  {props.info["noissues"]} issues, {props.info["nocommits"]} commits, {props.info["notestcases"]} unit tests
                </Typography>
              </Box>
            </Box>
          </Paper>
          </Grid>
          </Box>
        </div>
    )

}