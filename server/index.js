import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, (req, res) => {
	console.log(`Server is running on port ${port}`);
});
