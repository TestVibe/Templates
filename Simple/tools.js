//#PackageDescription=Simple provider templates for building custom tools.

//#Example=Echo "hello from templates" and include a timestamp in the result.
//#Summary=Echo Input
//#Description=Returns normalized input and a UTC timestamp to validate custom tool wiring.
//#ReturnsType=object
//#ReturnsValue={"input":"hello","normalized":"hello","serverTimeUtc":"2026-03-04T18:00:00.000Z"}
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

  return { input: pageOrInput };
}

async function echoInput(pageOrInput, inputMaybe) {
  const { input } = normalizeArgs(pageOrInput, inputMaybe, ["input"]);
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
