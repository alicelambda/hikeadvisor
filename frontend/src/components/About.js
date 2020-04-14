import React from 'react';
import Container from '@material-ui/core/Container';
import Blurb from './About/Blurb';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { blurbData, blurb } from './About/AboutData';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';


var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { img } + ")"
};


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: " #32dde3",
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

export default function About() {


    const classes = useStyles();

    const trans = {
        "Alice Reuter": "Alice Reuter",
        "alice reuter": "Alice Reuter",
        "Alice": "Alice Reuter",
        "Long Do": "Long Do",
        "nzubair76": "Nabil Zubair",
        "Nabil Zubair": "Nabil Zubair",
        "Nabil Zubair": "Nabil Zubair",
        "jtrunick": "Josh Trunick",
        "Josh Trunick": "Josh Trunick",
        "austin0209": "Austin Aurelio",
        "Austin Aurelio": "Austin Aurelio"
    }

    const [commits, setCommits] = React.useState({
        "Alice Reuter": 0,
        "Long Do": 0,
        "Josh Trunick": 0,
        "Nabil Zubair": 0,
        "Austin Aurelio": 0
    });

    const [blurbs, setBlurbs] = React.useState();

    const getCommitPageData = (page) => {
        fetch("https://gitlab.com/api/v4/projects/17074163/repository/commits?page=" + page)
            .then(response => {
                var rpage = response.headers.get("x-total-pages");

                if (rpage > page) {
                    getCommitPageData(page + 1);
                }
                return response.json()
            })
            .then(data => {
                const lcommits = commits;
                data.forEach((element) => {
                    const tran = trans[element.author_name];
                    lcommits[tran] = lcommits[tran] + 1;

                })
                setCommits(lcommits)
            })

    }

    const getCommitData = () => {
        getCommitPageData(1)

    }

    const getPersonData = (name, page) => {
        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=" + name + "&page=" + page)
            .then(response => {
                var rpage = response.headers.get("x-total-pages");

                if (rpage > page) {
                    getPersonData(name, page + 1)
                }
                return response.json()
            })
            .then(data => {
                var newBlurbData = blurbData;
                var i;
                for (i = 0; i < newBlurbData.length; i++) {
                    if (newBlurbData[i].username === name) {
                        newBlurbData[i].noissues = newBlurbData[i].noissues + data.length;

                    }
                }
                setBlurbs(newBlurbData.map(blurb => {
                    const tran = trans[blurb.name];
                    console.log(tran + " " + blurb.name);


                    return <Blurb
                        info={blurb}
                        commits={commits[tran]}
                        issues={blurb.noissues}
                    />
                }));
            })


    }

    const getIssueData = () => {
        blurbData.map(x => getPersonData(x.username, 1))
    }

    React.useEffect(() => {
        getCommitData()

    }, []);

    React.useEffect(() => {
        getIssueData()
    }, []);


    React.useEffect(() => {
        setBlurbs(blurbData.map(blurb => {
            const tran = trans[blurb.name];
            console.log(tran + " mow" + blurb.name);
            return <Blurb
                info={blurb}
                commits={commits[tran]}
                issues={blurb.noissues}
            />
        }))
    }, [commits, blurbData, blurbs]);
    return (
        <div className={classes.root}>
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

                            <Box p={4}  >
                                <Typography variant="h2" component="h2" maxWidth="xs">
                                    Hike Advisor
                            </Typography>
                            </Box>

                            <Box textAlign="left" p={3} alignContent="center" color="#60492c">

                                <Typography variant="body1" component="h2" maxWidth="xs">
                                    {blurb}
                                </Typography>

                            </Box>
                        </Grid>
                        <Divider />
                        <Grid item>
                            <Typography variant="h3" component="h2" maxWidth="xs">
                                Team
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
                                        {blurbs}

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider />
                        <Grid item>
                            <Box p={4}>


                                <Typography variant="h3" component="h2" maxWidth="xs">
                                    Data sources
                        </Typography>

                                <Box color="#60492c">
                                    <Typography variant="body1" component="h2" maxWidth="xs">
                                        Our team made use of <a href="https://www.inaturalist.org">iNaturalist data</a> for animal sightings, <a href="https://docs.ropensci.org/rebird/">Rebird</a> for bird sightings, <a href="https://www.hikingproject.com">Hiking Project</a> for hiking trails, and <a href="https://meta.wikimedia.org/w/api.php">Wikimedia</a> for state/city info.
                        </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box p={4}>


                                <Typography variant="h3" component="h2" maxWidth="xs">
                                    Tools
                        </Typography>
        <Box color="#60492c">
                                <Typography variant="body1" component="h2" maxWidth="xs">
                                    <a href="https://aws.amazon.com/">AWS</a>, <a href="https://www.postman.com/">Postman</a>, <a href="https://gitlab.com/">Gitlab</a>, <a href="https://reactjs.org/">React</a>, <a href="https://slack.com/">Slack</a>, <a href="https://www.namecheap.com/">Namecheap</a>
                                </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box p={4}>


                                <Typography variant="h3" component="h2" maxWidth="xs">
                                    Links
                        </Typography>

                                <Typography variant="body1" component="h2" maxWidth="xs">
                                    <a href="https://gitlab.com/alicelambda/hikeadvisor">Gitlab Repo</a>, <a href="https://documenter.getpostman.com/view/10487499/SzKWuxeb?version=latest"> Postman Docs </a>
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </div>
    )
}
