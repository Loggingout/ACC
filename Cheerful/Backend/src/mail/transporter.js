// Sends email through the Unosend HTTP API using Node's built-in fetch.
const env = require('../config/env');

async function sendEmail({ to, subject, html, text }) {
	const { apiKey, apiUrl, senderEmail, senderName } = env.mail;
	const missing = [
		['UNOSEND_API_KEY', apiKey],
		['UNOSEND_SENDER_EMAIL', senderEmail],
	]
		.filter(([, value]) => !value)
		.map(([name]) => name);

	if (missing.length) {
		throw new Error(`Missing email configuration: ${missing.join(', ')}`);
	}

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: `${senderName} <${senderEmail}>`,
			to,
			subject,
			html,
			text,
		}),
		signal: AbortSignal.timeout(10000),
	});

	const responseBody = await response.text();
	if (!response.ok) {
		throw new Error(`Unosend request failed (${response.status}): ${responseBody}`);
	}

	try {
		return responseBody ? JSON.parse(responseBody) : {};
	} catch {
		return { message: responseBody };
	}
}

module.exports = { sendEmail };
