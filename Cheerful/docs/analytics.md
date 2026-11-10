# Site analytics

The admin analytics page shows the last 30 UTC days. A session is a browser tab's session; a daily visitor is a browser identifier, not a verified person. Visit time counts only while the page is visible and is capped at 30 minutes per page. Records expire after 365 days. The tracker stores random identifiers in browser storage and does not send query strings, names, email addresses, or IP addresses as analytics fields. Browsers with Do Not Track enabled are excluded.

Tracking only runs in production builds on `acheerfulcup.com` and `www.acheerfulcup.com` by default. Local development, GitHub-hosted previews, visits referred from GitHub, and signed-in administrators are excluded. Once a browser is excluded, it remains excluded until its local storage is cleared. Developers visiting the live site can opt out before browsing by opening `https://www.acheerfulcup.com/?analytics=off` in each browser they use. Anonymous visits to the live site that cannot be identified as developer visits cannot be distinguished from customer visits.

To track another production hostname, configure `VITE_ANALYTICS_HOSTS` on the frontend as a comma-separated hostname list and `ANALYTICS_ALLOWED_ORIGINS` on the backend as the corresponding comma-separated HTTPS origins. The frontend setting requires a rebuild; restart the backend after changing its setting. GitHub preview hosts cannot be enabled. Existing visits before deployment are not available.

Review applicable privacy and consent requirements before enabling analytics in production.