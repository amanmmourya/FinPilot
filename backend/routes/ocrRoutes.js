import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ocr from '../controller/ocr.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // folder must exist or multer will create it
const router = express.Router();
router.post('/',upload.single('file'),ocr);

export default router;