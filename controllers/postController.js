const Post = require("../schemas/post");
const { validationResult } = require("express-validator");

const createPost = async (req, res, next) => {
  const newPost = new Post({
    createdArtistId: req.body.artistId,
    title: req.body.title,
    desciption: req.body.desciption,
    price: req.body.price,
    imageURL: req.body.imageURL,
    artistName: req.body.artistName,
    createAt: req.body.createAt,
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const result = await newPost.save();

  res.json(result);
};

const getAllPosts = async (req, res, next) => {
  const posts = await Post.find().exec();
  res.json(posts);
};

const getPostByArtistId = async (req, res, next) => {
  const artistId = req.params.artistId;
  if (!artistId) {
    return res
      .status(422)
      .json({ message: "artistId is missing, please check query params" });
  }

  const posts = await Post.find({ createdArtistId: artistId });

  res.json({ posts });
};

const arrayOfIds = async (req, res, next) => {
  const arrayOfIds = req.body.arrayOfIds;
  if (arrayOfIds.length === 0) {
    return res
      .status(422)
      .json({ message: "artistId is missing, please check query params" });
  }

  const posts = await Post.find({ _id: [...arrayOfIds] });

  res.json({ posts });
};

exports.arrayOfIds = arrayOfIds;
exports.getPostByArtistId = getPostByArtistId;
exports.getAllPosts = getAllPosts;
exports.createPost = createPost;
