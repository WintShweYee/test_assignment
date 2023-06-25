const {  getAllPm2_5 } = require("../services/pm2_5");

//get all pm2_5 values
exports.getPm2_5 = async (req, res) => {
    const result = await getAllPm2_5();

    return res.status(result.status).json(result.data);
};
