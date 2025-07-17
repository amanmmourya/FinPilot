import cron from 'node-cron';
import nodemailer from 'nodemailer';
import db from '../db/db.js';
// Configure your transporter
console.log('Setting up email transporter...');
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send emails to all users
async function sendEmailsToAllUsers() {
    console.log('Sending emails to all users...');
    try {
        const allUser=await db.execute('SELECT * FROM users');
        console.log('All Users:', allUser);
        for (const user of allUser[0]) {
        
            const allTransactions=await db.execute('SELECT * FROM transactions WHERE user_email = ?', [user.email]);
            console.log('All Transactions for User:', user.email, allTransactions[0]);
            const incomeInThisMonth= allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'income') {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }, 0);
            const expensesInThisMonth= allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'expense') {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }, 0);
            const balance = incomeInThisMonth - expensesInThisMonth;
            const foodExpenses=allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'expense' && tx.category === 'food') {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }
            , 0);
            const rentExpenses=allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'expense' && tx.category === 'rent') {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }, 0);
            const transportExpenses=allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'expense' && tx.category === 'travel') {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }, 0);
            const otherExpenses=allTransactions[0].reduce((acc, tx) => {
                if (tx.type === 'expense' && !['food', 'rent', 'travel'].includes(tx.category)) {
                    const txDate = new Date(tx.timestamp);
                    const currentDate = new Date();
                    if (txDate.getMonth() === currentDate.getMonth() && txDate.getFullYear() === currentDate.getFullYear()) {
                        return acc + Number(tx.amount);
                    }
                }
                return acc;
            }, 0);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Monthly Financial Summary',
                text: `Hello ${user.name},\n\nHere is your financial summary for this month:\n\n` +
                    `Total Income: $${incomeInThisMonth}\n` +
                    `Total Expenses: $${expensesInThisMonth}\n` +
                    `Balance: $${balance}\n\n` +
                    `Expenses Breakdown:\n` +
                    `- Food: $${foodExpenses}\n` +
                    `- Rent: $${rentExpenses}\n` +
                    `- Transport: $${transportExpenses}\n` +
                    `- Other: $${otherExpenses}\n\n` +
                    `Thank you for using our service!\n`
            };
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}`);
        }
    } catch (err) {
        console.error('Error sending emails:', err);
    }
}
// Schedule the job (e.g., every day at 9 AM)
cron.schedule('59 23 28-31 * *', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const month = tomorrow.getMonth() + 1;
    const year = tomorrow.getFullYear();

    if (tomorrow.getDate() === 1) {
        console.log(`Sending monthly email for ${month}/${year}`);
        sendEmailsToAllUsers();
    }
});