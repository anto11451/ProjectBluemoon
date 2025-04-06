import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // Importing the useNavigate hook

const ProjectBlueMoon = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [calories, setCalories] = useState(null);
  const [advice, setAdvice] = useState("");
  const [calorieAdvice, setCalorieAdvice] = useState("");
  const [calorieAdjustment, setCalorieAdjustment] = useState(null);
  const [targetWeightChange, setTargetWeightChange] = useState(null);

  const calculateBMI = () => {
    const hFeet = parseFloat(heightFeet);
    const hInches = parseFloat(heightInches);
    const w = parseFloat(weight);

    if (isNaN(hFeet) || isNaN(hInches) || isNaN(w)) {
      alert("Please enter valid height and weight values!");
      return;
    }

    const totalInches = hFeet * 12 + hInches;
    const heightMeters = totalInches * 0.0254;
    const result = (w / (heightMeters * heightMeters)).toFixed(1);

    setBmi(result);

    if (result < 18.5) {
      setAdvice("Underweight - Consider a surplus diet.");
    } else if (result >= 18.5 && result < 24.9) {
      setAdvice("Normal - Maintain your current habits.");
    } else {
      setAdvice("Overweight - Consider a deficit diet.");
    }
  };

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const hFeet = parseFloat(heightFeet);
    const hInches = parseFloat(heightInches);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(hFeet) || isNaN(hInches) || isNaN(a) || !gender) {
      alert("Please enter all the required values!");
      return;
    }

    const heightCm = (hFeet * 30.48) + (hInches * 2.54);
    let bmrResult;

    if (gender === "male") {
      bmrResult = 10 * w + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmrResult = 10 * w + 6.25 * heightCm - 5 * a - 161;
    }

    setBmr(bmrResult);
  };

  const calculateCalories = () => {
    if (!bmr || !activityLevel) {
      alert("Please calculate BMR and select an activity level!");
      return;
    }

    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9,
    };

    const adjustedBMR = bmr * activityFactors[activityLevel];
    let suggestedCalories;
    let calorieAdviceText;
    let calorieAdjustmentValue;
    let targetWeightChangeValue;

    const totalInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches);
    const heightMeters = totalInches * 0.0254;
    const healthyWeightMin = 18.5 * heightMeters * heightMeters;
    const healthyWeightMax = 24.9 * heightMeters * heightMeters;

    if (bmi < 18.5) {
      suggestedCalories = adjustedBMR * 1.15; // Increase by 15%
      calorieAdjustmentValue = suggestedCalories - adjustedBMR;
      calorieAdviceText = `You should aim for a calorie surplus to gain weight. Increase your intake by ${calorieAdjustmentValue.toFixed(0)} calories per day.`;
      targetWeightChangeValue = healthyWeightMin - parseFloat(weight); // Aim to gain weight to reach the minimum healthy weight
    } else if (bmi >= 18.5 && bmi < 24.9) {
      suggestedCalories = adjustedBMR; // Maintain
      calorieAdjustmentValue = 0;
      calorieAdviceText = "You should maintain your current calorie intake.";
      targetWeightChangeValue = 0; // No weight change needed
    } else if (bmi >= 25 && bmi < 29.9) {
      suggestedCalories = adjustedBMR * 0.85; // Decrease by 15%
      calorieAdjustmentValue = adjustedBMR - suggestedCalories;
      calorieAdviceText = `You should aim for a calorie deficit to lose weight. Decrease your intake by ${calorieAdjustmentValue.toFixed(0)} calories per day.`;
      targetWeightChangeValue = parseFloat(weight) - healthyWeightMax; // Aim to lose weight to reach the maximum healthy weight
    } else {
      suggestedCalories = adjustedBMR * 0.75; // Decrease by 25%
      calorieAdjustmentValue = adjustedBMR - suggestedCalories;
      calorieAdviceText = `You should aim for a significant calorie deficit to lose weight. Decrease your intake by ${calorieAdjustmentValue.toFixed(0)} calories per day.`;
      targetWeightChangeValue = parseFloat(weight) - healthyWeightMax; // Aim to lose weight to reach the maximum healthy weight
    }

    setCalories(suggestedCalories.toFixed(0));
    setCalorieAdvice(calorieAdviceText);
    setCalorieAdjustment(calorieAdjustmentValue.toFixed(0));
    setTargetWeightChange(targetWeightChangeValue.toFixed(1));
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 text-black">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}  // Navigate to home page
        className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg mb-6"
      >
        Home
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center mb-10"
      >
        🌙 Calculate you BMI
      </motion.h1>

      <div className="space-y-10 max-w-3xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-2/3 space-y-10">
          {/* BMI Section */}
          <div className="p-6 rounded-2xl shadow-lg space-y-4 border bg-white">
            <h2 className="text-2xl font-semibold">1️⃣ Enter your details</h2>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Height (ft)"
                className="border p-2 w-1/2 rounded-lg"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                title="Enter your height in feet."
              />
              <input
                type="number"
                placeholder="Height (in)"
                className="border p-2 w-1/2 rounded-lg"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                title="Enter additional inches."
              />
            </div>
            <input
              type="number"
              placeholder="Weight in kg"
              className="border p-2 w-full rounded-lg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              title="Enter your weight in kilograms."
            />
            <input
              type="number"
              placeholder="Age"
              className="border p-2 w-full rounded-lg"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              title="Enter your age."
            />
            <select
              className="border p-2 w-full rounded-lg"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <button
              onClick={calculateBMI}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition shadow-lg"
            >
              Calculate BMI
            </button>
            {bmi && (
              <div className="text-lg space-y-1">
                <p>Your BMI is: <strong>{bmi}</strong></p>
                <p>{advice}</p>
              </div>
            )}
          </div>

          {/* BMR and Calories Section */}
          <div className="p-6 rounded-2xl shadow-lg space-y-4 border bg-white">
            <h2 className="text-2xl font-semibold">2️⃣ Your routine</h2>
            <button
              onClick={calculateBMR}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400 transition shadow-lg"
            >
              Calculate BMR
            </button>
            {bmr && (
              <div className="text-lg space-y-1">
                <p>Your BMR is: <strong>{bmr.toFixed(0)} kcal/day</strong></p>
              </div>
            )}
            <select
              className="border p-2 w-full rounded-lg"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Little or no exercise</option>
              <option value="lightlyActive">Brisk walking, normal walking, or kitchen activities 1-3 days</option>
              <option value="moderatelyActive">Weightlifting or sports 3-5 days</option>
              <option value="veryActive">Hard exercise/sports 6-7 days a week</option>
              <option value="superActive">Very hard exercise/sports and physical job</option>
            </select>
            <button
              onClick={calculateCalories}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition shadow-lg"
            >
              Get Suggested Calorie Intake
            </button>
            {calories && (
              <div className="text-lg space-y-1">
                <p>Your suggested daily intake: <strong>{calories} kcal</strong></p>
                <p>{calorieAdvice}</p>
                <p>Calorie adjustment: <strong>{calorieAdjustment} kcal/day</strong></p>
                <table className="w-full mt-4 border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Target Weight Change</th>
                      <th className="border px-4 py-2">Advice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{targetWeightChange} kg</td>
                      <td className="border px-4 py-2">
                        {targetWeightChange > 0
                          ? "Aim to gain weight to reach a healthy BMI."
                          : targetWeightChange < 0
                          ? "Aim to lose weight to reach a healthy BMI."
                          : "Maintain your current weight to stay within a healthy BMI range."}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center items-center">
          {/* Other content or images can go here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectBlueMoon;
