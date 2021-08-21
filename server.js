const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect to DB
connectDB();

//Init middleware
//It help us to accept body data
app.use(express.json({ extended: false }));

//Define Route
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// app.get("/", (req, res) =>
//   res.json({ msg: "Hello Welcome to the Contact Keeper Application......" })
// );

//server static assets in production

if (process.env.NODE_ENV === "production") {
  //set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__driname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
