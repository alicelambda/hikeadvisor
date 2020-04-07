import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Enzyme, { mount, shallow, configure } from 'enzyme';
import {expect} from 'chai'
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/Navigation';
import Blurb from './components/About/Blurb';


configure({ adapter: new Adapter() });

describe('App', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Home component is not undefined', () => {
    const component = shallow(<Home/>);
    expect(component).to.not.be.undefined;
  });
  it('About component is not undefined', () => {
    const component = shallow(<About/>);
    expect(component).to.not.be.undefined;
  });
  it('NavBar is not undefined', () => {
    const component = shallow(<NavBar/>);
    expect(component).to.not.be.undefined;
  });
});
