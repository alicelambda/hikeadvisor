import React from 'react'
import Navigation from './Navigation';
import img from '../images/forest.jpg';
import { animalData } from './Animals/animalData';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AnimalInfo from './Animals/AnimalInfo';
import Pagination from "material-ui-flat-pagination";
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

export default function Animals(props) {
    const classes = useStyles();

    const [state, setState] = React.useState('');
    const [query, setQuery] = React.useState([]);
    const [queryResults, setQueryResults] = React.useState([]);
    const [animalData, setAnimals] = React.useState([]);
    const [animals, setAnimalsCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();
    const [sort, setSort] = React.useState('');

    const pickedState = (event) => {
        setState(event.target.value);
        search(query, event.target.value)
            .then((result) => {
                setQueryResults(result)
            })
    };



    let poffset = useParams();


    React.useEffect(() => {
        setOffset(parseInt(poffset.offset));
    })

    const selectAnimalData = (offset) => {
        setAnimals(queryResults.slice(offset * 12, (offset + 1) * 12))
    }

    React.useEffect(() => {
        setAnimalsCard(animalData.map(animal =>
            <AnimalInfo
                key={animal.id}
                info={animal}
                page={offset}
                query={query}
            />
        ))

    }, [animalData])

    React.useEffect(() => {
        setAnimalsCard(animalData.map(animal =>
            <AnimalInfo
                key={animal.id}
                info={animal}
                page={offset}
                query={query}
            />
        ))
    },[]);


    React.useEffect(() => {

        selectAnimalData(offset);
        console.log("updated")

    }, [offset,queryResults]);

    React.useEffect(() => {
        search(query,state).then((result) => {
            setQueryResults(result)
        });


    },[props.animalData]);

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
                resolve(props.animalData.filter(animal => {
                    if (animal.animal_location !== state) {
                        return false
                    }
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (animal.animal_commonName.includes(query[index])) {
                                return true
                            }
                        }
                        return false
                    }

                }))
            } else {
                resolve(props.animalData.filter(animal => {
                    if (query.length == 0) {
                        return true
                    } else {
                        var index = 0;
                        for (index = 0; index < query.length; index++) {
                            if (animal.animal_commonName.includes(query[index])) {
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
            setQueryResults(result)
        })
        setQuery(navQuery)
    }

    const stateItems = [...new Set(props.animalData.map(x => x.animal_location))].sort().map(x => {
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

                            <Box p={2}  >
                                <Typography variant="h3" component="h2" maxWidth="xs">
                                    Animal Dictionary
                            </Typography>
                            </Box>
                            <Box p={3} alignContent="center">

                                <Typography variant="body1" component="h2" maxWidth="xs">
                                    {"Get information about your favorite animals"}
                                </Typography>

                            </Box>
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
                            <FormHelperText>Filter </FormHelperText>
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
                                <MenuItem value="animal_numObser">Sightings</MenuItem>
                            </Select>
                            <FormHelperText>Sort Animals</FormHelperText>
                        </FormControl>
                        </Grid>
                        <Typography>
                        Total: {queryResults.length} Animals
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
                                        {animals}

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {redirect != -1 ? <Redirect to={"/animals/" + redirect} /> : null}
                        <Pagination
                            limit={1}
                            offset={offset}
                            total={Math.floor(queryResults.length / 12) + (queryResults.length % 12 != 0 ? 1 : 0)}
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
