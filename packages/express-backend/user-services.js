import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(username, email) {
  let promise;
  if (username === undefined && email === undefined) {
    promise = userModel.find();
  } else if (username && !email) {
    promise = findUserByName(username);
  } else if (email && !username) {
    promise = findUserByEmail(email);
  } else {
    promise = findUserByNameAndEmail(username, email);
  }
    
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}


function addUser(user) {
  console.log(user);
  if(user.email.includes("calpoly.edu")){
     user["student"] = true;
  } else {
     user["student"] = false;
  } 
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;

}

function findUserByName(username) {
  return userModel.find({ username: username });
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

function findUserByNameAndEmail(username, email) {
  return userModel.find({ username: username, email: email });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByEmail,
  deleteUserById
};
