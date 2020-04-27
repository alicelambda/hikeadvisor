import React from 'react';
import { withRouter } from 'react-router-dom';
import stateDataVisualization from '../data/stateDataVisualization.json';
import accidentDataVisualization from '../data/accidentDataVisualization.json';
import animalDataVisualization from '../data/animalDataVisualization.json';
import trailDataVisualization from '../data/trailDataVisualization.json';
import housingDataVisualization from '../data/housingDataVisualization.json'
import crimeDataVisualization from '../data/crimeDataVisualization.json';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BarChart from './Graphs/BarChart';
import PieChart from './Graphs/PieChart';
import Scatterplot from './Graphs/Scatterplot';
import Navigation from '../components/Navigation';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#32dde3",
        minHeight: "100vh",

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

export default function Visualizations(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<GlobalCss/>
			<Navigation notsearchable={true}/>
			<h1>HikeAdvisor Visualizations</h1>
			<br/>
			<br/>
			<h2>State and Timezone</h2>
			<BarChart data={stateDataVisualization} xAttr="timezone" yAttr="numStates" />
			<h2>Animal Taxonomy</h2>
			<PieChart data={animalDataVisualization} count={10}/>
			<h2>Trail and Average Rating</h2>
			<Scatterplot data={trailDataVisualization} xAttr="stars" yAttr="num" xMin={0} xMax={6} yMin ={0} yMax={100} xLabel="Stars" yLabel="Number of Trails" />
			<h1>Developer (KeepAustinSafe) Visualizations</h1>
			<h2>Hot Spot Areas and Hot Places of Crime</h2>
			<BarChart data={crimeDataVisualization} xAttr="location" yAttr="count"/>
			<h2>Categories of Traffic Accidents</h2>
			<PieChart data={accidentDataVisualization} count={13}/>
			<h2>Zipcode vs Affordable Housing</h2>
			<Scatterplot data={housingDataVisualization} xAttr="zipcode" yAttr="count" xMin={78609} xMax={78760} yMin={0} yMax={970} xLabel="Zipcode" yLabel="Number of Housings" />
		</div>
	);
}