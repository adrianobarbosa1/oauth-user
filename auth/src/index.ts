import mongoose from "mongoose";
import { app } from "./app";
import { config } from "./config/config";

const start = async () => {
  console.log("add console");
  if (!config.JWT_KEY) {
    throw new Error("JWT_KEY deve ser definido!");
  }

  if (!config.MONGODB_URL) {
    throw new Error("MONGO_URI deve ser definido!");
  }

  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("[INFO] Connected to MongoDB");

    app.listen(config.PORT, () => {
      console.log(`[INFO] Listening on port ${config.PORT}!`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
