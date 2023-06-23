const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
app.use(express.json());
const cors = require('cors')

mongoose.connect("mongodb+srv://user123:Password123Tech@cluster2.mxs36sn.mongodb.net/learning-mongodb-connection")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.use(express.json()); 
app.use(cors()); 

// GET request to retrieve all users
app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST request to create a new user
app.post("/createUsers", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
