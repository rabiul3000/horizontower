import { Button, IconButton, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { errorAlert, successAlert } from "../../utils/alerts";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase.init";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      const loginUser = await loginWithEmailAndPassword(formDataObj);
      setUser(loginUser.user);
      successAlert("Login successful!");
      navigate("/");
    } catch (error) {
      errorAlert("wrong email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      setUser(user);
      successAlert("Login successful!");
      navigate("/");
    } catch (error) {
      errorAlert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        className="flex lg:w-3/12 w-11/12 flex-col gap-4 border border-gray-300 rounded-lg shadow-lg p-6"
        onSubmit={handleLoginSubmit}
      >
        <div className="flex items-center justify-center lg:pb-8">
          <IconButton>
            <FaLock className="text-4xl text-error" />
          </IconButton>
        </div>
        <div>
          <TextField
            id="email"
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <TextField
            id="password"
            fullWidth
            label="password"
            variant="outlined"
            name="password"
            type="password"
            required
          />
        </div>
        <div>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ background: "teal" }}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className="text-center">OR</div>
        <div>
          <Button
            fullWidth
            variant="contained"
            type="button"
            onClick={handleGoogleLogin}
          >
            Login With Google
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>Not a User yet?</p>Register
          <Link className="link link-primary" to={"/register"}>
            here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
