/* eslint-disable jest/valid-expect */
import chai from 'chai';
import { expect } from 'chai';
import { it } from 'mocha';
import chaiHttp from 'chai-http';
import { server } from '../../server/server.js';

process.env.NODE_ENV = 'test';

// "describe" is a test suite including test cases.
describe('Fetching application tests', () => {
	it('1. The side length of the Cube', () => {
		let c1 = 2 + 5;
		expect(c1).to.equal(7);
	});
});

chai.use(chaiHttp);

// // Test the GET Request

describe('/GET users', () => {
	it('fetch users', (done) => {
		chai
			.request(server)
			.get('/')
			.end((err, res) => {
				expect(res.status).to.be.eq(200);
			});
		done();
	});
});
