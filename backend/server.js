require("dotenv").config();
const express = require("express");
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
/*  app.get("/", (req, res) => {
  res.json({
    message: "Hey",
  });
}); */

app.use("/api/workouts", workoutRoutes);

//Listen to PORT

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT} `);
});
