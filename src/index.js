import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

console.log("1. Environment loaded");

connectDB()
  .then(() => {
    console.log("2. Database connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`3. Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
