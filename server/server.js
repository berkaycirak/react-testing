import Koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

const app = new Koa();
const router = new KoaRouter();

const data = [];

// json helps to make better visual appearance like indented curly brackets or etc.
app.use(json());
app.use(bodyParser());
// cors(cross origin resource sharing) for fetch data from local
app.use(cors());

// Read
router.get('/', (ctx) => {
	ctx.body = data;
});
// Add
router.post('/add', (ctx) => {
	const userInput = ctx.request.body;
	data.push(userInput);
	ctx.body = 'User added';
});
// Update
router.put('/update', (ctx) => {
	const userInput = ctx.request.body;
	const index = data.findIndex((item) => item.id === userInput.id);
	let message;
	if (index === -1) {
		data.push(userInput);
		message = 'Data added';
	} else {
		data[index] = userInput;
		message = 'Data updated.';
	}
	ctx.body = message;
});

// Delete
router.delete('/delete', (ctx) => {
	const userInput = ctx.request.body;
	const index = data.findIndex((item) => item.id === userInput.id);
	let message;
	if (index === -1) {
		message = 'Data not found';
	} else {
		delete data[index];
		message = 'Data deleted';
	}
	ctx.body = message;
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Server is listening port 3000.
export const server = app.listen(8080, () =>
	console.log('Server Started...')
);
