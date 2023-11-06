import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to the Home Page
            </Typography>
            <Typography variant="body1" paragraph>
              This is the home page of our application. Explore the features and
              enjoy your experience.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
