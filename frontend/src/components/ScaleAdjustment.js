import React from 'react';

const ScaleAdjustment = ({ onScaleChange }) => {
  const handleScaleChange = (event) => {
    const scale = event.target.value;
    onScaleChange(scale);
  };

  return (
    <div>
      <label htmlFor="scaleInput">Scale:</label>
      <input type="range" id="scaleInput" min="1" max="10" defaultValue="1" onChange={handleScaleChange} />
    </div>
  );
};

export default ScaleAdjustment;
