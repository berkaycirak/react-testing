import { render, screen } from '@testing-library/react';
import App from './App';

test('name renders correctly', () => {
	render(<App />);
	const buttonEl = screen.getAllByRole('button');
	expect(buttonEl).toHaveLength(2);
});
