const { Pool } = require("pg");

const defaultDatabaseSettings = {
  DB_USER: "postgres",
  DB_HOST: "localhost",
  DB_DATABASE: "gamefinal",
  DB_PASSWORD: "123",
};

const pool = new Pool({
  user: process.env.DB_USER || defaultDatabaseSettings.DB_USER,
  host: process.env.DB_HOST || defaultDatabaseSettings.DB_HOST,
  database: process.env.DB_DATABASE || defaultDatabaseSettings.DB_DATABASE,
  password: process.env.DB_PASSWORD || defaultDatabaseSettings.DB_PASSWORD,
});

pool.connect().catch((e) => {
  console.log(e);
  console.log("");
  console.log("Error in loading the database! (See log above)\n");
  console.log(
    "Please set up the database using these seeds then add settings in .env file (See .envExample file):"
  );
  console.log("   /db/schema/combined.sql");
  console.log("   /db/seeds/combined_seedsFinal.sql");
  console.log("");
  console.log("If psql server is not running, try:");
  console.log("   sudo service postgresql start");
  console.log("");
  console.log(
    "If you are unfamiliar with postgres, please see README.md on how to install & set up postgres"
  );
});

module.exports = pool;
