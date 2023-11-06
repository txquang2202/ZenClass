import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";

function LandingPage() {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ height: "50vh" }}
      >
        <Grid item>
          <Typography variant="h2" gutterBottom>
            Welcome to Our App
          </Typography>
          <Typography variant="body1" paragraph>
            This is the landing page of our application.
          </Typography>
          {/* <Button
            variant="contained"
            component={Link}
            to="/signup"
            color="primary"
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/signin"
            color="primary"
            className="ml-1"
          >
            Sign In
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;
