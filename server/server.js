const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const studyRoutes = require("./routes/studyRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/study", studyRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
