//#PackageDescription=SQL cookbook examples for custom tools.
//#PackageVersion=1.0.0
//#Variables=SQL_DIALECT
//#Secrets=DB_CONNECTION_STRING
//#Summary=Run SQL Query
//#Description=Template scaffold for running SQL queries using a secure connection string.
//#ReturnsType=object
//#ReturnsValue="{ dialect: string, sql: string, rowCount: number, rows: object[] }"
//#Example=Run SELECT TOP 10 CompanyName, City FROM Customers ORDER BY CompanyName.
async function runSqlQuery(sql = "SELECT TOP 10 CompanyName, City FROM Customers ORDER BY CompanyName") {
	const dialect = process.env.SQL_DIALECT || "mssql";
	const connectionString = process.env.DB_CONNECTION_STRING;
	if (!connectionString || !connectionString.trim())
		throw new Error("Missing secret DB_CONNECTION_STRING.");

	// Scaffold only: execute `sql` with your SQL client using `connectionString`.
	const rows = [
		{ CompanyName: "Alfreds Futterkiste", City: "Berlin" },
		{ CompanyName: "Around the Horn", City: "London" }
	];

	return {
		dialect,
		sql,
		rowCount: rows.length,
		rows
	};
}

module.exports = {
	runSqlQuery
};
