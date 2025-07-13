import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import InputFileUpload from "../../utils/InputFileUpload";
import PasswordInput from "../../utils/PasswordInput";
import saveImageToDB from "../../services/saveImageToDB";

const Register = () => {
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("password", password);
    const uploadAndGetImageURL = saveImageToDB(imageFile);
    
    const userData = Object.fromEntries(formData.entries());

    console.log(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper
        elevation={3}
        className="p-8 w-full max-w-md shadow-md rounded-lg bg-white"
      >
        <Typography
          variant="h5"
          className="text-center mb-6 font-bold text-gray-700"
        >
          Create an Account
        </Typography>

        <div className="flex justify-center pt-4">
          <Avatar
            src={(imageFile && URL.createObjectURL(imageFile)) || ""}
            sx={{ width: 56, height: 56 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            required
          />

          <InputFileUpload setImageFile={setImageFile} />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            required
          />
          <PasswordInput setPassword={setPassword} password={password} />

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "teal" }}
            fullWidth
            className="!mt-4 !py-3"
            disabled={!passwordRegex}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
