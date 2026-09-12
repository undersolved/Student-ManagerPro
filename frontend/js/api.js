const API_BASE_URL = "http://127.0.0.1:8000";

async function apiRequest(endpoint, options = {}) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},

		...options,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));

		throw new Error(error.detail || "Request failed");
	}

	return response.json();
}
