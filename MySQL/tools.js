//#PackageDescription=MySQL provider templates for custom database tools.
//#PackageVersion=1.0.0
//#Variables=MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER
//#Secrets=MYSQL_PASSWORD

//#Example=Run SELECT id, email FROM users ORDER BY id DESC LIMIT 5.
//#Summary=Query MySQL
//#Description=Template scaffold for querying MySQL using variables and secrets.
//#ReturnsType=object
//#ReturnsValue={"host":"localhost:3306","database":"app","sql":"SELECT id ...","rowCount":2,"rows":[{"id":42}]}
async function queryMySql({ sql, host, port, database, user, password } = {}) {
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
