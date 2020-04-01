import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import Navigation from '../Navigation';
import {trailData} from './trailData';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {  useParams} from "react-router-dom";
import {
    Link
  } from "react-router-dom";

const useStyles = makeStyles();

export default function TrailStand() {

    let { trailId } = useParams();
    console.log(trailId)
    const trail = trailData.filter(trail =>{
       return trail["id"] == trailId
    })[0]
    
    const classes = useStyles();
    console.log(trail)
    return (
        <div className={classes}>
            
            <Navigation/>
            <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    
                <Grid item>
                    <img src={trail.imgMedium}></img>
                </Grid>
                <Grid item>
                    <Typography variant="h2">
                    {trail.name}
                    </Typography>
                </Grid>
                <Grid item>
                <Typography variant="body2">
                    {trail.summary} Trail conditions: {trail.conditionDetails}
                    </Typography>
                </Grid>
                <Grid item>
                    
                    <Box textAlign="left">
                    <Grid container
                        spacing={2}
                    >
                

                        <Grid item>

                            <ul>
                            <li>State:                   <Link to={("/states/Colorado")} style={{ textDecoration: 'none' }}> Colorado</Link> </li>
                                <li> Length: {trail.length}</li>
                                <li> Stars: {trail.stars}</li>
                                <li> Latitude: {trail.latitude}</li>
                                <li> Longitude: {trail.longitude}</li>
                                <li> Number of Stars: {trail.starVotes}</li>
                            </ul>
                        </Grid>

                        <Grid item>
                            <ul>
                            <li>Animals:                   <Link to={("/animals/5305")} style={{ textDecoration: 'none' }}> Bald Eagle</Link> </li>
                                <li> Highest Elevation {trail.high} ft</li>
                                <li> Lowest Elvation {trail.low} ft</li>
                                <li> Ascent: {trail.ascent} ft</li>
                                <li> Descent: {trail.descent} ft </li>
                                <li> Location: {trail.location} </li>
                            </ul>

                        </Grid>

                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>

    )
}
