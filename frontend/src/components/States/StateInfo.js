import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Highlight from 'react-highlighter';
import CardHeader from '@material-ui/core/CardHeader';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#32dde3",
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
    const info = props.info;
    const classes = useStyles();
   
    return (
      
      <div className={classes.root}>
        <Box p={1}>
         <Grid item xs={12} spacing={5}>
        <Link to={("/state/" + info.state_name)} style={{ textDecoration: 'none' }}>
        <Paper >
          <Box p={3} 
              maxWidth={350}
              minWidth={350}
              textAlign="left"
              >
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar  className={classes.large} src={info.state_flagPicURL}/>
                </Grid>
                <Grid item>
                <Typography variant="h4" component="h2" id="blurbtitle">
                    <Highlight search={props.query.length > 0 ? props.query : ""}>{info.state_name}</Highlight>
                  </Typography>
                  </Grid>
              </Grid>
              <Box minHeight={100}>
              <Divider/>
            <Typography variant="body1" component="h2" id="blurbtitle">
                Motto: {info.state_motto} <br/>
                Capital: {info.state_capital} <br/>
                Elevation: {info.state_elevation} ft.<br/>
                Population: {info.state_population} <br/>
                {info.state_timezone}
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