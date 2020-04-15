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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    let poffset = useParams();

    const [trailData, setTrails] = React.useState([]);
    const [trails, setTrailsCard] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [redirect, setRedirect] = React.useState(-1);
    const [pagination, setPagination] = React.useState();

    React.useEffect(() => {
        setOffset(parseInt(poffset.offset));
    })

    const selectTrailData = (offset) => {
        setTrails(props.trailData.slice(offset * 12, (offset + 1) * 12))
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
        selectTrailData(offset);
    }, [offset]);

    React.useEffect(() => {
        selectTrailData(offset);
    },[props.trailData]);

    const handleClick = (offset) => {
        setOffset(offset)
        setRedirect(offset)
    }

    const search = (query) => {
        console.log(query)
        return new Promise((resolve, reject) => {
            const result = props.trailData.filter(trail => {
                var index = 0;
                for (index = 0; index < query.length; index++) {
                    if (trail.trail_name.includes(query[index])) {
                        return true
                    }
                }
                return false

            })

            resolve(result)
        });

    }

    const upcall = (query) => {

        search(
            query.split(" ")
                .filter(term => term !== "")
        ).then((result) => {
            setTrails(result)
        })
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
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stateItems}
                            </Select>
                            <FormHelperText>Filter by State</FormHelperText>
                        </FormControl>
                      
                    </Grid>
                    <Grid item xs={9} />
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            </Select>
                            <FormHelperText>Filter by State</FormHelperText>
                        </FormControl>
                        <FormControlLabel
                            control={<Switch checked={true} onChange={handleChange} name="Descending" />}
                            label="Descending"
                        />
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
                total={Math.floor(props.trailData.length / 12)}
                onClick={(e, offset) => handleClick(offset)}
            />
        </div>
    )

}
