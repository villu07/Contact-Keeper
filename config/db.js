const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectTOdb = async () => {
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectTOdb;
