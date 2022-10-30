import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';

import { rest } from 'msw';
import App from './App';
import userEvent from '@testing-library/user-event';

// Mock server setup via msw
const server = setupServer(
	rest.get('http://localhost:8080/', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					id: 1,
					name: 'Berkay',
				},
			])
		);
	}),
	rest.post('http://localhost:8080/add', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json('User added.'));
	})
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// "describe" is a test suite including test cases.
describe('Fetching application tests', () => {
	test('correctly renders title', () => {
		render(<App />);
		const titleEl = screen.getByTestId('title');
		expect(titleEl).toBeInTheDocument();
	});

	test('fetch user names', async () => {
		render(<App />);
		const user = await screen.findByText('Berkay');
		expect(user).toBeInTheDocument();
	});

	test('post a name', async () => {
		render(<App />);
		userEvent.type(screen.getByPlaceholderText('Name'), 'Rebecca');
		userEvent.click(screen.getByRole('button'));
		await waitFor(() =>
			expect(screen.getByTestId('msg')).toHaveTextContent(
				'User added.'
			)
		);
	});
});
