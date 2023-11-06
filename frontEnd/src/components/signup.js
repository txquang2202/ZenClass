// Trong SignUpPage.js
import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

function SignUpPage() {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form>
          <TextField
            label="User name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
          />
          <Link to="/signin">
            <Button
              className="bg-blue-500 hover:bg-blue-600 mt-2 text-white font-bold py-2 px-4 rounded-blue"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
          </Link>
        </form>
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400">
            Sign in here.
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignUpPage;
