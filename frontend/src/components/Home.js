import React, {Component} from 'react';
import '../styles/home.css';
import Navigation from '../components/Navigation';
import img from '../images/forest.jpg';
import ReactSearchBox from 'react-search-box';


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
                <body id='mybody' background={img} className="Home">
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
