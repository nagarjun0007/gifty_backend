const express = require("express");

const { check } = require("express-validator");

const { authenticateJWT } = require("../middlewares/jwtAuth");

const postControllers = require("../controllers/postController");
const router = express.Router();

router.get("/all", postControllers.getAllPosts);
router.get("/:artistId", postControllers.getPostByArtistId);
router.post("/arrayOfIds", postControllers.arrayOfIds);
router.post(
  "/create",
  authenticateJWT,
  [
    check("artistId").notEmpty(),
    check("title").notEmpty(),
    check("desciption").notEmpty(),
    check("price").notEmpty(),
    check("imageURL").notEmpty(),
    check("artistName").notEmpty(),
    check("createAt").notEmpty(),
  ],

  postControllers.createPost
);

module.exports = router;
