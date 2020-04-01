import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from './Trails/TrailCard';
import Grid from '@material-ui/core/Grid';

export default function Trails() {

    const [trailData,setTrails] = React.useState([]);
    const [trails,setTrailsCard] = React.useState([]);

    const getTrailData = () => {
        
        fetch("https://api.hikeadvisor.me/api/trail?page=1")
        .then(response => response.json())
        .then(data => {
            setTrails(data.objects)
        })
    }

    React.useEffect(() => {
        setTrailsCard(trailData.map(trail => 
            <TrailCard
                key={trail.id}
                info={trail}
            />
            ))

    },[trailData])
    

    React.useEffect(() => {
        getTrailData();
    }, []);

    return (
        <div>
            <Navigation />
            <Grid
                container
                alignItems="center"
                justify="center"
            >
                
                        {trails}
               
            </Grid>
        </div>
    )

}