import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDb().then(() => {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
