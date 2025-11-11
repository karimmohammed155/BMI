import mongoose from "mongoose";

const db_connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("error in DB connection");
  }
};

export default db_connection;
