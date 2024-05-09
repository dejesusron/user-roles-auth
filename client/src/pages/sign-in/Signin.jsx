import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const data = { email, password };

		fetchData(data);
	};

	const fetchData = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/users/login',
				data
			);
			console.log(response.data);

			response.data.role !== 'admin' ? navigate('/') : navigate('/dashboard');
		} catch (error) {
			console.log(error);
			alert(error.response.data.message);
		}
	};

	return (
		<div>
			<h1>Sign in</h1>

			<form onSubmit={onSubmit}>
				<div>
					<input
						type='text'
						placeholder='email'
						name='email'
						value={email}
						onChange={onChange}
					/>
				</div>
				<div>
					<input
						type='text'
						placeholder='password'
						name='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<div>
					<button type='submit'>Sign in</button>
				</div>
			</form>

			<Link to='/signup'>Sign up</Link>
		</div>
	);
};

export default Signin;
