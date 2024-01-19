const express = require("express");
const router = express.Router();

const { getAllRoles } = require("../controllers/rolesController");
const isCreater = require("../middleWare/isCreator");
const authenticateUser = require("../middleWare/authMiddleWare");

router.get("/", authenticateUser, isCreater, getAllRoles);

module.exports = router;
