const { error } = require("console");
const { Sequelize } = require("sequelize");

const db = new Sequelize("capstone_revou", "root", "rootroot", {
  host: "localhost",
  dialect: "mysql",
});

db.authenticate()
  .then(() => "Dabase connected")
  .catch((error) => console.log(error));

module.exports = db;

(async () => {
  await db.sync();
})();
