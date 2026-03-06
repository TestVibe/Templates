//#PackageDescription=SQL provider templates for secure custom query tools.
//#PackageVersion=1.0.0
//#Variables=SQL_DIALECT
//#Secrets=DB_CONNECTION_STRING

//#Example=Run SELECT TOP 10 CompanyName, City FROM Customers ORDER BY CompanyName.
//#Summary=Run SQL Query
//#Description=Template scaffold for running SQL queries with a secure connection string.
//#ReturnsType=object
//#ReturnsValue={"dialect":"mssql","sql":"SELECT TOP 10 ...","rowCount":2,"rows":[{"CompanyName":"Alfreds Futterkiste"}]}
async function runSqlQuery({ sql, dialect, connectionString } = {}) {
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
