const express = require("express");
const authcontroller = require("./../controllers/authcontroller");
const usercontroller = require("./../controllers/usercontroller");
const router = express.Router();
router.post("/register", authcontroller.signup);
router.post("/login", authcontroller.login);
// router.post("/protect", authcontroller.protect);
router.get("/logout", authcontroller.logout);
router.post("/logout", authcontroller.logout);



router
  .route("/")
  .get(usercontroller.getAllUsers)
  .post(usercontroller.createUser);

router
  .route("/:id")
  .get(usercontroller.getUser)
  .patch(usercontroller.updateUser)
  .delete(usercontroller.deleteUser);

module.exports = router;
