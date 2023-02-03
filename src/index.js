const express = require("express");
const route = require("./router/routes");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://sonal-plutonium:5dJokPsnG43EGYHE@cluster0.koc4qx2.mongodb.net/images",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Express Application is running on Port --> " + (process.env.PORT || 3000)
  );
});
