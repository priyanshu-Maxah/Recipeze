const express = require("express");
const connectDB = require("./src/config/database");
const cors = require('cors');

const cookiesParser = require('cookie-parser');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookiesParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const userRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const recipesRouter = require("./src/routes/recipes");

app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', recipesRouter);

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
  });
