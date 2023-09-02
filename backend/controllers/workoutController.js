const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//GET single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Not a valid object ID | No such workout",
    });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({
      error: "No such workout",
    });
  }

  res.status(200).json(workout);
};

//CREATE new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("Title");
  }

  if (!load) {
    emptyFields.push("Load");
  }

  if (!reps) {
    emptyFields.push("Reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields!",
      emptyFields,
    });
  }

  // add workout to db
  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//DELETE workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Not a valid object ID | Can not delete workout",
    });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({
      error: "No such workout",
    });
  }

  res.status(200).json(workout);
};

//UPDATE workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Not a valid object ID | Can not delete workout",
    });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({
      error: "No such workout",
    });
  }

  res.status(200).json(workout);
};

//Exports

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
