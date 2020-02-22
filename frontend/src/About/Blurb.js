import React from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

export default function Blurb() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                <Avatar alt="Remy Sharp" src="/face.jpg" className={classes.large} />
                <p>Alice Reuter (Frontend)</p>
                <p></p>

            </Container>
        </div>
    )

}