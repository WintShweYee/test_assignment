'use strict';
const db = require("../models");
const PM2_5 = db.pm2_5;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return PM2_5.bulkCreate(
      [
        {
          lat: 40.7128,
          long: -74.0060,
          pm2_5: 12,
        },
        {
          lat: 39.7128,
          long: -78.1111111,
          pm2_5: 35,
        },
        {
          lat: 37.7128912,
          long: -88.9999999,
          pm2_5: 35.6,
        },
        {
          lat: 40.7128,
          long: -85.006 ,
          pm2_5: 13,
        },
        {
          lat: 34.7128 ,
          long: -86.000001,
          pm2_5: 13.2,
        },
        {
          lat: 35.7128912,
          long: -90,
          pm2_5: 13,
        },
        {
          lat: 40.8,
          long: -90,
          pm2_5: 12,
        },
        {
          lat: 42,
          long: -100,
          pm2_5: 11,
        },
        {
          lat: 45,
          long: -95,
          pm2_5: 11,
        },
        {
          lat: 32,
          long: -88,
          pm2_5: 11,
        },
        {
          lat: 32,
          long: -95,
          pm2_5: 11,
        },
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pm2_5s", null, {});
  }
};
