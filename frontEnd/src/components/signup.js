// Trong SignUpPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== repassword) {
      alert("Confirm password does not match!!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/signUp", {
        username: username,
        password: password,
        email: email,
      });
      if (response.status === 200) {
        alert("Registered successfully");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.status === 400)
        alert("Username or email already exists!");
      else console.error("Error while sending registration failed", error);
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
    </div>
  );
}

export default SignUpPage;
