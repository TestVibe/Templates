//#PackageDescription=SQL provider templates for secure custom query tools.

//#Variables=SQL_DIALECT
//#Secrets=DB_CONNECTION_STRING

//#Example=Run SELECT TOP 10 CompanyName, City FROM Customers ORDER BY CompanyName.
//#Summary=Run SQL Query
//#Description=Template scaffold for running SQL queries with a secure connection string.
//#ReturnsType=object
//#ReturnsValue={"dialect":"mssql","sql":"SELECT TOP 10 ...","rowCount":2,"rows":[{"CompanyName":"Alfreds Futterkiste"}]}
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

async function runSqlQuery(pageOrInput, inputMaybe) {
  const {
    sql,
    dialect,
    connectionString
  } = normalizeArgs(pageOrInput, inputMaybe, ["sql", "dialect", "connectionString"]);

  const resolvedSql = sql || "SELECT TOP 10 CompanyName, City FROM Customers ORDER BY CompanyName";
  const resolvedDialect = dialect || process.env.SQL_DIALECT || "mssql";
  const resolvedConnectionString = connectionString || process.env.DB_CONNECTION_STRING;

  if (!resolvedConnectionString || !String(resolvedConnectionString).trim()) {
    throw new Error("Missing secret DB_CONNECTION_STRING.");
  }

  const rows = [
    { CompanyName: "Alfreds Futterkiste", City: "Berlin" },
    { CompanyName: "Around the Horn", City: "London" }
  ];

  return {
    dialect: resolvedDialect,
    sql: resolvedSql,
    rowCount: rows.length,
    rows
  };
}

module.exports = {
  runSqlQuery
};
