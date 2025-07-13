import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [sixCharacter, setSixCharacter] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSixCharacter(/^.{6,}$/.test(e.target.value));
    setUpperCase(/[A-Z]/.test(e.target.value));
    setLowerCase(/[a-z]/.test(e.target.value));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        required
        type={showPassword ? "text" : "password"}
        defaultValue={password}
        onChange={handlePasswordChange}
        onFocus={() => setFocus(true)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <div className="text-sm h-10">
        <p className={`text-xs py-2 text-gray-700 ${!focus && "hidden"}`}>
          <span className={sixCharacter ? "text-green-600" : "text-red-600"}>
            Password must be at least 6 characters{" "}
          </span>
          <span className={upperCase ? "text-green-600" : "text-red-600"}>
            {" "}
            1 uppercase and{" "}
          </span>
          <span className={lowerCase ? "text-green-600" : "text-red-600"}>
            1 lowercase letters.
          </span>
        </p>
      </div>
    </FormControl>
  );
};

export default PasswordInput;
