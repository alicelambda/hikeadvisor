import React from 'react';
import ReactDom from "react-dom";

let rootContainer;

beforeEach(() => {
	rootContainer = document.createElement("div");
	document.body.appendChild(rootContainer);

});

afterEach(() => {
	document.body.removeChild(rootContainer);
	rootContainer = null;

})

describe("App renders", () => {
	it("render ", () => {

	});

}
