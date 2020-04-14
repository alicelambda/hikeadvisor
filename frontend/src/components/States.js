import React from 'react';
import Container from '@material-ui/core/Container';
import { stateData } from './States/stateData';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';
import StateInfo from './States/StateInfo';
import Pagination from "material-ui-flat-pagination";
import { Redirect, useParams } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#32dde3",
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



const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiPaper-root': {
            backgroundColor: "#06d6a0"
        },

    },
})(() => null);

export default function States() {
    const classes = useStyles();

    let poffset = useParams();

    const [stateData, setStates] = React.useState([]);
    const [states, setStatesCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();

    React.useEffect(() => {

        setOffset(parseInt(poffset.offset));
    })

    const getStateData = () => {

        fetch("https://api.hikeadvisor.me/api/state?page=" + offset / 10 + 1)
            .then(response => response.json())
            .then(data => {
                setStates(data.objects)
            })
    }

    React.useEffect(() => {
        setStatesCard(stateData.map(state =>
            <StateInfo
                key={state.name}
                info={state}
                page={offset}
            />
        ))

    }, [stateData])


    React.useEffect(() => {
        getStateData();
    }, [offset]);

    const handleClick = (offset) => {
        setOffset(offset)
        setRedirect(offset)
    }

    return (
        <div className={classes.root}>
            <GlobalCss />
            <Navigation />
            <Container maxWidth="md">
                <Box>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item>

                            <Box p={2} >
                                <Typography variant="h3" component="h2" maxWidth="xs">
                                    State Lookup
                            </Typography>
                            </Box>

                            <Box p={3} alignContent="center">

                                <Typography variant="body1" component="h2" maxWidth="xs">
                                    {"Search what state you're interested in visiting."}
                                </Typography>

                            </Box>
                        </Grid>
                        <Divider />
                        <Grid item>
                            <Typography variant="h3" component="h2" maxWidth="xs">

                            </Typography>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <Grid item>
                                    <Grid container
                                        alignContent="center"
                                        alignItems="center"
                                        justspacing={2}
                                        justify="center"
                                    >
                                        {states}

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {redirect != -1 ? <Redirect to={"/states/" + redirect} /> : null}
                        <Pagination
                            limit={10}
                            offset={offset}
                            total={50}
                            onClick={(e, offset) => handleClick(offset)}
                        />

                        <Divider />
                        <Grid item>
                            <Box p={4}>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}
