const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8080;

// Schema
const SchemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
  },
  {
    timestamps: true,
  }
);

//  Model

const userModel = mongoose.model("app-todo", SchemaData);

// Read data from the API
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data });
});

// Create data from the api // save in mongoDB

app.post("/create", async (req, res) => {
  const create = new userModel(req.body);
  await create.save();
  console.log("my first data fetch", req.body);

  res.send({ success: true, message: "Successfully launched", create });
});

// Update data

app.put("/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const update = await userModel.updateOne({ _id: _id }, rest);
  console.log(req.body);
  res.send({ success: true, message: "The update was a success", update });
});

//  Delete Data

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const data = await userModel.deleteOne({ _id: id });
   console.log(data);
  res.send({ success: true, message: "The update successflly deleted", data });
});

//  connect to mongoDB
mongoose
  .connect(process.env.MONGODB, {
    dbName: "AppTodo",
  })
  .then(() => {
    console.log("Our MongoDB is connected");
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err));
