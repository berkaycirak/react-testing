import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function App() {
	const [users, setUsers] = useState([]);
	const [listenCount, setListenCount] = useState(0);
	const nameRef = useRef();

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get('http://localhost:3000/');
			setUsers(data.data);
		};

		fetchData();
	}, [listenCount]);

	//Handle Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:3000/add', {
			id: uuidv4(),
			name: nameRef.current?.value,
		});
		nameRef.current.value = '';
		setListenCount((prev) => prev + 1);
	};

	//

	return (
		<div className='App'>
			<div>
				{users.map((user) => (
					<h1 key={user.id}>{user.name}</h1>
				))}
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Enter a name'
						ref={nameRef}
					/>
					<button type='submit'>Send</button>
				</form>
			</div>
		</div>
	);
}

export default App;
