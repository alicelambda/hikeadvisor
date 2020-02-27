import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from './Trails/TrailCard';
import { trailData } from './Trails/trailData';
import Grid from '@material-ui/core/Grid';

export default function Trails() {

    const trails = trailData.map(trail =>
        <TrailCard
            key={trail.id}
            info={trail}
        />)

    return(
        <div>
            
            <Navigation/>
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
                    </Grid>>
            </Grid>
        </div>
    )
    
}