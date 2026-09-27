import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
