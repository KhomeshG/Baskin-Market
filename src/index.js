const express = require("express");
const route = require("./router/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Express Application is running on Port --> " + (process.env.PORT || 3000)
  );
});
