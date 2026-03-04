//#PackageDescription=MySQL provider templates for custom database tools.

//#Variables=MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER
//#Secrets=MYSQL_PASSWORD

//#Example=Run SELECT id, email FROM users ORDER BY id DESC LIMIT 5.
//#Summary=Query MySQL
//#Description=Template scaffold for querying MySQL using variables and secrets.
//#ReturnsType=object
//#ReturnsValue={"host":"localhost:3306","database":"app","sql":"SELECT id ...","rowCount":2,"rows":[{"id":42}]}
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

  return { sql: pageOrInput };
}

async function queryMySql(pageOrInput, inputMaybe) {
  const {
    sql,
    host,
    port,
    database,
    user,
    password
  } = normalizeArgs(pageOrInput, inputMaybe, ["sql", "host", "port", "database", "user", "password"]);

  const resolvedSql = sql || "SELECT id, email FROM users ORDER BY id DESC LIMIT 5";
  const resolvedHost = host || process.env.MYSQL_HOST || "localhost";
  const resolvedPort = Number(port || process.env.MYSQL_PORT || "3306");
  const resolvedDatabase = database || process.env.MYSQL_DATABASE || "app";
  const resolvedUser = user || process.env.MYSQL_USER || "root";
  const resolvedPassword = password || process.env.MYSQL_PASSWORD;

  if (!resolvedPassword || !String(resolvedPassword).trim()) {
    throw new Error("Missing secret MYSQL_PASSWORD.");
  }

  const rows = [
    { id: 42, email: "demo@example.com" },
    { id: 41, email: "sample@example.com" }
  ];

  return {
    host: `${resolvedHost}:${resolvedPort}`,
    database: resolvedDatabase,
    user: resolvedUser,
    sql: resolvedSql,
    rowCount: rows.length,
    rows
  };
}

module.exports = {
  queryMySql
};
