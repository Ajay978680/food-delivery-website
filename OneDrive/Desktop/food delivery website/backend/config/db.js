import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:4558@cluster0.krnb0.mongodb.net/food-del');
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
