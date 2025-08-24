

import mongoose from "mongoose";

// connection
try {
  await mongoose.connect("mongodb://127.0.0.1/mongoose_database");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

// schema
//middleware
// model

