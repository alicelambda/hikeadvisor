import React from 'react'
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import { mount, shallow, configure } from 'enzyme'
import {expect} from 'chai'

import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
