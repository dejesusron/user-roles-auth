import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
	const [formData, setFormData] = useState({
		role: '',
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const [secretKey, setSecretKey] = useState('');

	const { role, name, email, password, password2 } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (role === 'admin' && secretKey != 'ronel') {
			alert('invalid admin');
		} else {
			if (password !== password2) {
				alert('passwords do not match');
			} else {
				const data = {
					role,
					name,
					email,
					password,
				};

				fetchData(data);
			}
		}
	};

	const fetchData = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/users',
				data
			);
			console.log(response.data);
			alert('sign up successful');
			navigate('/signin');
		} catch (error) {
			console.log(error);
			alert(error.response.data.message);
		}
	};

	return (
		<div>
			<h1>Sign up</h1>

			<form onSubmit={onSubmit}>
				<div>
					<input
						type='radio'
						name='role'
						id='user'
						value='user'
						onChange={onChange}
					/>
					<label htmlFor='user'>User</label>
					<br />
					<input
						type='radio'
						name='role'
						id='admin'
						value='admin'
						onChange={onChange}
					/>
					<label htmlFor='admin'>Admin</label>
				</div>
				{role === 'admin' ? (
					<div>
						<input
							type='text'
							placeholder='secret key'
							name='secret-key'
							onChange={(e) => setSecretKey(e.target.value)}
						/>
					</div>
				) : null}
				<div>
					<input
						type='text'
						placeholder='name'
						name='name'
						value={name}
						onChange={onChange}
					/>
				</div>
				<div>
					<input
						type='email'
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
					<input
						type='text'
						placeholder='confirm password'
						name='password2'
						value={password2}
						onChange={onChange}
					/>
				</div>
				<div>
					<button type='submit'>Sign up</button>
				</div>
			</form>

			<Link to='/signin'>Sign in</Link>
		</div>
	);
};

export default Signup;
