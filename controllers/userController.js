const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist === null) {
    let hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      isArtist: req.body.isArtist,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Invalid inputs, please check post data" });
    }

    const result = await newUser.save();
    res.json(result);
  } else {
    res.status(409).json({ message: "User already exists!" });
  }
};

const getUser = async (req, res, next) => {
  const user = await User.find().exec();
  res.json(user);
};

const loginUser = async (req, res, next) => {
  const loginDetails = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({ email: loginDetails.email });
  if (user === null) {
    return res.status(401).json({ message: "Invalid Credentials!" });
  }

  let isPasswordCorrect = await bcrypt.compare(
    loginDetails.password,
    user.password
  );

  if (isPasswordCorrect) {
    const { password, ...userDetails } = user._doc;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    return res.send({
      token: token,
      userDetails,
    });
  }

  res.json({ status: isPasswordCorrect });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  try {
    if (!userId) {
      return res
        .status(422)
        .json({ message: "userId is missing, please check query params" });
    }

    console.log(userId, updatedData);
    const result = await User.findOneAndUpdate({ _id: userId }, updatedData, {
      new: true,
    });

    const { password, ...userDetails } = result._doc;

    return res.send({
      userDetails,
    });
  } catch (errr) {
    console.log(errr);
  }
};

const testAuth = async (req, res, next) => {
  res.json("success");
};

exports.updateUser = updateUser;
exports.getUser = getUser;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.testAuth = testAuth;
