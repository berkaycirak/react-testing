import { render, screen } from '@testing-library/react';
import App from './App';

test('should render', () => {
	render(<App />);
	const titleEl = screen.getByTestId('title');
	expect(titleEl).toBeInTheDocument();
});
