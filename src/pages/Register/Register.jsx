import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import InputFileUpload from "../../utils/InputFileUpload";
import PasswordInput from "../../utils/PasswordInput";
import saveImageToDB from "../../services/saveImageToDB";
import { AuthContext } from "../../context/AuthContext";
import { errorAlert, successAlert } from "../../utils/alerts";
import { axiosPublic } from "../../hooks/useAxios";
import auth from "../../firebase.init";

const Register = () => {
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const { emailSignIn, updateUser, setUser } = useContext(AuthContext);

  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;

      // Upload user image
      const uploadedImageURL = await saveImageToDB(imageFile);
      if (!uploadedImageURL) throw new Error("Image upload failed");

      const formData = new FormData(form);
      formData.append("password", password);
      formData.append("photoURL", uploadedImageURL);

      const userData = Object.fromEntries(formData.entries());

      const userCredential = await emailSignIn(userData);
      await updateUser(userData);

      // Save to DB
      await axiosPublic.post("/user/create", {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: "user",
      });

      setUser(userCredential.user);
      successAlert("Account created successfully!");
      form.reset();
      navigate("/");
    } catch (err) {
      errorAlert(err.message || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user to DB
      await axiosPublic.post("/user/create", {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: "user",
      });

      setUser(user);
      successAlert("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      errorAlert(error.message || "Google sign-in failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:my-20 bg-gray-100">
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
            src={imageFile ? URL.createObjectURL(imageFile) : ""}
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
            fullWidth
            sx={{ backgroundColor: "teal" }}
            className="!mt-4 !py-3"
            disabled={!isPasswordValid || !imageFile || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          <Button
            type="button"
            startIcon={<FcGoogle />}
            variant="contained"
            fullWidth
            className="!mt-4 !py-3"
            disabled={loading}
            onClick={handleGoogleSignIn}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register with Google"}
          </Button>
        </form>

        <Typography variant="body2" className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
