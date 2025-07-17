import cron from 'node-cron';
import nodemailer from 'nodemailer';

const utilityFunction=()=>{

}

const periodicMail = async (req, res) => {
    

    res.status(200).json({ message: 'Periodic email scheduled successfully.' });
}
export default periodicMail;
