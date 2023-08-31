require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");

//ExpressApp
const app = express();

app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes

app.use("/api/workouts", workoutRoutes);

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB Connected | Listening on Port ${PORT} `);
    });
  })
  .catch((err) => console.err(err));

//Listen to PORT

const PORT = process.env.PORT || 8080;
