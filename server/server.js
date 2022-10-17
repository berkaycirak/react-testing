import Koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new KoaRouter();

const data = [
	{
		id: 1,
		name: 'John',
		surname: 'Emmet',
	},
	{
		id: 2,
		name: 'Johnie',
		surname: 'Telle',
	},
	{
		id: 3,
		name: 'Henry',
		surname: 'Russel',
	},
];

// json helps to make better visual appearance like indented curly brackets or etc.
app.use(json());
app.use(bodyParser());

// Read
router.get('/', (ctx) => (ctx.body = data));
// Add
router.post('/add', (ctx) => {
	const userInput = ctx.request.body;

	ctx.body = userInput;
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
app.listen(3000, () => console.log('Server Started...'));
