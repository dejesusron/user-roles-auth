import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc: display all of the users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

// @desc: add new user
// @route: POST /api/users
// @access: Public
const postUser = asyncHandler(async (req, res) => {
	const { role, name, email, password } = req.body;

	// fill all the fields
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// check if the the user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		role: role || 'user',
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
			role: user.role,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc: authenticate user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for user email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
			role: user.role,
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc: get a user
// @route: GET /api/users/:id
// @access: Public
const getUser = asyncHandler(async (req, res) => {
	const text = await User.findById(req.params.id);

	if (!text) {
		res.status(400);
		throw new Error('Text not found');
	}

	res.status(200).json(text);
});

// @desc: update a user
// @route: GET /api/users/:id
// @access: Public
const updateUser = asyncHandler(async (req, res) => {
	const text = await User.findById(req.params.id);

	if (!text) {
		res.status(400);
		throw new Error('Text not found');
	}

	const updatedText = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedText);
});

// @desc: delete a user
// @route: DELETE /api/users/:id
// @access: Public
const deleteUser = asyncHandler(async (req, res) => {
	const text = await User.findById(req.params.id);

	if (!text) {
		res.status(400);
		throw new Error('Text not found');
	}

	await text.deleteOne();

	res.status(200).json(text._id);
});

// generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export { getUsers, postUser, getUser, updateUser, deleteUser, loginUser };
