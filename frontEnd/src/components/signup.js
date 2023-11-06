import { Paper, Grid, Avatar, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Signup = () => {
  const paperStyle = {
    height: "70vh",
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
  };
  const headersStyle = {
    margin: 0,
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };
  const btnstyle = {
    color: "#fff",
    backgroundColor: "#1bbd7e",
    margin: "14px 0",
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>

          <h2 style={headersStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label="Name" placeholder="Enter your name" />
          <TextField fullWidth label="Email" />
          <TextField fullWidth label="Phone Number" />
          <TextField fullWidth label="Password" />
          <TextField fullWidth label="Confirm Password" />
          <Button
            type="submit"
            variant="variant"
            color="primary"
            style={btnstyle}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
