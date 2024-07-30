const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/usersRoutes");

//Connect ENVIRONMENT VARIABLES
dotenv.config();

//Connect Mongo Database
connectDB();

//Apply CORS
app.use(cors());
/**
 * Middleware to parse incoming JSON requests.
 * Adds the parsed data to req.body.
 */
app.use(express.json());

app.use("/api/users", usersRoutes);

//Set up listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
