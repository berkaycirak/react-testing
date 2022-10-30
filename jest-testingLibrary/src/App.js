import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const socket = io.connect('http://localhost:8080');

function App() {
	const [users, setUsers] = useState([]);
	const [listenCount, setListenCount] = useState(0);
	const [message, setMessage] = useState('');
	const nameRef = useRef();

	useEffect(() => {
		socket.on('receive_data', (data) => {
			setUsers(data);
		});
	}, [listenCount, socket]);

	console.log(users);
	//Handle Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		socket.emit('submit', { name: nameRef.current?.value });
		setMessage('User added.');
		nameRef.current.value = '';
		setListenCount((prev) => prev + 1);
	};

	useEffect(() => {
		setTimeout(() => {
			setMessage('');
		}, 2000);
	}, [message]);

	return (
		<div className='App'>
			<h1
				data-testid='title'
				style={{ color: 'red', fontFamily: 'sans-serif' }}>
				FETCH TESTING
			</h1>
			<div>
				{users.length > 0 ? (
					users.map((user) => <h1 key={user.id}>{user.name}</h1>)
				) : (
					<h1>There is no user, please add some users</h1>
				)}
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						data-testid='input'
						type='text'
						placeholder='Name'
						ref={nameRef}
					/>
					<button type='submit'>Add</button>
					<h1 data-testid='msg'>{message}</h1>
				</form>
			</div>
		</div>
	);
}

export default App;
