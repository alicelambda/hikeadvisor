import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Navigation from '../Navigation';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useParams } from "react-router-dom";
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles();

export default function TrailStand() {
    const [trails, setTrails] = React.useState([]);
    const [trail, setTrail] = React.useState(null);

    React.useEffect(() => {
        getTrailData();
    }, []);

    let { trailId, trailPage } = useParams();
    console.log(trailPage)
    console.log(trailId)

    const getTrailData = () => {

        fetch("https://api.hikeadvisor.me/api/trail?page=" + trailPage / 10 + 1)
            .then(response => response.json())
            .then(data => {
                setTrails(data.objects)
            })
    }

    React.useEffect(() => {
        setTrail(trails.filter(trail => {
            return trail.trail_id == trailId
        })[0])

    }, [trails]);

    const classes = useStyles();
    return (
        <div className={classes}>

            <Navigation />
            {trail ?
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >


                    <Grid item>
                        <img src={trail.trail_picURL}></img>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2">
                            {trail.trail_name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                        </Typography>
                    </Grid>
                    <Grid item>

                        <Box textAlign="left">
                            <Grid container
                                spacing={2}
                            >


                                <Grid item>

                                    <ul>
                                        <li>State:                   <Link to={("/state/" + trail.trail_states)} style={{ textDecoration: 'none' }}> {trail.trail_states}</Link> </li>
                                        <li> Length: {trail.trail_length}</li>
                                        <li> Stars: {trail.trail_stars}</li>
                                        <li> Latitude: {trail.trail_latitude}</li>
                                        <li> Longitude: {trail.trail_longitude}</li>
                                    </ul>
                                </Grid>

                                <Grid item>
                                    <ul>
                                        <li>
                                        Animals:                   <Link to={("/animal/" + trail.trail_animals[0])} style={{ textDecoration: 'none' }}> {trail.trail_animals[1]}</Link>,
                                        <Link to={("/animal/" + trail.trail_animals[2])} style={{ textDecoration: 'none' }}> {trail.trail_animals[3]}</Link>
                                         </li>
                                        <li> Highest Elevation {trail.trail_high} ft</li>
                                        <li> Lowest Elvation {trail.trail_low} ft</li>
                                        <li> Ascent: {trail.trail_ascent} ft</li>
                                        <li> Descent: {trail.trail_descent} ft </li>
                                        <li> Location: {trail.trail_location} </li>
                                    </ul>

                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>

                </Grid> : null}
        </div>

    )
}
