import { useState } from 'react';

// Since setState is async, you should declare a function explicitly to pass into setState. Otherwise, we can't test it sync since it is async. Also you should export those functions to import into the test file. That is the isolation process for real unit test.
export const doDecrement = (prevState) => {
	return prevState - 1;
};

export const doIncrement = (prevState) => {
	return prevState + 1;
};

function App() {
	const [count, setCount] = useState(0);
	const style = {
		border: '3px solid black',
		margin: '10px',
		width: '30px',
		fontSize: '24px',
		borderRadius: '5px',
		padding: '2px',
	};

	const onDecrement = () => {
		setCount(doDecrement);
	};
	const onIncrement = () => {
		setCount(doIncrement);
	};

	return (
		<div className='App'>
			<div style={style}>{count}</div>
			<div>
				<button onClick={onIncrement}>Increment</button>
				<button onClick={onDecrement}>Decrement</button>
			</div>
		</div>
	);
}

export default App;
