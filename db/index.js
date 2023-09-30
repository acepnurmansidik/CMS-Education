const { Sequelize } = require("sequelize");
const { databaseName, userName, password, hostName, port, timeZone, maxPool } = require("../resource/utils/config");
const { DateTime } = require("luxon");

const DBConn = new Sequelize(`postgres://${userName}:${password}@${hostName}:${port}/${databaseName}`,
  {
    logging: (msg) => console.log(`\n${msg.replace("(default)", `[${DateTime.now().setZone(timeZone).toFormat("yyyy-MM-dd TT")}]`)}`), // Displays all log function call parameters
    pool: {
      max: Number(maxPool),
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = DBConn;
