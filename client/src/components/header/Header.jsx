import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<h1>Header</h1>
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/signin'>Sign in</NavLink>
				</li>
				<li>
					<NavLink to='/signup'>Sign up</NavLink>
				</li>
				<li>
					<NavLink to='/dashboard'>Dashboard</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Header;
