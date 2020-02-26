import React from 'react'
import Navigation from './Navigation';
import img from '../images/forest.jpg';

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { img } + ")"
  };

  
export default function Animals() {

    return (
        <div>
            <Navigation/>
        </div>
    )

}
