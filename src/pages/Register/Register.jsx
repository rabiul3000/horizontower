import React, { useContext, useState } from "react";
import { TextField, Button, Paper, Typography, Avatar } from "@mui/material";
import InputFileUpload from "../../utils/InputFileUpload";
import PasswordInput from "../../utils/PasswordInput";
import saveImageToDB from "../../services/saveImageToDB";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { errorAlert, successAlert } from "../../utils/alerts";
import { Link, useNavigate } from "react-router";
import auth from "../../firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { axiosPublic } from "../../hooks/useAxios";

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
    const form = e.target;

    // Upload image first
    setLoading(true);
    const uploadedImageURL = await saveImageToDB(imageFile);

    if (!uploadedImageURL) {
      errorAlert("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    const formData = new FormData(form);
    formData.append("password", password);
    formData.append("photoURL", uploadedImageURL);

    const userData = Object.fromEntries(formData.entries());

    emailSignIn(userData)
      .then((userCredential) => {
        updateUser(userData)
          .then(() => {
            console.log(userCredential.user);

            axiosPublic
              .post("/user/create", {
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                role: "user",
              })
              .then(() => {
                setUser(userCredential.user);
                successAlert("Account created successfully!");
                setLoading(false);
                navigate("/");
                form.reset();
              })
              .catch((error) => {
                errorAlert(error.message);
                console.log(error);
                setLoading(false);
              });
          })
          .catch((err) => {
            errorAlert(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        errorAlert(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        successAlert("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        errorAlert(error.message);
      });
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
            disabled={!isPasswordValid || !imageFile || loading}
          >
            {loading ? (
              <span className="loading loading-sm loading-bars"></span>
            ) : (
              "Register"
            )}
          </Button>

          <Button
            type="button"
            startIcon={<FcGoogle />}
            variant="contained"
            fullWidth
            className="!mt-4 !py-3"
            disabled={loading}
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            Register with Google
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
