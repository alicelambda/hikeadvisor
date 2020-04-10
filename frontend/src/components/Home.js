
import React, {Component} from 'react';
import '../styles/home.css';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';
import ReactSearchBox from 'react-search-box';
import { makeStyles } from '@material-ui/core/styles';

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
    width: '20%'
  }
  
});

class Home extends Component {
    data = [
        {
          key: 'austin',
          value: 'Austin, TX',
        },
        {
          key: 'seattle',
          value: 'Seattle, WA',
        },
        {
          key: 'san francisco',
          value: 'San Francisco, CA',
        },
        {
          key: 'portland',
          value: 'Portland, OR',
        },
        {
          key: 'augusta',
          value: 'Augusta, ME',
        },
      ]
    render() {
        return (
            <div>
                <body id='mybody' background={img} className="home">
                <Navigation/>
                <header className="Home-header">
                    <div className="Title-summary">
                        HikeAdvisor
                    </div>
                    <div className="summary">
                            Here to plan your next hike
                    </div> 
                    <div className="search">
                        <ReactSearchBox
                            placeholder="Where to?"
                            data={this.data}
                            callback={record => console.log(record)}/>    
                    </div>
                </header>
                </body>
            </div>
        );
    }
}

export default Home;
