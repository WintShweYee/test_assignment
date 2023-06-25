'use strict';
const db = require("../models");
const PM2_5 = db.pm2_5;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return PM2_5.bulkCreate(
      [
        {
          lat: -79.9999991,
          long: 40.7128889,
          pm2_5: 12,
        },
        {
          lat: -78.1111111,
          long: 39.7128,
          pm2_5: 35,
        },
        {
          lat: -88.9999999,
          long: 37.7128912,
          pm2_5: 35.6,
        },
        {
          lat: -90,
          long: 35.7128912,
          pm2_5: 35.6,
        },
        {
          lat: -85.006,
          long: 40.7128,
          pm2_5: 13,
        },
        {
          lat: -86.000001,
          long: 34.7128,
          pm2_5: 13.2,
        },
        {
          lat: -90,
          long: 35.7128912,
          pm2_5: 13,
        },
        {
          lat: -90,
          long: 40.8,
          pm2_5: 12,
        },
        {
          lat: -100,
          long: 42,
          pm2_5: 11,
        },
        {
          lat: -95,
          long: 45,
          pm2_5: 11,
        },
        {
          lat: -88,
          long: 32,
          pm2_5: 11,
        },
        {
          lat: -95,
          long: 32,
          pm2_5: 11,
        },
      ],
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pm2_5s", null, {});
  }
};
