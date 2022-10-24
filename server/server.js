import Koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import http from 'http';
import { Server } from 'socket.io';

const app = new Koa();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST'],
	},
});

const data = [];

// json helps to make better visual appearance like indented curly brackets or etc.
app.use(json());
app.use(bodyParser());
// cors(cross origin resource sharing) for fetch data from local
app.use(cors());

// Server is listening port 8080.

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);
	socket.on('submit', (data) => {
		socket.emit('receive_data', data);
		console.log(data);
	});
});

export const server = httpServer.listen(8080, () =>
	console.log('Server Started...')
);
