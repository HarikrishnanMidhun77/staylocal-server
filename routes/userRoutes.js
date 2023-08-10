const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//router.post("/sendAdminNotif", mailController.sendAdminNotif);
router.get("/test", (req, res) => res.json({ msg: "users work!" }));
router.post("/getCreaToken", userController.getCreaToken);

module.exports = router;
