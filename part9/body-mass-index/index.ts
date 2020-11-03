import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ err: "Malformatted parameters" });
  }

  const bmi: string = calculateBMI(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(target)) {
    res.json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(target, daily_exercises);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
