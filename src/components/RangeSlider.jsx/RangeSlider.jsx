import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({
  setFromRange,
  setToRange,
  fromRange,
  toRange,
}) {
  const [value, setValue] = React.useState([fromRange, toRange]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFromRange(newValue[0]);
    setToRange(newValue[1]);
  };

  return (
    <Box>
      <Slider
        sx={{ color: "teal" }}
        getAriaLabel={() => "Rent range"}
        value={value}
        onChange={handleChange}
        step={100}
        min={1215}
        max={4900}
        marks
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
