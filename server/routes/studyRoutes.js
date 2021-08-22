const express = require("express");
const {
  getStudyById,
  getStudy,
  update,
  remove,
  newStudy,
} = require("../controllers/studyController");
const protect = require("../middleware/authMiddleware");

const studyRouter = express.Router();

studyRouter.route("/").get(protect, getStudy);

studyRouter
  .route("/:id")
  .get(getStudyById)
  .delete(protect, remove)
  .put(protect, update);

studyRouter.route("/create").post(protect, newStudy);

module.exports = studyRouter;
