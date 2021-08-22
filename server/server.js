const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const studyRoutes = require("./routes/studyRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

dotenv.config();
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/study", studyRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
