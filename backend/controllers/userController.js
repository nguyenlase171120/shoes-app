const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { userName, userEmail, password } = req.body;

      const resultUser = await userModel.findOne({ userEmail });

      if (resultUser) {
        res.status(404).json({
          status: false,
          message: "This user is ExecOptionsWithStringEncoding",
        });
      } else {
        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new userModel({
          userName,
          userEmail,
          password: passwordHash,
        });

        const jwt_token = jwt.sign({ userEmail }, process.env.JWT_TOKEN, {
          expiresIn: "30d",
        });

        newUser.save();

        res.status(200).json({
          status: true,
          message: "Add new user success",
          data: newUser,
          jwt_token,
        });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { userEmail, password } = req.body;
      console.log(userEmail, password);

      const resultLogin = await userModel.findOne({ userEmail });

      if (resultLogin) {
        const jwt_token = await jwt.sign({ userEmail }, process.env.JWT_TOKEN, {
          expiresIn: "30d",
        });

        res.status(200).json({
          status: true,
          message: "Login successfully",
          data: resultLogin,
          jwt_token,
        });
      } else {
        res.status(400).json({ status: false, message: "Can't found user" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = userController;
