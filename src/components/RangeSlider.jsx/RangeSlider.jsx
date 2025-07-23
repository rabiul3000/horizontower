import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";

const RangeSlider = ({ setFromRange, setToRange, fromRange, toRange }) => {
  const [value, setValue] = useState([fromRange, toRange]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // only update local state
  };

  const handleChangeCommitted = (event, newValue) => {
    setFromRange(newValue[0]);
    setToRange(newValue[1]);
  };

  return (
    <div className="w-full">
      <div className="text-center py-2">$ Rent Range</div>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        min={1000}
        max={5000}
        step={50}
        sx={{
          color: "#14b8a6", // Tailwind teal-500
        }}
      />
    </div>
  );
};

export default RangeSlider;
