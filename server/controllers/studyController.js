const Study = require("../models/studyModel");
const asyncHandler = require("express-async-handler");

const newStudy = async (req, res) => {
  const { assignment, minutes, subject, notes } = req.body;

  if (!assignment || !minutes || !subject || !notes) {
    res.status(400);
    throw new Error("Please fill in all fields");
  } else {
    const study = new Study({
      user: req.user._id,
      assignment,
      minutes,
      subject,
      notes,
    });

    const createdStudy = await study.save();

    res.status(201).json(createdStudy);
  }
};

const getStudy = asyncHandler(async (req, res) => {
  const study = await Study.find({ user: req.user._id });
  res.json(study);
});

const update = asyncHandler(async (req, res) => {
  const { assignment, minutes, subject, notes } = req.body;

  const study = await Study.findById(req.params.id);

  if (study.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot update study session");
  }

  if (study) {
    study.assignment = assignment;
    study.minutes = minutes;
    study.subject = subject;
    study.notes = notes;

    const update = await study.save();
    res.json(update);
  } else {
    res.status(404);
    throw new Error("Study session not found");
  }
});

const remove = asyncHandler(async (req, res) => {
  const study = await Study.findById(req.params.id);

  if (study.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot delete");
  }

  if (study) {
    await study.remove();
    res.json({ message: "Study removed" });
  } else {
    res.status(404);
    throw new Error("Study not found");
  }
});

const getStudyById = asyncHandler(async (req, res) => {
  const study = await Study.findById(req.params.id);

  if (study) {
    res.json(study);
  } else {
    res.status(404).json({ message: "Study session not found" });
  }
});

module.exports = { newStudy, getStudy, remove, update, getStudyById };
