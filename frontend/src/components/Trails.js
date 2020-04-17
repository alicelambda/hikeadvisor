import React from 'react';
import Navigation from '../components/Navigation';
import TrailCard from './Trails/TrailCard';
import Grid from '@material-ui/core/Grid';
import Pagination from "material-ui-flat-pagination";
import { Redirect, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#32dde3",

    },
    formControl: {
        padding: 2
    }

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

export default function Trails(props) {
    const classes = useStyles();

    const [state, setState] = React.useState('');
    const [query, setQuery] = React.useState([]);
    const [queryResults, setQueryResults] = React.useState([]);
    const [trailData, setTrails] = React.useState([]);
    const [trails, setTrailsCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();
    const [sort, setSort] = React.useState('');

    const pickedState = (event) => {
        setState(event.target.value);
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

    const selectTrailData = (offset) => {
        setTrails(queryResults.slice(offset * 12, (offset + 1) * 12))
    }

    React.useEffect(() => {
        setTrailsCard(trailData.map(trail =>
            <TrailCard
                key={trail.id}
                info={trail}
                page={offset}
                query={query}
            />
        ))

    }, [trailData])

    React.useEffect(() => {
        setTrailsCard(trailData.map(trail =>
            <TrailCard
                key={trail.id}
                info={trail}
                page={offset}
                query={query}
            />
        ))
    },[]);


    React.useEffect(() => {

        selectTrailData(offset);
        console.log("updated")

    }, [offset,queryResults]);

    React.useEffect(() => {
        search(query,state).then((result) => {
            setQueryResults(result)
        });


    },[props.trailData]);

    const handleClick = (offset) => {
        setOffset(offset)
        setRedirect(offset)
    }

    const sortBy = (event) => {
        setSort(event.target.value)
        props.globalSortBy(event.target.value).then(() => {

        });
    }

    const search = (query, state) => {
        return new Promise((resolve, reject) => {
            if (state !== '') {
                resolve(props.trailData.filter(trail => {
                    if (trail.trail_states !== state) {
                        return false
                    }
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (trail.trail_name.toLower().includes(query[index].toLower())) {
                                return true
                            }
                        }
                        return false
                    }

                }))
            } else {
                resolve(props.trailData.filter(trail => {
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (trail.trail_name.toLowerCase().includes(query[index].toLowerCase())) {
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
                .filter(term => term !== ""), state
        ).then((result) => {
            setQueryResults(result);
            setOffset(0);
        })
        setQuery(navQuery.split(" ").filter(x => x !== ""))
    }

    const stateItems = [...new Set(props.trailData.map(x => x.trail_states))].sort().map(x => {
        return <MenuItem value={x}>{x}</MenuItem>
    })



    return (
        <div className={classes.root}>
            <GlobalCss />
            <Navigation upcall={upcall} />
            <Box p={3}>
                <Grid container>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={state}
                                onChange={pickedState}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stateItems}
                            </Select>
                            <FormHelperText>Filter by State</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item xs={9}>
                        
                    </Grid>
                    <Grid item>
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
                                <MenuItem value="trail_ascent">Ascent</MenuItem>
                                <MenuItem value="trail_descent">Descent</MenuItem>
                                <MenuItem value="trail_high">Highest Point</MenuItem>
                                <MenuItem value="trail_low">Lowest Point</MenuItem>
                                <MenuItem value="trail_length">Length</MenuItem>
                                <MenuItem value="trail_stars">Rating</MenuItem>
                                <MenuItem value="trail_numstars">No. Ratings</MenuItem>
                            </Select>
                            <FormHelperText>Sort by Attribute</FormHelperText>
                        </FormControl>
                        <Typography>
                        Total: {queryResults.length} Trails
                        </Typography>

                    </Grid>
                </Grid>
            </Box>
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
                limit={1}
                offset={offset}
                total={Math.floor(queryResults.length / 12) + (queryResults.length % 12 != 0 ? 1 : 0)}
                onClick={(e, offset) => handleClick(offset)}
            />
        </div>
    )

}
