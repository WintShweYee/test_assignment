const db = require("../models");
const PM2_5 = db.pm2_5;

exports.getAllPm2_5 = async () => {
    try {
        const pm2_5 = await PM2_5.findAll();
        return {status: 200, data: pm2_5} ;
    } catch (err) {
        return {status: 500, data: {message : "server error"}};
    }
};