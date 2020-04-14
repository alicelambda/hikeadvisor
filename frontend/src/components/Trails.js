import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from './Trails/TrailCard';
import Grid from '@material-ui/core/Grid';
import Pagination from "material-ui-flat-pagination";
import { Redirect, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor:" #06d6a0",
  
    },

}));

export default function Trails() {
    const classes = useStyles();

    let poffset = useParams();

    const [trailData, setTrails] = React.useState([]);
    const [trails, setTrailsCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();

    React.useEffect(() => {

        setOffset(parseInt(poffset.offset));
    })

    const getTrailData = () => {

        fetch("https://api.hikeadvisor.me/api/trail?page=" + offset / 10 + 1)
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
                page={offset}
            />
        ))

    }, [trailData])


    React.useEffect(() => {
        getTrailData();
    }, [offset]);

    const handleClick = (offset) => {
        setOffset(offset)
        setRedirect(offset)
    }

    return (
        <div className={classes.root}>
            <Navigation />
            <Box color="green">
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >

                    {trails}

                </Grid>
            </Box>
            {redirect != -1 ? <Redirect to={"/trails/" + redirect} /> : null}
            <Pagination
                limit={10}
                offset={offset}
                total={50}
                onClick={(e, offset) => handleClick(offset)}
            />
        </div>
    )

}
