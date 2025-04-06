import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Code Viewer</h1>
      <ul>
        <li><Link to="/working-code-alpha">How Healthy are you?</Link></li>
        <li><Link to="/activity-vs-calories">Activity vs Calories</Link></li>
        <li><Link to="/macro-calculator-advanced">Macro Calculator Advanced</Link></li>
      </ul>
    </div>
  );
};

export default Home;
