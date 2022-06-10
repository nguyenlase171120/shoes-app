const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shoesRoutes = require("./routes/shoesRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/v1/shoes", shoesRoutes);
app.use("/v1/user", userRoutes);

mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("Connect to database successfully");

  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running at localhost:${process.env.PORT}`);
  });
});
