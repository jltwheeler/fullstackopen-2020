interface CalculateBMIValues {
  height: number;
  weight: number;
}

const parseBMIArgs = (args: Array<string>): CalculateBMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBMI = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi <= 15) {
    return `Very severely underweight`;
  } else if (bmi > 15 && bmi <= 16) {
    return `Severely Underweight`;
  } else if (bmi > 16 && bmi <= 18.5) {
    return `Underweight`;
  } else if (bmi > 18.5 && bmi <= 25) {
    return `Normal (healthy weight)`;
  } else if (bmi > 25 && bmi <= 30) {
    return `Overweight`;
  } else if (bmi > 30 && bmi <= 35) {
    return `Obese Class I (Moderately obese)`;
  } else if (bmi > 35 && bmi <= 40) {
    return `Obese Class II (Severely obese)`;
  } else if (bmi > 40) {
    return `Obese Class III (Very severely obese)`;
  } else {
    return "Sorry, something went wrong.";
  }
};

export default calculateBMI;

try {
  const { height, weight } = parseBMIArgs(process.argv);
  console.log(calculateBMI(height, weight));
} catch (e) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
