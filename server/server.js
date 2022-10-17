import Koa from 'koa';
import KoaRouter from 'koa-router';
import json from 'koa-json';

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

router.get('/', (ctx) => (ctx.body = data));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Server is listening port 3000.
app.listen(3000, () => console.log('Server Started...'));
