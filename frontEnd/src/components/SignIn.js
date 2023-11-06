import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

function SignInPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <form>
            <TextField
              label="User name"
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
            <Link to="/home">
              <Button
                className="bg-blue-500 hover:bg-blue-600 mt-2 text-white font-bold py-2 px-4 rounded-blue"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Sign In
              </Button>
            </Link>
          </form>
          <Typography variant="body1" style={{ marginTop: "20px" }}>
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
