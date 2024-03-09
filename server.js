require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blog = require("./models/blogModels");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const routes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/adminRoutes");

// middle ware to get request method
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// admin routes
app.use("/", adminRoutes);

const uri = process.env.URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(4000, () => {
      console.log("started server at port 4000");
    });
  })
  .catch((err) => {
    console.log(`cannot connect to mongodb: ${err}`);
    process.exit(1);
  });
