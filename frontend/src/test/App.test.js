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
import TrailStand from '../components/Trails/TrailStand'
configure({ adapter: new Adapter() });

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
                    <Animals />
                </Route>
            </MemoryRouter>
            , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders first Animal page without Crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/animals']} >
                <Route path='/animals'>
                    <Animals />
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
                    <Animals />
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
                    <Animals />
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
                    <Animals />
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
                <AnimalInstance/>
            </Route>
        </MemoryRouter>,div);
        ReactDOM.unmountComponentAtNode(div);
    })

});



it('renders Home without Crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter initialEntries={['/']}>
        <Route path='/'>
            <Home />
        </Route>
    </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);

});

describe('renders states', () => {
    it('renders States without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states']}>
            <Route path="/states">
                <States />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders first page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/0']}>
            <Route path="/states/0">
                <States />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders second page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/10']}>
            <Route path="/states/10">
                <States />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders third page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/20']}>
            <Route path="/states/20">
                <States />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders fourth page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/30']}>
            <Route path="/states/30">
                <States />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders fifth page of states', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/states/40']}>
            <Route path="/states/40">
                <States />
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
                <Trails />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the second trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/10']}>
            <Route path="/trail/10">
                <Trails />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the third trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/20']}>
            <Route path="/trail/20">
                <Trails />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the fourth trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/30']}>
            <Route path="/trail/30">
                <Trails />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the fifth trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/40']}>
            <Route path="/trail/40">
                <Trails />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the trails page', () => {
        const div = document.createElement('div');
        ReactDOM.render(<MemoryRouter initialEntries={['/trail/']}>
            <Route path="/trail/">
                <Trails />
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
                <TrailStand />
            </Route>
        </MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});
