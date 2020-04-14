import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

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
    backgroundColor: "#72bda3",
  },
  control: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
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



export default function Blurb(props) {
  const classes = useStyles(1);


  return (

    <div className={classes.root}  >
      <GlobalCss />
      <Box p={1}>
        <Grid item xs={12} spacing={5}>
          <Paper >
            <Box p={2}
              maxWidth={350}
              minWidth={350}
              textAlign="left"
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar className={classes.large} src={props.info["photo"]} />

                </Grid>
                <Grid item>
                  <Box>
                    <Typography variant="h5" component="h2" id="blurbtitle">
                      {props.info["name"]}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box minHeight={100} color="#60492c"> 
                <Typography variant="body1" component="h2" id="blurbtitle">
                  {props.info["description"]}
                </Typography>
              </Box>
              <Divider />
              <Box pt={1} color="#60492c">
                <Typography varient="body1">
                  {props.info.noissues} issues, {props.commits} commits, {props.info["notestcases"]} unit tests
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </div>
  )

}