const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "production" && !process.env.MONGO_URI?.trim()) {
      throw new Error("MONGO_URI is required in production");
    }

    const mongoUri =
      process.env.MONGO_URI?.trim() || "mongodb://127.0.0.1:27017/pet-nest";

    const conn = await mongoose.connect(mongoUri);

    console.log(
      `MongoDB Connected: ${conn.connection.host} | DB: ${conn.connection.name}`
    );
  } catch (error) {
    console.error(`MongoDB connect error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
