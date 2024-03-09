const express = require("express");
const Blog = require("../models/blogModels");
const mongoose = require("mongoose");
const app = express();

//get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const getAllBlogs = await Blog.find().sort({ createdAt: -1 });
    res.json(getAllBlogs);
    if (!getAllBlogs) {
      res.status(404).json({ error: "No blogs found" });
    }
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

//get a single blog id
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json("Blog does not exist");
  }
  res.status(200).json(blog);
};

// create  a new blog
exports.createNewBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteASingleBlog = async (req, res) => {
  const { id } = req.params;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return res.status(404).json("Blog does not exist");
  }
  res.status(200).json("blog deleted successfully");
};

//Update a blog
exports.updateABlog = async (req, res) => {
  const { id } = req.params;

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such blog" });
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
