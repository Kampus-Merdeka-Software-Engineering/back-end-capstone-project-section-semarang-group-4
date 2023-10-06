const { error } = require("console");
const { Sequelize } = require("sequelize");

const db = new Sequelize("railway", "root", "rNRY3hv1211M32lvOHe0", {
  host: "containers-us-west-184.railway.app",
  dialect: "mysql",
  port: 7098,
});

db.authenticate()
  .then(() => "Dabase connected")
  .catch((error) => console.log(error));

module.exports = db;

(async () => {
  await db.sync();
})();
