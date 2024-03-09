const express = require("express");
const adminRoutes = express.Router();
const controllers = require("../controllers/AdminControllers");

// get all blogs
adminRoutes.get("/", (req, res) => {
  controllers.getAllBlogs(req, res);
});

// get blogs by id
adminRoutes.get("/:id", (req, res) => {
  controllers.getBlogById(req, res);
});

//create A new blog
adminRoutes.post("/", (req, res) => {
  controllers.createNewBlog(req, res);
});

//delete a blog
adminRoutes.delete("/:id", (req, res) => {
  controllers.deleteASingleBlog(req, res);
});

adminRoutes.patch("/:id", (req, res) => {
  controllers.updateABlog(req, res);
});

module.exports = adminRoutes;
