"use strict";

module.exports = (sequelize, Sequelize) => {
  const pm2_5 = sequelize.define("pm2_5", 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      long: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 7)
      },
      lat: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 7)
      },
      pm2_5: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 1)
      },
    },
    {
      paranoid: true,
      tableName: "pm2_5s",
      underscored: true
    }
  );

  return pm2_5;
};