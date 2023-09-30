const { Sequelize } = require("sequelize");
const ENV = require("../resource/utils/config");
const { DateTime } = require("luxon");

const DBConn = new Sequelize(`postgres://${ENV.userName}:${ENV.password}@${ENV.hostName}:${ENV.dbPort}/${ENV.databaseName}`,
  {
    logging: (msg) => console.log(`\n${msg.replace("(default)", `[${DateTime.now().setZone(ENV.timeZone).toFormat("yyyy-MM-dd TT")}]`)}`), // Displays all log function call parameters
    pool: {
      max: Number(ENV.maxPool),
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = DBConn;
