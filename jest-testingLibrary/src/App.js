import axios from 'axios';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const socket = io.connect('http://localhost:8080');

function App() {
	const [users, setUsers] = useState([]);
	const [msg, setMsg] = useState();
	const [listenCount, setListenCount] = useState(0);
	const nameRef = useRef();

	useEffect(() => {
		socket.on('receive_data', (data) => {
			setUsers([...users, data]);
		});
	}, [listenCount]);

	console.log(users);
	//Handle Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		socket.emit('submit', { name: nameRef.current?.value });
		// const res = await axios.post('http://localhost:8080/add', {
		// 	id: uuidv4(),
		// 	name: nameRef.current?.value,
		// });
		// const info = await res.data;
		// setMsg(info);

		setListenCount((prev) => prev + 1);
	};

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
				</form>
			</div>

			<div>
				{nameRef.current?.value && <h5 data-testid='msg'>{msg}</h5>}
			</div>
		</div>
	);
}

export default App;
