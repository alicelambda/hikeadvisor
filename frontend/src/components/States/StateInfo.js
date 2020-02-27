import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
  }));
  

export default function StateInfo(props) {
    const classes = useStyles();
   
    return (
      
        <div className={classes.root}  >
          <Box p={1}>
           <Grid item xs={12} spacing={5}>
          <Link to={("/states/" + props.info["name"])} style={{ textDecoration: 'none' }}>
          <Paper >
            <Box p={3} 
                maxWidth={350}
                minWidth={350}
                textAlign="left"
                >
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar  className={classes.large} src={props.info["image_seal"]}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" component="h2" id="blurbtitle">
                      {props.info["name"]} <br/>
                    </Typography>
                    </Grid>
                </Grid>
                <Box minHeight={100}>
                <Divider/>
              <Typography variant="body1" component="h2" id="blurbtitle">
                {props.info["short_description"]} <br/>
                  Capital: {props.info["capital"]} <br/>
                  Largest City: {props.info["largest_city"]} <br/>
                  Population: {props.info["pop"]} <br/>
                  {props.info["timezone"]}
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