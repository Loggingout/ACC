const { sendEmail } = require('./transporter');
const { formatUSD } = require('../utils/currency');
const env = require('../config/env');
const { taxInclusiveUnitPriceCents } = require('../constants/orderPricing');

function escapeHtml(value = '') {
	return String(value).replace(/[&<>"']/g, (character) => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
	})[character]);
}

function formatOrderItems(order) {
	return order.items
		.map((item) => {
			const options = [item.size, item.milk, item.sugar, item.flavor, item.temperature]
				.filter(Boolean)
				.map(escapeHtml)
				.join(', ');
			const description = `${escapeHtml(item.quantity)} × ${escapeHtml(item.name)}`;
			const details = options ? ` <span>(${options})</span>` : '';
			const lineTotal = (taxInclusiveUnitPriceCents(item.unitPrice) * item.quantity) / 100;
			return `<li>${description}${details} - ${formatUSD(lineTotal)}</li>`;
		})
		.join('');
}

function buildOrderEmail(order) {
	const items = formatOrderItems(order);
	const itemSubtotal = formatUSD(order.itemSubtotal ?? order.total);
	const onlineOrderFee = formatUSD(order.onlineOrderFee ?? 0);
	const salesTax = formatUSD(order.salesTax ?? 0);
	const total = formatUSD(order.total);
	const payment = order.paymentMethod === 'square_link'
		? 'Square payment link'
		: 'pay in store';
	const orderNumber = escapeHtml(order.id || order._id);
	const name = escapeHtml(order.customerName);
	const itemsText = order.items
		.map((item) => {
			const options = [item.size, item.milk, item.sugar, item.flavor, item.temperature]
				.filter(Boolean)
				.join(', ');
			const lineTotal = (taxInclusiveUnitPriceCents(item.unitPrice) * item.quantity) / 100;
			return `- ${item.quantity} x ${item.name}${options ? ` (${options})` : ''}: ${formatUSD(lineTotal)}`;
		})
		.join('\n');

	return {
		items,
		itemSubtotal,
		onlineOrderFee,
		salesTax,
		total,
		payment,
		orderNumber,
		name,
		itemsText,
	};
}

async function sendOrderNotifications(order) {
	const details = buildOrderEmail(order);
	const jobs = [];

	if (order.customerEmail) {
		jobs.push({
			label: 'customer confirmation',
			to: order.customerEmail,
			subject: 'We received your A Cheerful Cup order',
			html: `<h1>Thanks, ${details.name}!</h1><p>We received order <strong>${details.orderNumber}</strong> and our team will review it and prepare it for you.</p><h2>Your order</h2><ul>${details.items}</ul><p>Online order charge: ${details.onlineOrderFee}</p><p><strong>Final bill: ${details.total}</strong></p><p><strong>Payment:</strong> ${escapeHtml(details.payment)}. If you selected pay in store, payment is due when you collect your order.</p><p>Questions? Reply to this email.</p><p>Thanks for choosing A Cheerful Cup.</p>`,
			text: `Thanks, ${order.customerName}!\n\nWe received order ${order.id || order._id} and our team will review it and prepare it for you.\n\nYour order:\n${details.itemsText}\n\nOnline order charge: ${details.onlineOrderFee}\nFinal bill: ${details.total}\nPayment: ${details.payment}. If you selected pay in store, payment is due when you collect your order.\n\nQuestions? Reply to this email.\nThanks for choosing A Cheerful Cup.`,
		});
	}

	if (env.mail.adminEmail) {
		jobs.push({
			label: 'admin order alert',
			to: env.mail.adminEmail,
			subject: `New online order ${details.orderNumber}`,
			html: `<h1>New online order</h1><p><strong>Order:</strong> ${details.orderNumber}</p><p><strong>Customer:</strong> ${details.name}</p><p><strong>Email:</strong> ${escapeHtml(order.customerEmail || 'Not provided')}</p><p><strong>Phone:</strong> ${escapeHtml(order.customerPhone)}</p><h2>Items</h2><ul>${details.items}</ul><p>Items subtotal: ${details.itemSubtotal}<br>Online order charge: ${details.onlineOrderFee}<br>Tax (8.5%): ${details.salesTax}</p><p><strong>Total: ${details.total}</strong></p><p><strong>Payment:</strong> ${escapeHtml(details.payment)}</p>`,
			text: `New online order ${order.id || order._id}\nCustomer: ${order.customerName}\nEmail: ${order.customerEmail || 'Not provided'}\nPhone: ${order.customerPhone}\n\nItems:\n${details.itemsText}\n\nItems subtotal: ${details.itemSubtotal}\nOnline order charge: ${details.onlineOrderFee}\nTax (8.5%): ${details.salesTax}\nTotal: ${details.total}\nPayment: ${details.payment}`,
		});
	}

	const results = await Promise.allSettled(jobs.map(({ to, ...email }) => sendEmail({ to, ...email })));
	results.forEach((result, index) => {
		if (result.status === 'rejected') {
			console.error(`Failed to send ${jobs[index].label}:`, result.reason.message);
		}
	});
}

async function sendTestEmail(to) {
	return sendEmail({
		to,
		subject: 'A Cheerful Cup email configuration test',
		text: 'This test confirms that the A Cheerful Cup Unosend email configuration is working.',
		html: '<p>This test confirms that the A Cheerful Cup Unosend email configuration is working.</p>',
	});
}

module.exports = { sendOrderNotifications, sendTestEmail };
