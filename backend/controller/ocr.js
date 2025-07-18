import path from 'path';
import Tesseract from 'tesseract.js';
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Controller function to handle OCR on uploaded file
// Assumes file is available as req.file (e.g., via multer middleware)
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
// `I am giving the text of some receipt .By analyzing the content give a json reponse like this: {amount,category,type:income/expense,date}. Nothing extra just json response so that i can parse it.Here is the text : ${ocrText}`
const getResponseFromGemini = async (ocrText) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Here I am providing text of a receipt/bill.Your task is to provide only json response,nothing extra so that i can parse it 
      json response should look like this :
      {
      amount:decimal(total aomunt of the bill or receipt),
      category:string(you have to analyze the text and give the category of the bill only from these:[food,travel,tech,education,shopping,rent,other] with exact keywords),
      type:string(either income or expense)
      title:string,
      description:string),
      }
      Here is the example json which you have to follow:{
        "amount": 22.62,
        "category": "food",
        "type": "expense",
        "title": "ICE Cream - Frozen Yogurt Receipt",
        "description": "Purchase of ice cream and frozen custard with various toppings."
    } .
      Here is the text for which you have to give json: ${ocrText}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
}
const ocrScan = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;

        const { data: { text } } = await Tesseract.recognize(
            filePath,
            'eng',
            { logger: m => console.log(m) }
        );

        // Optionally delete the file after processing
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete uploaded file:', err);
        });
        const jsonResponse = await getResponseFromGemini(text); // Call the Gemini API for additional processing
        console.log('OCR Result:', text);
        console.log('Gemini Response:', jsonResponse);
        const cleanedText = jsonResponse.replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim(); // Clean up the text
        console.log('Cleaned Text:', cleanedText);
        const parsedData = JSON.parse(cleanedText);
        res.json({ content: parsedData });
    } catch (error) {
        console.error('OCR processing failed:', error);
        res.status(500).json({ error: 'OCR processing failed', details: error.message });
    }
};

export default ocrScan;