import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'; //you can define a different name for the route
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import updateUsers from './migrations/updateUsers.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
  console.log('Connected to MongoDB');
  updateUsers();
})
  .catch((err) => {
  console.log(err);
});

const app = express();

app.use(express.json()); //allows us to parse JSON in the request body
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
});
});
