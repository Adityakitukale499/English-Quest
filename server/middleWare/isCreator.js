const { ObjectId } = require("bson");
const Role = require("../models/Role");

const isCreater = async (req, res, next) => {
  if (req.user) {
    const role = await Role.findById(req.user.role);
    if (role?.type === "CREATOR") {
      next();
    } else {
      return res.status(401).json({
        message: "invalid user!",
      });
    }
  } else {
    return res.status(401).json({
      message: "invalid user!",
    });
  }
};

module.exports = isCreater;
