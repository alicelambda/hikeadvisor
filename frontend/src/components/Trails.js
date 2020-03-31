import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from './Trails/TrailCard';
import { trailData } from './Trails/trailData';
import Grid from '@material-ui/core/Grid';

export default function Trails() {

    const [trailData,setTrails] = React.useState([]);

    const getTrailData = () => {
        
        fetch("http://api.hikeadvisor.me/hiking_trails")
        .then(response => response.json())
        .then(data => {
            setTrails(data)
        })
    }

    const trails = trailData.map(trail =>
        <TrailCard
            key={trail.id}
            info={trail}
        />)

    React.useEffect(() => {
        getTrailData();
    }, []);

    return (
        <div>
            <Navigation />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item>
                    <Grid container

                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                        align="center"
                    >
                        {trails}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )

}