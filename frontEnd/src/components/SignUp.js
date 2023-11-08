// Trong SignUpPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username) {
      toast.error("Please enter your username");
      return;
    }
    if (!username || username.length < 3) {
      toast.error("Please enter a valid username with at least 3 characters");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !email.match(emailRegex)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      toast.error("Please enter a valid password with at least 6 characters");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    if (password !== repassword) {
      toast.error("Confirm password does not match!!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/signUp", {
        username: username,
        password: password,
        email: email,
      });
      if (response.status === 200) {
        toast.success("Register successful");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else console.error("Error while sending registration failed", error);
    }
  };
  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleSignUp();
    }
  };
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "40px", marginTop: "50px" }}>
          <Typography variant="h4" className="mb-2 text-center" gutterBottom>
            Sign Up
          </Typography>
          <form>
            <TextField
              label="User name"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={repassword}
              onChange={(e) => setrePassword(e.target.value)}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <Button
              onClick={handleSignUp}
              className="bg-blue-500 hover:bg-blue-600 mt-2 text-white font-bold py-2 px-4 rounded-blue"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body1" style={{ marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-400">
              Sign in here.
            </Link>
          </Typography>
        </Paper>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SignUpPage;
