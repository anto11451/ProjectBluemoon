import React, { useState } from 'react';
import './app.css';  // Import app.css for specific styles

const ActivityVsCalories = () => {
  const fastFoodItems = [
    { name: "Burger 🍔", calories: 300 },
    { name: "Pizza 🍕", calories: 400 },
    { name: "French Fries 🍟", calories: 200 },
    { name: "Burrito 🌯", calories: 350 },
    { name: "Chicken Wings 🍗", calories: 250 },
    { name: "Hot Dog 🌭", calories: 200 },
    { name: "Donut 🍩", calories: 150 },
    { name: "Cookies 🍪", calories: 100 },
    { name: "Noodles 🍜", calories: 250 },
    { name: "Biryani 🍚", calories: 450 },
    { name: "Shawarma 🥙", calories: 400 },
    { name: "Pulao 🍚", calories: 300 },
    { name: "Cupcake 🧁", calories: 200 },
    { name: "Samosa 🥧", calories: 150 },
    { name: "Gulab Jamun 🍮", calories: 180 },
    { name: "Pav Bhaji 🥗", calories: 350 },
    { name: "Momos 🍡", calories: 200 },
    { name: "Ice Cream 🍦", calories: 250 },
    { name: "Chocolate Bar 🍫", calories: 200 },
    { name: "Cheese Slice 🧀", calories: 100 },
    { name: "Bacon 🥓", calories: 300 },
    { name: "Fried Rice 🍚", calories: 400 },
    { name: "Chikki 🌰", calories: 150 },
    { name: "Maggi 🍜", calories: 250 },
    { name: "Prawn Koliwada 🍤", calories: 350 },
    { name: "Chili Paneer 🌶️", calories: 300 },
    { name: "Soup 🍲", calories: 150 },
    { name: "Ladoo 🍡", calories: 120 },
    { name: "Chole Bhature 🍛", calories: 500 },
    { name: "Pretzel 🥨", calories: 180 },
    { name: "Pani Puri 🥣", calories: 180 },      // Added Pani Puri
    { name: "Shev Puri 🍽️", calories: 200 },     // Added Shev Puri
    { name: "Dairy Milk Silk 50g 🍫", calories: 275 },   // 50g Dairy Milk Silk
    { name: "Dairy Milk Silk 100g 🍫", calories: 550 },  // 100g Dairy Milk Silk
    { name: "Dairy Milk Silk 20g 🍫", calories: 110 },   // 20g Dairy Milk Silk
  
  ];

  const workouts = [
    { type: 'Walking', baseDuration: 30 },
    { type: 'Cycling', baseDuration: 30 },
    { type: 'Bodyweight Exercises', baseDuration: 45 },
    { type: 'Jogging', baseDuration: 20 },
    { type: 'Gym (weights)', baseDuration: 60 },
    { type: 'Brisk Walking', baseDuration: 40 },
  ];

  const [selectedFood, setSelectedFood] = useState(null);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
  };

  const getRecommendedWorkouts = (calories) => {
    return workouts.map((workout, index) => {
      const durationMultiplier = calories / 300;  // 300 is the baseline
      const time = Math.round(workout.baseDuration * durationMultiplier);
      return (
        <div key={index} className="workout-option">
          {workout.type} for {time} minutes
        </div>
      );
    });
  };

  return (
    <div className="activity-vs-calories-container">
      <h2 className="activity-vs-calories-header">Activity vs Calories</h2>
      <div className="container">
        <div className="food-list">
          <h3>Select Your Favorite Fast Food:</h3>
          <div className="food-options">
            {fastFoodItems.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleSelectFood(item)} 
                className="food-item">
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="selected-food">
          {selectedFood ? (
            <>
              <h4>You selected: {selectedFood.name}</h4>
              <h4>Calories: {selectedFood.calories}</h4>
              <h4>To balance this, try one of these workouts:</h4>
              <div className="workouts-list">
                {getRecommendedWorkouts(selectedFood.calories)}
              </div>
            </>
          ) : (
            <h4>Please select a food item.</h4>
          )}
        </div>
      </div>
      <button className="activity-vs-calories-button" onClick={() => window.location.href = '/'}>Back to Home</button>
    </div>
  );
};

export default ActivityVsCalories;
