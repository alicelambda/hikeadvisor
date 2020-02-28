import React from 'react';
import Navigation from '../Navigation';
import Grid from '@material-ui/core/Grid';

export default function TrailBear(props) {

    return (
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
                    <h1>Bear Trail </h1>
                </Grid>
            </Grid>
        
        </div>
    )

}