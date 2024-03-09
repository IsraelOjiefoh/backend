const express = require("express");
const app = express();
const Blog = require("../models/blogModels");
const mongoose = require("mongoose");
//get a all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.json(getAllBlogs);
  } catch (err) {
    res.status(500).json({ err: "internal server error" });
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
