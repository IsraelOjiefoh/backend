const express = require("express");
const routes = express.Router();
const blog = require("../models/blogModels");
const userControllers = require("../controllers/userController");

routes.get("/", async (req, res) => {
  userControllers.getAllBlogs(req, res);
});

routes.get("/:id", (req, res) => {
  userControllers.getBlogById(req, res);
});
module.exports = routes;
