import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY deve ser definido!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI deve ser definido!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[INFO] Connected to MongoDB");

    app.listen(3000, () => {
      console.log("[INFO] Listening on port 3000!");
    });
  } catch (err) {
    console.error(err);
  }
};

start();