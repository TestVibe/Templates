//#PackageDescription=Simple starter examples for custom tools.
//#PackageVersion=1.0.0
//#Summary=Echo Input
//#Description=Returns input and server timestamp to demonstrate a minimal custom extension.
//#ReturnsType=object
//#ReturnsValue="{ input: string, normalized: string, serverTimeUtc: string }"
//#Example=Echo "hello from templates".
async function echoInput(input = "hello") {
	const normalized = String(input ?? "").trim();
	return {
		input,
		normalized,
		serverTimeUtc: new Date().toISOString()
	};
}

module.exports = {
	echoInput
};
