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
import zIndex from '@material-ui/core/styles/zIndex';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    formControl: {
        padding: 2
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

export default function States(props) {
    const classes = useStyles();

    const [timezone, setTimezone] = React.useState('');
    const [query, setQuery] = React.useState([]);
    const [queryResults, setQueryResults] = React.useState([]);
    const [stateData, setStates] = React.useState([]);
    const [states, setStatesCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();
    const [sort, setSort] = React.useState('');

    const pickedTimezone = (event) => {
        setTimezone(event.target.value);
        search(query, event.target.value)
            .then((result) => {
                setQueryResults(result)
                setOffset(0);
                console.log("set offset")
            })
    };



    let poffset = useParams();


    React.useEffect(() => {
        setOffset(parseInt(poffset.offset));
    })

    const selectStateData = (offset) => {
        setStates(queryResults.slice(offset * 12, (offset + 1) * 12))
    }

    React.useEffect(() => {
        setStatesCard(stateData.map(state =>
            <StateInfo
                key={state.name}
                info={state}
                page={offset}
                query={query}
            />
        ))

    }, [stateData])

    React.useEffect(() => {
        setStatesCard(stateData.map(state =>
            <StateInfo
                key={state.name}
                info={state}
                page={offset}
                query={query}
            />
        ))
    },[]);


    React.useEffect(() => {

        selectStateData(offset);
        console.log("updated")

    }, [offset,queryResults]);

    React.useEffect(() => {
        search(query,timezone).then((result) => {
            setQueryResults(result)
        });


    },[props.stateData]);

    const handleClick = (offset) => {
        setOffset(offset)
        setRedirect(offset)
    }

    const sortBy = (event) => {
        setSort(event.target.value)
        props.globalSortBy(event.target.value).then(() => {

        });
    }

    const search = (query, timezone) => {
        return new Promise((resolve, reject) => {
            if (timezone !== '') {
                resolve(props.stateData.filter(state => {
                    if (state.state_timezone !== timezone) {
                        return false
                    }
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (state.state_name.includes(query[index])) {
                                return true
                            }
                        }
                        return false
                    }

                }))
            } else {
                resolve(props.stateData.filter(state => {
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (state.state_name.includes(query[index])) {
                                return true
                            }
                        }
                        return false
                    }
                }))

            }
        });

    }

    const upcall = (navQuery) => {

        search(
            navQuery.split(" ")
                .filter(term => term !== ""), timezone
        ).then((result) => {
            setQueryResults(result);
            setOffset(0);
        })
        setQuery(navQuery.split(" ").filter(x => x !== ""))
    }

    const timezoneItems = [...new Set(props.stateData.map(x => x.state_timezone))].sort().map(x => {
        return <MenuItem value={x}>{x}</MenuItem>
    })

    return (
        <div className={classes.root}>
            <GlobalCss />
            <Navigation upcall={upcall}/>
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
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Timezone</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={timezone}
                                onChange={pickedTimezone}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {timezoneItems}
                            </Select>
                            <FormHelperText>Timezone Filter</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={sort}
                                onChange={sortBy}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="state_elevation">Elevation</MenuItem>
                                <MenuItem value="state_totalArea">Area</MenuItem>
                            </Select>
                            <FormHelperText>Sort States By</FormHelperText>
                        </FormControl>
                        </Grid>
                        <Typography>
                        Total: {queryResults.length} States
                        </Typography>
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
                limit={1}
                offset={offset}
                total={Math.floor(queryResults.length / 10) + (queryResults.length % 10 != 0 ? 1 : 0)}
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
