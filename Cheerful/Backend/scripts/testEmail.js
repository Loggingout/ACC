require('dotenv').config();

const { sendTestEmail } = require('../src/mail/mail.service');

const recipient = process.argv[2] || process.env.ADMIN_EMAIL;

if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
  console.error('Provide a valid recipient email, or configure ADMIN_EMAIL in .env.');
  process.exit(1);
}

sendTestEmail(recipient)
  .then((result) => {
    console.log(`Test email accepted by Unosend for ${recipient}.`);
    if (result.id) console.log(`Message ID: ${result.id}`);
  })
  .catch((error) => {
    console.error(`Unable to send test email: ${error.message}`);
    process.exitCode = 1;
  });