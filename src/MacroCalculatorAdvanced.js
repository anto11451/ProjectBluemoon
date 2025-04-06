import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

const MacroCalculator = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sugar, setSugar] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const foodOptions = [
    { name: "Biryani", calories: 500, protein: 20, carbs: 60, fat: 20, unit: "gms" },
    { name: "Butter Chicken", calories: 450, protein: 25, carbs: 30, fat: 25, unit: "gms" },
    { name: "Paneer Tikka", calories: 350, protein: 18, carbs: 20, fat: 22, unit: "gms" },
    { name: "Rogan Josh", calories: 400, protein: 30, carbs: 10, fat: 25, unit: "gms" },
    { name: "Malai Kofta", calories: 350, protein: 15, carbs: 25, fat: 20, unit: "gms" },
    { name: "Samosa", calories: 250, protein: 5, carbs: 35, fat: 12, unit: "pcs" },
    { name: "Aloo Paratha", calories: 300, protein: 7, carbs: 45, fat: 10, unit: "pcs" },
    { name: "Chole Bhature", calories: 500, protein: 15, carbs: 70, fat: 15, unit: "gms" },
    { name: "Puri with Potato Curry", calories: 350, protein: 8, carbs: 50, fat: 12, unit: "pcs" },
    { name: "Shahi Tukda", calories: 350, protein: 10, carbs: 50, fat: 15, unit: "pcs" },
    { name: "Gulab Jamun", calories: 150, protein: 2, carbs: 30, fat: 5, unit: "pcs" },
    { name: "Jalebi", calories: 250, protein: 1, carbs: 55, fat: 8, unit: "pcs" },
    { name: "Dosa", calories: 150, protein: 4, carbs: 30, fat: 3, unit: "pcs" },
    { name: "Idli", calories: 50, protein: 2, carbs: 12, fat: 1, unit: "pcs" },
    { name: "Palak Paneer", calories: 350, protein: 18, carbs: 20, fat: 22, unit: "gms" },
    { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, unit: "pcs" },
    { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.3, unit: "pcs" },
    { name: "Orange", calories: 62, protein: 1.2, carbs: 15.4, fat: 0.2, unit: "pcs" },
    { name: "Mango", calories: 99, protein: 1.4, carbs: 25, fat: 0.6, unit: "pcs" },
    { name: "Grapes", calories: 62, protein: 0.6, carbs: 16, fat: 0.3, unit: "gms" },
    { name: "Black Coffee", calories: 2, protein: 0.3, carbs: 0, fat: 0, unit: "cups" },
    { name: "Milk Coffee", calories: 50, protein: 2, carbs: 10, fat: 1, unit: "cups" },
    { name: "Tea", calories: 2, protein: 0.3, carbs: 0, fat: 0, unit: "cups" },
    { name: "Milk Tea", calories: 50, protein: 2, carbs: 10, fat: 1, unit: "cups" },
    { name: "White Bread (2 slices)", calories: 160, protein: 4, carbs: 30, fat: 2, unit: "slices" },
    { name: "Brown Bread (2 slices)", calories: 140, protein: 6, carbs: 28, fat: 1, unit: "slices" },
    { name: "Rice", calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, unit: "gms" },
    { name: "Brown Rice", calories: 112, protein: 2.6, carbs: 23, fat: 0.9, unit: "gms" },
    { name: "Chapati", calories: 70, protein: 2, carbs: 15, fat: 1, unit: "pcs" },
    { name: "Vada Pav", calories: 300, protein: 4, carbs: 40, fat: 15, unit: "pcs" },
    { name: "Misal Pav", calories: 350, protein: 10, carbs: 50, fat: 15, unit: "pcs" },
    { name: "Pav Bhaji", calories: 400, protein: 8, carbs: 60, fat: 15, unit: "pcs" },
    { name: "Bhel Puri", calories: 200, protein: 5, carbs: 40, fat: 5, unit: "pcs" },
    { name: "Pani Puri", calories: 150, protein: 3, carbs: 30, fat: 5, unit: "pcs" },
  ];
  const handleFoodChange = (e) => {
    const selectedFood = e.target.value;
    if (!selectedFoods.includes(selectedFood)) {
      setSelectedFoods([...selectedFoods, selectedFood]);
      setQuantities({ ...quantities, [selectedFood]: 100 });
    }
  };

  const handleQuantityChange = (food, quantity) => {
    setQuantities({ ...quantities, [food]: quantity });
  };

  const calculateTotalMacros = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    selectedFoods.forEach((food) => {
      const foodItem = foodOptions.find((item) => item.name === food);
      const quantity = quantities[food];
      if (foodItem.unit === "gms") {
        totalCalories += (foodItem.calories / 100) * quantity;
        totalProtein += (foodItem.protein / 100) * quantity;
        totalCarbs += (foodItem.carbs / 100) * quantity;
        totalFat += (foodItem.fat / 100) * quantity;
      } else {
        totalCalories += foodItem.calories * quantity;
        totalProtein += foodItem.protein * quantity;
        totalCarbs += foodItem.carbs * quantity;
        totalFat += foodItem.fat * quantity;
      }
    });

    const sugarCalories = sugar * 16; // 16 calories per tablespoon of sugar
    setTotalCalories(Math.round(totalCalories + sugarCalories));
    setTotalProtein(Math.round(totalProtein));
    setTotalCarbs(Math.round(totalCarbs));
    setTotalFat(Math.round(totalFat));
  };

  const resetCalculator = () => {
    setSelectedFoods([]);
    setQuantities({});
    setSugar(0);
    setTotalCalories(0);
    setTotalProtein(0);
    setTotalCarbs(0);
    setTotalFat(0);
  };

  const removeFood = (food) => {
    const newSelectedFoods = selectedFoods.filter((item) => item !== food);
    const newQuantities = { ...quantities };
    delete newQuantities[food];
    setSelectedFoods(newSelectedFoods);
    setQuantities(newQuantities);
  };

  const goHome = () => {
    navigate("/"); // Navigate to the home page using useNavigate
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg space-y-4 border bg-white">
      <h2 className="text-2xl font-semibold">Macro Calculator</h2>
      <select
        className="border p-2 w-full rounded-lg"
        value=""
        onChange={handleFoodChange}
      >
        <option value="">Select Food</option>
        {foodOptions.map((food, index) => (
          <option key={index} value={food.name}>
            {food.name} - {food.calories} kcal
          </option>
        ))}
      </select>
      {selectedFoods.map((food, index) => (
        <div key={index} className="flex items-center space-x-4">
          <span>{food}</span>
          {foodOptions.find((item) => item.name === food).unit === "gms" ? (
            <div className="flex items-center space-x-2">
              <select
                className="border p-2 w-1/3 rounded-lg"
                value={quantities[food]}
                onChange={(e) => handleQuantityChange(food, e.target.value)}
              >
                <option value="100">100 gms</option>
                <option value="150">150 gms</option>
                <option value="200">200 gms</option>
                <option value="300">300 gms</option>
                <option value="500">500 gms</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={`Quantity`}
                className="border p-2 w-1/3 rounded-lg"
                value={quantities[food]}
                onChange={(e) => handleQuantityChange(food, e.target.value)}
                min="1"
              />
              <span>{foodOptions.find((item) => item.name === food).unit}</span>
            </div>
          )}
          <button
            onClick={() => removeFood(food)}
            className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-400 transition shadow-lg"
          >
            Remove
          </button>
        </div>
      ))}
      {(selectedFoods.includes("Tea") || selectedFoods.includes("Milk Tea") || selectedFoods.includes("Black Coffee") || selectedFoods.includes("Milk Coffee")) && (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Enter number of sugar cubes"
            className="border p-2 w-1/3 rounded-lg"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            min="0"
          />
          <span>cubes</span>
        </div>
      )}
      <button
        onClick={calculateTotalMacros}
        className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-400 transition shadow-lg"
      >
        Calculate Macros
      </button>
      {totalCalories > 0 && (
        <div className="text-lg space-y-1">
          <p>Total Calories: <strong>{totalCalories} kcal</strong></p>
          <p>Total Protein: <strong>{totalProtein} g</strong></p>
          <p>Total Carbohydrates: <strong>{totalCarbs} g</strong></p>
          <p>Total Fat: <strong>{totalFat} g</strong></p>
        </div>
      )}
      <button
        onClick={resetCalculator}
        className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-400 transition shadow-lg"
      >
        Reset
      </button>
      <button
        onClick={goHome}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition shadow-lg"
      >
        Home
      </button>
    </div>
  );
};

export default MacroCalculator;

