/* eslint-disable jest/valid-expect */
import { expect } from 'chai';
import { it } from 'mocha';

// "describe" is a test suite including test cases.
describe('Fetching application tests', () => {
	it('1. The side length of the Cube', () => {
		let c1 = 2 + 5;
		expect(c1).to.equal(7);
	});
});
