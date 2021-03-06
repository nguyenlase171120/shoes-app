const routes = require("express").Router();
const userController = require("../controllers/userController");

routes.post("/register", userController.register);
routes.post("/login", userController.login);

module.exports = routes;
