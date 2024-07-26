const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


let transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: '', 
        pass: ' ' 
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', (req, res) => {
    const recipientEmail = req.body.email;

    let mailOptions = {
        from: 'callumoconnor15801@gmail.com', 
        to: recipientEmail,
        subject: 'Welcome to Dev@Deakin',
        text: 'Hello, welcome to Dev@Deakin! We are glad to have you on board.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});