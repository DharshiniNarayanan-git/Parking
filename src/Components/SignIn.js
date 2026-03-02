import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false); // Toggle mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = isRegister
        ? "http://localhost:8080/api/auth/register"
        : "http://localhost:8080/api/auth/login";

      const response = await axios.post(url, {
        email,
        password,
      });

      if (isRegister) {
        setSuccess("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ height: 550 }} disableGutters>
      <Grid container height={"100%"} alignItems={"center"}>
        <Grid item lg={6} textAlign={"center"}>
          <img
            src="Access_Earth_Logo.png"
            alt="Logo"
            style={{ width: "100%", maxWidth: "300px", height: "30vh" }}
          />
        </Grid>

        <Grid item lg={6}>
          <Grid display={"flex"} gap={1} mb={2} justifyContent={"center"}>
            <Typography fontSize={25} color={"#7E7E7E"}>
              {isRegister ? "Register with" : "Sign in with"}
            </Typography>
            <Avatar sx={{ bgcolor: "#386BC0" }}>
              <IconButton sx={{ color: "white" }}>
                <MicrosoftIcon />
              </IconButton>
            </Avatar>
            <Avatar sx={{ bgcolor: "#386BC0" }}>
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
            </Avatar>
            <Avatar sx={{ bgcolor: "#386BC0" }}>
              <IconButton sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
            </Avatar>
          </Grid>

          <Divider sx={{ width: 410, mx: "auto", my: 2 }}>Or</Divider>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ width: 450, mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Success */}
          {success && (
            <Alert severity="success" sx={{ width: 450, mb: 2 }}>
              {success}
            </Alert>
          )}

          <Grid container gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              sx={{ width: 450 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{ width: 450 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          {!isRegister && (
            <Grid container justifyContent={"space-between"} sx={{ width: 450, mt: 1 }}>
              <Grid item>
                <Checkbox />
                Remember Me
              </Grid>
              <Grid item>
                <Button sx={{ textTransform: "none", color: "#525252" }}>
                  Forget Password?
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid mt={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ width: 450 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isRegister ? (
                "Register"
              ) : (
                "Login"
              )}
            </Button>
          </Grid>

          <Grid display={"flex"} alignItems={"center"} mt={2}>
            <Typography>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </Typography>
            <Button
              sx={{
                textTransform: "none",
                color: "red",
                fontWeight: "bold",
              }}
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setSuccess("");
              }}
            >
              {isRegister ? "Login" : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;