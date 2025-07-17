import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mailRoutes from './routes/mail.js';
import dotenv from 'dotenv';
dotenv.config();
import './utils/scheduler.js'; // Import the scheduler to ensure it runs

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/mail',mailRoutes)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});