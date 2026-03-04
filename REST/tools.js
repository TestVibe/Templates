//#PackageDescription=REST API cookbook examples for custom tools.
//#PackageVersion=1.0.0
//#Variables=REST_BASE_URL
//#Secrets=REST_BEARER_TOKEN
//#Summary=Call REST Endpoint
//#Description=Calls a REST endpoint and returns status, headers, and parsed response when available.
//#ReturnsType=object
//#ReturnsValue="{ url: string, method: string, status: number, ok: boolean, data: any }"
//#Example=Call GET /health.
async function callRestEndpoint(path = "/health", method = "GET", body = null) {
	const baseUrl = (process.env.REST_BASE_URL || "").trim();
	if (!baseUrl)
		throw new Error("Missing variable REST_BASE_URL.");

	const token = (process.env.REST_BEARER_TOKEN || "").trim();
	const url = new URL(path, baseUrl).toString();
	const headers = { "Content-Type": "application/json" };
	if (token)
		headers.Authorization = `Bearer ${token}`;

	const response = await fetch(url, {
		method: String(method || "GET").toUpperCase(),
		headers,
		body: body == null ? undefined : JSON.stringify(body)
	});

	const text = await response.text();
	let data = text;
	try { data = text ? JSON.parse(text) : null; } catch { }

	return {
		url,
		method: String(method || "GET").toUpperCase(),
		status: response.status,
		ok: response.ok,
		data
	};
}

module.exports = {
	callRestEndpoint
};
