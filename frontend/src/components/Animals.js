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

export default function Animals(props) {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    let poffset = useParams();

    const [animalData, setAnimals] = React.useState([]);
    const [animals, setAnimalsCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();

    React.useEffect(() => {
        setOffset(parseInt(poffset.offset));
    })

    const selectAnimalData = (offset) => {
        setAnimals(props.animalData.slice(offset * 10, (offset + 1) * 10))
    }

    React.useEffect(() => {
        setAnimalsCard(animalData.map(animal =>
            <AnimalInfo
                key={animal.id}
                info={animal}
                page={offset}
            />
        ))

    }, [animalData])


    React.useEffect(() => {
        selectAnimalData(offset);
    }, [offset]);

    React.useEffect(() => {
        selectAnimalData(offset);
    },[props.animalData]);

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
                                        {animals}

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {redirect != -1 ? <Redirect to={"/animals/" + redirect} /> : null}
                        <Pagination
                            limit={1}
                            offset={offset}
                            total={Math.floor(props.animalData.length / 10)}
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
