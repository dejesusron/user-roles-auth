import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './pages/root-layout/RootLayout';
import Signin from './pages/sign-in/Signin';
import Signup from './pages/sign-up/Signup';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route element={<RootLayout />}>
						<Route path='/' element={<Home />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/signin' element={<Signin />} />
						<Route path='/dashboard' element={<Dashboard />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
