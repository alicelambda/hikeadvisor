import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Navigation from '../Navigation';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useParams } from "react-router-dom";
import {
    Link
} from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const useStyles = makeStyles();


const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiPaper-root': {
            backgroundColor: "#06d6a0"
        },

    },
})(() => null);

export default function TrailInstance(props) {
    const [trail, setTrail] = React.useState(null);
    const [title, setTitle] = React.useState();
    let { trailId } = useParams();

    const classes = useStyles();

    React.useEffect(() => {
        setTrail(props.trailData.filter((x) => {
            return x.trail_id == trailId;
        })[0]);
    }, [props.trailData]);

    React.useEffect(() => {
        if (trail) {
            setTitle(trail.trail_name)
        }
    }, [trail]);

    
    return (
        <div className={classes}>

            <GlobalCss />
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
                        {title}

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
                        <img src={trail.trail_mapPicURL}></img>

                    </Grid>

                </Grid> : null}
        </div>

    )
}
