import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        console.log("Login successful");
        setLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Username or password incorrect");
      } else console.error("Error sending login request", error);
    }
  };

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100">
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "40px", marginTop: "50px" }}>
          <Typography variant="h4" className="mb-2 text-center" gutterBottom>
            Sign In
          </Typography>
          <form>
            <TextField
              label="User name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 mt-4 text-white font-bold py-2 px-4 rounded-blue"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign In
            </Button>
          </form>
          <Typography variant="body1" className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400">
              Sign up here.
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default SignInPage;
