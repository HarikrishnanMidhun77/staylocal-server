const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//router.post("/sendAdminNotif", mailController.sendAdminNotif);
router.get("/test", (req, res) => res.json({ msg: "users work2!" }));
router.get("/getCreaToken", userController.getCreaToken);
router.post("/getProperties", userController.getProperties);
router.post("/getPropertyByKey", userController.getPropertyByKey);

// router.post("/getProperties", (req, res) => {
//   console.log("first");
// });

module.exports = router;
