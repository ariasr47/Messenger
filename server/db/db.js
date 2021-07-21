const Sequelize = require("sequelize");

const user = "postgres";

const pass = "pagedown4";

const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://${user}:${pass}@localhost:5432/messenger`,
  {
    logging: false,
  }
);

module.exports = db;
