const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const studyRoutes = require("./routes/studyRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();

app.use("https://studyhabit.herokuapp.com/api/users", userRoutes);
app.use("https://studyhabit.herokuapp.com/api/study", studyRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
