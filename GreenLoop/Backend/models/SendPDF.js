const express = require('express');
const multer = require('multer');
const twilio = require('twilio');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = twilio(accountSid, authToken);

app.post('/send-pdf', upload.single('file'), (req, res) => {
    const { file } = req;
    const toPhoneNumber = 'whatsapp:+919977079639'; // Replace with the recipient's phone number

    client.messages
        .create({
            from: 'whatsapp:+your_twilio_whatsapp_number',
            to: toPhoneNumber,
            mediaUrl: [
                `data:application/pdf;base64,${file.buffer.toString('base64')}`
            ],
            body: 'Here is your cart PDF!'
        })
        .then(message => res.json({ success: true, message }))
        .catch(error => res.status(500).json({ success: false, error }));
});

app.listen(7000, () => {
    console.log('Server running on port 7000');
});
