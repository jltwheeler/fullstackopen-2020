type rating = 1 | 2 | 3;
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateExercisesValues {
  targetHours: number;
  dailyExerciseHours: Array<number>;
}

const parseExerciseArgs = (args: Array<string>): CalculateExercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const validArray: boolean = args
    .slice(3)
    .reduce((_prev, curr) => !isNaN(Number(curr)), false);

  if (!isNaN(Number(args[2])) && validArray) {
    return {
      targetHours: Number(args[2]),
      dailyExerciseHours: args.slice(3).map((item) => Number(item)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  targetHours: number,
  dailyExerciseHours: Array<number>
): Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours.reduce((prev, curr) => {
    if (curr > 0) {
      return (prev += 1);
    }
    return prev;
  }, 0);
  const average: number =
    dailyExerciseHours.reduce((prev, curr) => prev + curr, 0) / periodLength;

  const success: boolean = average > targetHours ? true : false;

  let rating: rating;
  let ratingDescription: string;
  if (average / targetHours >= 2) {
    rating = 3;
    ratingDescription = "Well done";
  } else if (average / targetHours >= 1 && average / targetHours < 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "poor job";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

try {
  const { targetHours, dailyExerciseHours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(targetHours, dailyExerciseHours));
} catch (e) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}

export default calculateExercises;
