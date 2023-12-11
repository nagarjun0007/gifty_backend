const express = require("express");

const { check } = require("express-validator");

const { authenticateJWT } = require("../middlewares/jwtAuth");
const userControllers = require("../controllers/userController");
const router = express.Router();

router.get("/all", userControllers.getUser);
router.post(
  "/register",
  [
    check("userName").notEmpty(),
    check("email").notEmpty(),
    check("isArtist").notEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.createUser
);
router.post("/login", userControllers.loginUser);
router.put("/update/:userId", userControllers.updateUser);

router.get("/testauth", authenticateJWT, userControllers.testAuth);

module.exports = router;
