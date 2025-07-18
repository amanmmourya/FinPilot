import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mailRoutes from './routes/mail.js';
import dotenv from 'dotenv';
dotenv.config();
import './utils/scheduler.js'; // Import the scheduler to ensure it runs
import ocrRoutes from './routes/ocrRoutes.js';
import multer from 'multer';
const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' }); // folder must exist or multer will create it

app.use('/api/mail',mailRoutes);
app.use('/api/ocr',ocrRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});