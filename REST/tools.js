//#PackageDescription=REST provider templates for HTTP-based custom tools.

//#Variables=REST_BASE_URL
//#Secrets=REST_BEARER_TOKEN

//#Example=Call GET /health.
//#Summary=Call REST Endpoint
//#Description=Calls a REST endpoint and returns status and parsed response payload.
//#ReturnsType=object
//#ReturnsValue={"url":"https://api.example.com/health","method":"GET","status":200,"ok":true,"data":{"status":"ok"}}
function looksLikePage(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.goto === "function" &&
    typeof value.url === "function"
  );
}

function pickArgs(source, keys) {
  const target = {};
  for (const key of keys) {
    target[key] = source ? source[key] : undefined;
  }
  return target;
}

function normalizeArgs(pageOrInput, inputMaybe, keys) {
  if (looksLikePage(pageOrInput)) {
    if (inputMaybe && typeof inputMaybe === "object" && !Array.isArray(inputMaybe)) {
      return inputMaybe;
    }
    return pickArgs(pageOrInput, keys);
  }

  if (pageOrInput && typeof pageOrInput === "object" && !Array.isArray(pageOrInput)) {
    return pageOrInput;
  }

  return { path: pageOrInput };
}

async function callRestEndpoint(pageOrInput, inputMaybe) {
  const {
    path,
    method,
    body,
    baseUrl,
    token
  } = normalizeArgs(pageOrInput, inputMaybe, ["path", "method", "body", "baseUrl", "token"]);

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
