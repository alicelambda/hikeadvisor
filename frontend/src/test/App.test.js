import React from 'react'
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import { mount, shallow, configure } from 'enzyme'
import { expect } from 'chai'

import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import Animals from '../components/Animals';
import Home from '../components/Home';
import States from '../components/States';
import Trails from '../components/Trails';

import { MemoryRouter, Route } from "react-router-dom";
import AnimalInstance from '../components/Animals/AnimalInstance';
import StateInstance from '../components/States/StateInstance';
import TrailInstance from '../components/Trails/TrailInstance'
configure({ adapter: new Adapter() });

const trailData = [{
    "trail_animals": ["4246", "Pied-billed Grebe", "145245", "Yellow-rumped Warbler"],
    "trail_ascent": 1390,
    "trail_descent": -1390,
    "trail_high": 5707,
    "trail_id": 7000108,
    "trail_latitude": 37.2594,
    "trail_length": 4.4,
    "trail_location": "Springdale, Utah",
    "trail_longitude": -112.9507,
    "trail_low": 4321,
    "trail_mapPicURL": "https://maps.googleapis.com/maps/api/staticmap?center=37.2594,-112.9507&zoom=12&size=400x400&key=AIzaSyDiDwoPvTLCXHS4J-qNDVHfDu27JIlWnv4",
    "trail_name": "Angels Landing",
    "trail_numstars": 539,
    "trail_picURL": "https://cdn-files.apstatic.com/hike/7010203_medium_1554398018.jpg",
    "trail_stars": 4.9,
    "trail_states": "Utah"
}]

const animalData = [{
    "animal_ancestry": "48460",
    "animal_commonName": "Animals",
    "animal_description": "Animals are eukaryotic, multicellular organisms that form the biological kingdom Animalia. With few exceptions, animals are motile (able to move), heterotrophic (consume organic material), reproduce sexually, and their embryonic development includes a blastula stage. The body plan of the animal derives from this blastula, differentiating specialized tissues and organs as it develops; this plan eventually becomes fixed, although some undergo metamorphosis at some stage in their lives.",
    "animal_id": 1,
    "animal_isExtinct": false,
    "animal_lastSighting": "2020-03-08T10:03:38-04:00",
    "animal_location": "Vermont",
    "animal_numObser": 19495047,
    "animal_picURL": "https://static.inaturalist.org/photos/55133652/medium.jpg?1572218969",
    "animal_rank": "kingdom",
    "animal_scientificName": "Animalia",
    "animal_taxonName": "Animalia",
    "animal_taxonNetwork": "https://hikingadvisor-static.s3.amazonaws.com/Animalia.gif",
    "animal_trails": ["7002742", "Franconia Ridge Loop", "7003385", "The Presidential Traverse"]
}]

const stateData = [{
    "state_animals":
        ["40269", "Vesper Bats", "120215", "Brown-belted Bumble Bee"],
    "state_capital": "Montgomery",
    "state_elevation": 492.1,
    "state_flagPicURL": " https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Alabama_%281861%2C_obverse%29.svg",
    "state_highest": "Cheaha Mountain, 2405 ft",
    "state_landArea": 50650,
    "state_lat": 32.31823,
    "state_long": -86.902298,
    "state_lowest": "Gulf of Mexico, 0 ft",
    "state_mapPicURL": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Alabama_in_United_States.svg",
    "state_motto": "Audemus jura nostra defendere",
    "state_name": "Alabama",
    "state_population": "4.875 million people",
    "state_populationDensity": "92.99 people/mi^2",
    "state_timezone": "CDT",
    "state_totalArea": 52420,
    "state_trails": ["7042916", "Narrows Ridge Full Loop", "7085494", "Wolfden Loop"]
}]

const globalSortBy = (selector) => {
    return new Promise((resolve, reject) => {
        resolve("done sorting")
    });
};
it('renders app without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('renders states', () => {
    it('renders Animals without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals']} >
                <Route path='/animals'>

                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('renders Animals without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals']} >
                <Route path='/animals'>

                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        div.querySelector("")
        ReactDOM.unmountComponentAtNode(div);
    });


    it('renders first Animal page without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals']} >
                <Route path='/animals'>

                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders second page without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals/10']} >
                <Route path='/animals/10'>

                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders third animale page without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals/20']} >
                <Route path='/animals/20'>

                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders fourth animal page without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals/30']} >
                <Route path='/animals/30'>
                    <Animals animalData={animalData} />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('renders animal page', () => {
    it('render first animal', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/animal/5074']}>
            <Route path='/animal/5074'>
                <AnimalInstance animalData={animalData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

});



it('renders Home without Crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter initialEntries={['/']}>
        <Route path='/'>
            <Home
                loading={false}
                trailData={trailData}
                animalData={animalData}
                stateData={stateData}
            />
        </Route>
    </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);

});

describe('renders states', () => {
    it('renders States without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states']}>
            <Route path="/states">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders first page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/0']}>
            <Route path="/states/0">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        div.querySelector("Title-Summary")
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders second page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/10']}>
            <Route path="/states/10">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders third page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/20']}>
            <Route path="/states/20">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders fourth page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/30']}>
            <Route path="/states/30">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders fifth page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/40']}>
            <Route path="/states/40">
                <StateInstance stateData={stateData} />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });


});

describe('Renders different trails pages', () => {
    it('renders the first trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/0']}>
            <Route path="/trail/0">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the second trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/10']}>
            <Route path="/trail/10">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the third trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/20']}>
            <Route path="/trail/20">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the fourth trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/30']}>
            <Route path="/trail/30">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the fifth trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/40']}>
            <Route path="/trail/40">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/']}>
            <Route path="/trail/">
                <Trails
                    trailData={trailData}
                    animalData={animalData}
                    stateData={stateData}
                    globalSortBy={globalSortBy}
                />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});


describe('Renders Trail', () => {
    it('renders trail page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/7001041']}>
            <Route path="/trail/7001041">
                <TrailInstance trailData={trailData} />

            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});
