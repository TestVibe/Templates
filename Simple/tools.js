//#PackageDescription=Simple provider templates for building custom tools.
//#PackageVersion=1.0.0

//#Example=Echo "hello from templates" and include a timestamp in the result.
//#Summary=Echo Input
//#Description=Returns normalized input and a UTC timestamp to validate custom tool wiring.
//#ReturnsType=object
//#ReturnsValue={"input":"hello","normalized":"hello","serverTimeUtc":"2026-03-04T18:00:00.000Z"}
async function echoInput({ input } = {}) {
	const value = input == null ? "hello" : String(input);
	const normalized = value.trim();

	return {
		input: value,
		normalized,
		serverTimeUtc: new Date().toISOString()
	};
}

module.exports = {
	echoInput
};
