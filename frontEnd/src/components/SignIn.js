import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) {
      toast.error("Please enter your username or phone number");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        toast.success("Login successful");
        let data = response.data;
        sessionStorage.setItem("account", JSON.stringify(data));

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("pass");
        toast.error("Username or password incorrect");
        return;
      } else console.error("Error sending login request", error);
    }
  };
  const handlePressEnter = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleLogin();
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
              onKeyPress={(e) => handlePressEnter(e)}
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

export default SignInPage;
