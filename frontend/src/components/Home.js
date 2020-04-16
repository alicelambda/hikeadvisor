
import React, {Component} from 'react';
import '../styles/home.css';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';
import ReactSearchBox from 'react-search-box';
import { fade, makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  mybody: {
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  },
  
  HomeHeader: {
    /*background: '../static_resources/homephoto.jpg' no-repeat 'center';*/
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 100,
    flexDirection: 'column',
    fontFamily: "serif",
    width: '100%',
  },
  
  TitleSummary : {
    fontSize: '80px',
    fontFamily: "Montserrat",
    fontWeight: 'bold',
    textShadow: '1px 1px #3f3f3f;',
    /*filter: FlipH;*/
    color: '#Eff1eD',
  },
  summary: {
    fontFamily: "Montserrat",
    fontSize: '25px',
    fontWeight: 'normal',
    textShadow: '1px 1px #3f3f3f',
    color: '#Eff1eD',
    paddingBottom: 0,
  },
  search: {
    marginTop: '2%',
    width: '20%',
  }
  
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#000000",
    backgroundColor: "#03d6a0",
    '&:hover': {
      backgroundColor: "#0dd6a0",
    },
  },
}))(Button);


const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      '.MuiPaper-root': {
          backgroundColor: "#06d6a0"
      }
  },
})(() => null);

class Home extends Component {

    render() {
        return (
            <div>
              <GlobalCss/>
                <body id='mybody' background={img} className="home">
                <Navigation loading={this.props.loading}/>
                <header className="Home-header">
                    <div className="Title-summary">
                        HikeAdvisor
                    </div>
                    <div className="summary">
                            Here to plan your next hike
                    </div> 
                    <div className="search">
                    <Link to="/trails/0" style={{ textDecoration: 'none' }}>
                    <ColorButton variant="contained" color="primary">
                      Find A Trail
                    </ColorButton> 
                    </Link>
                    </div>
                </header>
                </body>
            </div>
        );
    }
}

export default Home;
