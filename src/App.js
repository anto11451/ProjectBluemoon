import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ActivityVsCalories from './ActivityVsCalories';  // Import ActivityVsCalories
import MacroCalculatorAdvanced from './MacroCalculatorAdvanced';  // Assuming this is another component
import WorkingCodeAlpha from './WorkingCodeAlpha';  // Assuming this is another component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity-vs-calories" element={<ActivityVsCalories />} />
        <Route path="/macro-calculator-advanced" element={<MacroCalculatorAdvanced />} />
        <Route path="/working-code-alpha" element={<WorkingCodeAlpha />} />
      </Routes>
    </Router>
  );
}

export default App;
