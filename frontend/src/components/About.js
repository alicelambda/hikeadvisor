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
            return <Blurb
                info={blurb}
                commits={commits[tran]}
                issues={blurb.noissues}
            />
        }))
    }, [commits, blurbData, blurbs]);
    return (
        <div className={classes.root}>
            <Navigation notsearchable={true}/>
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
                                    <a height="90" href="https://aws.amazon.com/"><img src="https://d0.awsstatic.com/logos/powered-by-aws.png" alt="Powered by AWS Cloud Computing"/></a>
                                    <a href="https://www.postman.com/"><img height="90" src="https://assets.getpostman.com/common-share/postman-logo-stacked.svg"></img></a>
                                    <a href="https://gitlab.com/"> <img height="100" src="https://about.gitlab.com/images/press/logo/svg/gitlab-logo-gray-stacked-rgb.svg"/></a>
                                    <a href="https://reactjs.org/"><img height="90" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"/></a>
                                    <a href="https://slack.com/"><img height="100" src="https://brandfolder.com/slack/attachments/pl546j-7le8zk-6gwiyo?dl=true&resource_key=pl53se-o7edc-2zw45a&resource_type=Collection"/></a>
                                    <a href="https://www.namecheap.com/"><img height="50" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjU4IDQ2LjU3Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1OS45OSIgeTE9IjQ0LjE2IiB4Mj0iODAuMDEiIHkyPSIxLjIzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDQyMDJjIi8+PHN0b3Agb2Zmc2V0PSIwLjEiIHN0b3AtY29sb3I9IiNkYzNkMjkiIHN0b3Atb3BhY2l0eT0iMC43OSIvPjxzdG9wIG9mZnNldD0iMC4yIiBzdG9wLWNvbG9yPSIjZTQ1OTI2IiBzdG9wLW9wYWNpdHk9IjAuNTgiLz48c3RvcCBvZmZzZXQ9IjAuMzIiIHN0b3AtY29sb3I9IiNlYTcxMjMiIHN0b3Atb3BhY2l0eT0iMC40Ii8+PHN0b3Agb2Zmc2V0PSIwLjQzIiBzdG9wLWNvbG9yPSIjZjA4NTIxIiBzdG9wLW9wYWNpdHk9IjAuMjUiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiNmNDk0MWYiIHN0b3Atb3BhY2l0eT0iMC4xNCIvPjxzdG9wIG9mZnNldD0iMC42OCIgc3RvcC1jb2xvcj0iI2Y3OWYxZSIgc3RvcC1vcGFjaXR5PSIwLjA2Ii8+PHN0b3Agb2Zmc2V0PSIwLjgyIiBzdG9wLWNvbG9yPSIjZjhhNTFkIiBzdG9wLW9wYWNpdHk9IjAuMDIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOWE3MWQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTc3Ny40OCIgeTE9IjEwNDguNzYiIHgyPSIxNzk3LjUiIHkyPSIxMDA1LjgzIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MDMuNSAxMDUyLjYpIHJvdGF0ZSgxODApIiB4bGluazpocmVmPSIjYSIvPjwvZGVmcz48dGl0bGU+Y24tbG9nbzwvdGl0bGU+PHBhdGggZD0iTTc3LjE3LjcxYTcuODcsNy44NywwLDAsMC02Ljg4LDQuMDVsLS4xNi4zM0w2NCwxNy4yNWwtNy44LDE1LjM3LDUuMTEsMTAuMDcuMjguNTVBOCw4LDAsMCwwLDY1LDQ2LjQ3YTguMDUsOC4wNSwwLDAsMCwzLjQxLTMuMjNsLjI4LS41NUw4NCwxMi40OGwuMzctLjczYTcuODYsNy44NiwwLDAsMC03LjE5LTExWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTI5Ljg1LDE1LjM0bC01LjEtMTAtLjI4LS41NWE3Ljg5LDcuODksMCwwLDAtMy40LTMuMjIsNy45Miw3LjkyLDAsMCwwLTMuNCwzLjIxbC0uMjkuNTZMMi4wNSwzNS41MmwtLjM3LjcyYTcuODYsNy44NiwwLDAsMCwxNC4wNiw3bC4xNy0uMzIsNi4xNy0xMi4xNkwyOS44NywxNS40WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTc3LjE1LjcxYTcuODYsNy44NiwwLDAsMC02Ljg3LDQuMDVsLS4xNy4zM0w2My45NCwxNy4yNSw1Ni4xMywzMi42Mmw1LjEyLDEwLjA3LjI4LjU1YTcuOTQsNy45NCwwLDAsMCwzLjQxLDMuMjMsNy45NCw3Ljk0LDAsMCwwLDMuNDEtMy4yM2wuMjktLjU1TDg0LDEyLjQ4bC4zNi0uNzNhNy44Niw3Ljg2LDAsMCwwLTcuMTktMTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9InVybCgjYSkiLz48cGF0aCBkPSJNOC44Niw0Ny4yOWE3Ljg2LDcuODYsMCwwLDAsNi44Ny00bC4xNy0uMzMsNi4xOC0xMi4xNiw3LjgtMTUuMzdMMjQuNzcsNS4zMWwtLjI4LS41NWE4LDgsMCwwLDAtMy40Mi0zLjIzLDgsOCwwLDAsMC0zLjQxLDMuMjNsLS4yOC41NUwyLDM1LjUybC0uMzcuNzNhNy44Niw3Ljg2LDAsMCwwLDcuMTksMTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJNMjkuODUsMTUuMzRsLTUuMS0xMC0uMjgtLjU1YTcuOTQsNy45NCwwLDAsMC0zLjQxLTMuMjNBOC4zMSw4LjMxLDAsMCwxLDIyLjU1LDFhOC4xNiw4LjE2LDAsMCwxLDItLjI1SDM1LjIzYTcuOTIsNy45MiwwLDAsMSw2Ljg2LDRsLjI4LjU1TDU2LjE4LDMyLjY2bDUuMDksMTAsLjI4LjU1QTgsOCwwLDAsMCw2NSw0Ni40N2E4LjA1LDguMDUsMCwwLDEtMy40Ny44MUg1MC43OWE3LjkxLDcuOTEsMCwwLDEtNi44NS00bC0uMjktLjU1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjZmY4YzQ0Ii8+PHBhdGggZD0iTTk4LDI0LjUzYS43Ni43NiwwLDAsMSwuODQtLjg0aC42YS43NS43NSwwLDAsMSwuOC44NHYxLjk0YTUuNzUsNS43NSwwLDAsMS0uMTMsMS4yMWguMDdhNy40Myw3LjQzLDAsMCwxLDYuOC00LjM5YzQuMTksMCw1LjY2LDIuMzgsNS42Niw2LjUzdjkuODlhLjc2Ljc2LDAsMCwxLS44NC44NGgtLjYzYS43NC43NCwwLDAsMS0uODEtLjg0VjMwLjQzYzAtMi42NS0uNDMtNS0zLjY4LTUtMy41OSwwLTYuNCwyLjk1LTYuNCw2Ljg4djcuNGEuNzQuNzQsMCwwLDEtLjgxLjg0aC0uNjNhLjc2Ljc2LDAsMCwxLS44NC0uODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMTI0Ljg5LDMwLjIzaDF2LS41NGMwLTMuMjUtMS43OC00LjM2LTQuMTYtNC4zNmE4LDgsMCwwLDAtNC4wOSwxLjE4Ljc5Ljc5LDAsMCwxLTEuMTMtLjI3bC0uMjEtLjM0YS43Ni43NiwwLDAsMSwuMjQtMS4xNCwxMC4zNCwxMC4zNCwwLDAsMSw1LjM2LTEuNDdjNCwwLDYuMjcsMi4yNCw2LjI3LDYuNDd2MTBhLjc0Ljc0LDAsMCwxLS44MS44NGgtLjUzYS43NS43NSwwLDAsMS0uODQtLjg0VjM4LjM3YTcuMTQsNy4xNCwwLDAsMSwuMS0xLjI3SDEyNkE2LjI1LDYuMjUsMCwwLDEsMTIwLjMsNDFjLTIuODUsMC01LjctMS42Ny01LjctNC45MkMxMTQuNiwzMC41MywxMjEuNjQsMzAuMjMsMTI0Ljg5LDMwLjIzWk0xMjAuNywzOWMzLjI1LDAsNS4xNi0zLjM1LDUuMTYtNi4zdi0uOGgtLjk0Yy0yLjY1LDAtOCwuMS04LDMuODhDMTE2Ljk0LDM3LjQsMTE4LjE5LDM5LDEyMC43LDM5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjNmU2ZjcxIi8+PHBhdGggZD0iTTEzMS4zOSwyNC41M2EuNzYuNzYsMCwwLDEsLjg0LS44NGguNmEuNzUuNzUsMCwwLDEsLjguODR2MS45NGE1Ljc1LDUuNzUsMCwwLDEtLjEzLDEuMjFoLjA3YTcuMTUsNy4xNSwwLDAsMSw2LjItNC4zOWMzLjExLDAsNC43MiwxLjQ0LDUuMTksNC4yMkgxNDVhNy4xNiw3LjE2LDAsMCwxLDYuMi00LjIyYzQuMDksMCw1LjU5LDIuMzgsNS41OSw2LjUzdjkuODlhLjc2Ljc2LDAsMCwxLS44My44NGgtLjYxYS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjM5YzAtMi43NC0uNTYtNS0zLjYxLTUtMy4zOSwwLTUuNjcsMy41NS01LjY3LDd2Ny4zYS43My43MywwLDAsMS0uOC44NGgtLjY0YS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjM5YzAtMi41NC0uMzctNS0zLjU1LTUtMy40MiwwLTUuNzYsMy42Mi01Ljc2LDd2Ny4zYS43NC43NCwwLDAsMS0uODEuODRoLS42M2EuNzYuNzYsMCwwLDEtLjg0LS44NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0xNjcuMjgsMjMuMjljNC40OSwwLDcsMy4yNSw3LDhhLjg0Ljg0LDAsMCwxLS44OC44NEgxNjEuMzFjLjEsNC4yOSwzLjA1LDYuNzQsNi41NCw2Ljc0YTcuMTcsNy4xNywwLDAsMCw0LjQyLTEuNTUuNy43LDAsMCwxLDEuMTEuMmwuMjcuNDFhLjc4Ljc4LDAsMCwxLS4yNCwxLjFBOS41MSw5LjUxLDAsMCwxLDE2Ny43OCw0MSw4LjUxLDguNTEsMCwwLDEsMTU5LDMyLjE0QzE1OSwyNi42MSwxNjIuNzIsMjMuMjksMTY3LjI4LDIzLjI5Wk0xNzIsMzAuNDZjLS4xNC0zLjU1LTIuMjgtNS4zLTQuOC01LjNhNS44Miw1LjgyLDAsMCwwLTUuOCw1LjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMTg1LjE3LDIzLjI5YTguODQsOC44NCwwLDAsMSw1LjYsMS45MS43Mi43MiwwLDAsMSwuMSwxLjE0bC0uMjMuMzdjLS4zLjQ3LS42Ny40Ny0xLjE0LjE3YTcsNywwLDAsMC00LjI2LTEuNTUsNi41LDYuNSwwLDAsMC02LjU3LDYuODEsNi41LDYuNSwwLDAsMCw2LjYsNi43N0E3LjM1LDcuMzUsMCwwLDAsMTkwLDM3LjEzYS42Ny42NywwLDAsMSwxLjExLjJsLjIzLjM0YS44LjgsMCwwLDEtLjIsMS4xMyw5LjMyLDkuMzIsMCwwLDEtNiwyLjE1LDguNTMsOC41MywwLDAsMS04Ljg0LTguODFBOC41OSw4LjU5LDAsMCwxLDE4NS4xNywyMy4yOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0xOTMuNjUsMTcuODNhLjczLjczLDAsMCwxLC44LS44NGguNjRhLjc2Ljc2LDAsMCwxLC44NC44NHY4LjQxYTcuMTgsNy4xOCwwLDAsMS0uMTMsMS4zN2guMDZhNy40Myw3LjQzLDAsMCwxLDYuNzQtNC4zMmM0LjE5LDAsNS42NiwyLjM4LDUuNjYsNi41M3Y5Ljg5YzAsLjU0LS4yNi44NC0uOC44NGgtLjY0YS43Ni43NiwwLDAsMS0uODQtLjg0VjMwLjQzYzAtMi42NS0uNC01LTMuNjgtNS0zLjU1LDAtNi4zNywyLjkyLTYuMzcsN3Y3LjNhLjc2Ljc2LDAsMCwxLS44NC44NGgtLjY0YS43My43MywwLDAsMS0uOC0uODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMC43MSkiIGZpbGw9IiM2ZTZmNzEiLz48cGF0aCBkPSJNMjE4Ljc1LDIzLjI5YzQuNDksMCw3LDMuMjUsNyw4YS44NC44NCwwLDAsMS0uODcuODRIMjEyLjc5Yy4xLDQuMjksMy4wNSw2Ljc0LDYuNTMsNi43NGE3LjIsNy4yLDAsMCwwLDQuNDMtMS41NS42OS42OSwwLDAsMSwxLjEuMmwuMjcuNDFhLjc4Ljc4LDAsMCwxLS4yMywxLjFBOS41Nyw5LjU3LDAsMCwxLDIxOS4yNiw0MWE4LjUyLDguNTIsMCwwLDEtOC44Mi04LjgxQzIxMC40NCwyNi42MSwyMTQuMTksMjMuMjksMjE4Ljc1LDIzLjI5Wm00LjczLDcuMTdjLS4xMy0zLjU1LTIuMjgtNS4zLTQuOC01LjNhNS44LDUuOCwwLDAsMC01Ljc5LDUuM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjxwYXRoIGQ9Ik0yMzcuMTIsMzAuMjNoMXYtLjU0YzAtMy4yNS0xLjc4LTQuMzYtNC4xNi00LjM2YTcuODUsNy44NSwwLDAsMC00LjA4LDEuMTguOC44LDAsMCwxLTEuMTQtLjI3bC0uMi0uMzRhLjc2Ljc2LDAsMCwxLC4yMy0xLjE0LDEwLjM0LDEwLjM0LDAsMCwxLDUuMzYtMS40N2M0LDAsNi4yNywyLjI0LDYuMjcsNi40N3YxMGEuNzQuNzQsMCwwLDEtLjgxLjg0SDIzOWEuNzUuNzUsMCwwLDEtLjg0LS44NFYzOC4zN2E3LjE0LDcuMTQsMCwwLDEsLjEtMS4yN2gtLjA3QTYuMjUsNi4yNSwwLDAsMSwyMzIuNTMsNDFjLTIuODUsMC01LjctMS42Ny01LjctNC45MkMyMjYuODMsMzAuNTMsMjMzLjg3LDMwLjIzLDIzNy4xMiwzMC4yM1pNMjMyLjkzLDM5YzMuMjUsMCw1LjE2LTMuMzUsNS4xNi02LjN2LS44aC0uOTRjLTIuNjUsMC04LC4xLTgsMy44OEMyMjkuMTcsMzcuNCwyMzAuNDEsMzksMjMyLjkzLDM5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEgLTAuNzEpIiBmaWxsPSIjNmU2ZjcxIi8+PHBhdGggZD0iTTI0My42NSwyNC41M2EuNzQuNzQsMCwwLDEsLjgxLS44NEgyNDVhLjcyLjcyLDAsMCwxLC44MS43N3YxLjIxYTYsNiwwLDAsMS0uMSwxLjE0aC4wNmE2LjI4LDYuMjgsMCwwLDEsNS45LTMuNTJjNC41MywwLDcuMzQsMy42Miw3LjM0LDguODVTMjU1LjgyLDQxLDI1MS40Myw0MWE2LjEzLDYuMTMsMCwwLDEtNS41Ny0zLjQyaC0uMDZhNy44NCw3Ljg0LDAsMCwxLC4xMywxLjQ4djcuNGEuNzYuNzYsMCwwLDEtLjg0Ljg0aC0uNjNhLjc0Ljc0LDAsMCwxLS44MS0uODRabTcuNTQsMTQuMzhjMywwLDUuNDctMi40OCw1LjQ3LTYuNzcsMC00LjEzLTIuMjItNi43Ny01LjMzLTYuNzctMi44MiwwLTUuNDcsMi01LjQ3LDYuOEMyNDUuODYsMzUuNTUsMjQ3Ljc0LDM4LjkxLDI1MS4xOSwzOC45MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIC0wLjcxKSIgZmlsbD0iIzZlNmY3MSIvPjwvc3ZnPgo="></img></a>
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
                                    <a href="https://gitlab.com/alicelambda/hikeadvisor">Gitlab Repo</a>, <a href="https://documenter.getpostman.com/view/10487499/SzYW41ND?version=latest#d248d640-aeb8-4e54-83e1-55564d26752d"> Postman Docs </a>
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </div>
    )
}
