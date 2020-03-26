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
import { ContentTextFormat } from 'material-ui/svg-icons';


var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { img } + ")"
  };


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
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
    
    const private_token = "yizfdQxzAde2eFKmjbgz";

    const [commits, setCommits] = React.useState({});

    const [lissues,setlissues] = React.useState(0);
    const [alissues,setalissues] = React.useState(0);
    const [asissues,setasissues] = React.useState(0);
    const [jissues,setjissues] = React.useState(0);
    const [nissues,setnissues] = React.useState(0);


    const getCommitData = () => {
        fetch("https://gitlab.com/api/v4/projects/17074163/repository/commits", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const commits = {}
            data.forEach((element) => {
                if (!(element.author_name in commits)) {
                    commits[element.author_name] = 1
                } else {
                    commits[element.author_name] = commits[element.author_name] + 1;
                }
            })
            const finalCommits = {
                "Alice Reuter":commits["alice reuter"],
                "Long Do":commits["Long Do"],
                "Josh Trunick":commits["jtrunick"],
                "Nabil Zubair":commits["Nabil Zubair"],
                "Austin Aurelio":commits["Austin Aurelio"],
            }
            setCommits(finalCommits)
        })
    }

    const getIssueData = () => {
        const username = ["nzubair76","LongDo16","jtrunick","austinrandy0209","alicelambda"]

        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=alicelambda", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setalissues(data.length)
        })

        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=LongDo16", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setlissues(data.length)
        })

        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=austinrandy0209", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setasissues(data.length)
        })
        
        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=jtrunick", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setjissues(data.length)
        })

        fetch("https://gitlab.com/api/v4/projects/17074163/issues?author_username=nzubair76", {
            headers: {
                "PRIVATE-TOKEN":`${private_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setnissues(data.length)
        })
    }

    React.useEffect(() => {
        getCommitData()
        getIssueData()
    }, []);

    const blurbs = blurbData.map(blurb =>
        <Blurb
            info={blurb}
            comms={commits}
            asissues={asissues}
            alissues={alissues}
            nissues={nissues}
            lissues={lissues}
            jissues={jissues}
        />)

    return (
        <div>
        <Navigation/> 
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
                        
                        <Box p={4} >
                            <Typography variant="h2" component="h2" maxWidth="xs">
                                Hike Advisor
                            </Typography>
                        </Box>

                        <Box textAlign="left" p={3} alignContent="center">

                            <Typography variant="body1" component="h2" maxWidth="xs">
                                {blurb}
                            </Typography>

                        </Box>
                    </Grid>
                    <Divider/>
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
                    
                    <Divider/>
                    <Grid item>
                      <Box p={4}>

                        
                        <Typography variant="h3" component="h2" maxWidth="xs">
                            Data sources
                        </Typography>
                        
                        <Typography variant="body1" component="h2" maxWidth="xs">
                            Our team made use of <a href="https://www.inaturalist.org">iNaturalist data</a> for animal sightings, <a href="https://docs.ropensci.org/rebird/">Rebird</a> for bird sightings, <a href="https://www.hikingproject.com">Hiking Project</a> for hiking trails, and <a href="https://meta.wikimedia.org/w/api.php">Wikimedia</a> for state/city info.
                        </Typography>
                            </Box>
                    </Grid>
                      <Grid item>
                      <Box p={4}>

                        
                        <Typography variant="h3" component="h2" maxWidth="xs">
                            Tools
                        </Typography>
                            
                        <Typography variant="body1" component="h2" maxWidth="xs">
                            <a href="https://aws.amazon.com/">AWS</a>, <a href= "https://www.postman.com/">Postman</a>, <a href= "https://gitlab.com/">Gitlab</a>, <a href="https://reactjs.org/">React</a>, <a href="https://slack.com/">Slack</a>, <a href="https://www.namecheap.com/">Namecheap</a>
                        </Typography>
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
