import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';  // always provide the .js extension when importing a file that is not a package or a module.
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
// const port = process.env.PORT || 4001;
const port = 3000;
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());// Middleware for parsing application/json content-type in incoming requests
app.use(cookieParser()); // Middleware for parsing cookies in incoming requests 
app.use(cors
    ({
        origin: allowedOrigins,
        credentials: true
    })
); // Middleware for enabling CORS (Cross-Origin Resource Sharing) in incoming requests 

// API Endpoints
app.get('/', (req, res) => {
    res.send("API working");
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
 