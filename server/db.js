import mongoose from "mongoose";
import env from "dotenv";
// const env = require("dotenv")
env.config();
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOPASSWORD);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log("Error connecting to Mongo" + err.message);
  }
};
// module.exports = connectToDB;
