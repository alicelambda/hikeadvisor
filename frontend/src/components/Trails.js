import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from '../components/Trails/TrailCard';

export default function Trails() {

    return(
        <div>
            <Navigation/>
            <h1>Trails</h1>
            <grid
                container 
                spacing={1}>
                <grid item>
                    <TrailCard/>
                </grid>
            </grid>
        </div>
    )
    
}