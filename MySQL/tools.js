//#PackageDescription=MySQL cookbook examples for custom tools.
//#PackageVersion=1.0.0
//#Variables=MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER
//#Secrets=MYSQL_PASSWORD
//#Summary=MySQL Query
//#Description=Template scaffold for querying a MySQL database with connection settings from variables and secrets.
//#ReturnsType=object
//#ReturnsValue="{ host: string, database: string, sql: string, rowCount: number, rows: object[] }"
//#Example=Run SELECT id, email FROM users ORDER BY id DESC LIMIT 5.
async function queryMySql(sql = "SELECT id, email FROM users ORDER BY id DESC LIMIT 5") {
	const host = process.env.MYSQL_HOST || "localhost";
	const port = Number(process.env.MYSQL_PORT || "3306");
	const database = process.env.MYSQL_DATABASE || "app";
	const user = process.env.MYSQL_USER || "root";
	const password = process.env.MYSQL_PASSWORD;

	if (!password || !password.trim())
		throw new Error("Missing secret MYSQL_PASSWORD.");

	// Scaffold only: create a mysql connection using host/port/database/user/password.
	const rows = [
		{ id: 42, email: "demo@example.com" },
		{ id: 41, email: "sample@example.com" }
	];

	return {
		host: `${host}:${port}`,
		database,
		sql,
		rowCount: rows.length,
		rows
	};
}

module.exports = {
	queryMySql
};
