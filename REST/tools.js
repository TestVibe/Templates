//#PackageDescription=REST provider templates for HTTP-based custom tools.
//#PackageVersion=1.0.0
//#Variables=REST_BASE_URL
//#Secrets=REST_BEARER_TOKEN

//#Example=Call GET /health.
//#Summary=Call REST Endpoint
//#Description=Calls a REST endpoint and returns status and parsed response payload.
//#ReturnsType=object
//#ReturnsValue={"url":"https://api.example.com/health","method":"GET","status":200,"ok":true,"data":{"status":"ok"}}
async function callRestEndpoint({ path, method, body, baseUrl, token } = {}) {
	const resolvedBaseUrl = String(baseUrl || process.env.REST_BASE_URL || "").trim();
	if (!resolvedBaseUrl) {
		throw new Error("Missing variable REST_BASE_URL.");
	}

	const resolvedPath = path || "/health";
	const resolvedMethod = String(method || "GET").toUpperCase();
	const resolvedToken = String(token || process.env.REST_BEARER_TOKEN || "").trim();
	const url = new URL(resolvedPath, resolvedBaseUrl).toString();

	const headers = { "Content-Type": "application/json" };
	if (resolvedToken) {
		headers.Authorization = `Bearer ${resolvedToken}`;
	}

	const response = await fetch(url, {
		method: resolvedMethod,
		headers,
		body: body == null ? undefined : JSON.stringify(body)
	});

	const text = await response.text();
	let data = text;
	try {
		data = text ? JSON.parse(text) : null;
	} catch {
		// Keep raw text for non-JSON responses.
	}

	return {
		url,
		method: resolvedMethod,
		status: response.status,
		ok: response.ok,
		data
	};
}

module.exports = {
	callRestEndpoint
};
