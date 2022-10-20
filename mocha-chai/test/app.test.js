/* eslint-disable jest/valid-expect */
import chai from 'chai';
import { expect } from 'chai';
import { it } from 'mocha';
import chaiHttp from 'chai-http';
import { server } from '../../server/server.js';

process.env.NODE_ENV = 'test';

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

describe('/POST user', () => {
	let name = 'Uncle Sam';
	it('post a user by entering name', (done) => {
		chai
			.request(server)
			.post('/add')
			.send(name)
			.end((err, res) => {
				console.log(res.body);
				expect(res.status).to.be.eq(200);
			});
		done();
	});
});
