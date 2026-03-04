import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Alert,
  Checkbox,
  CircularProgress,
  Paper,
  Box
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
        // ? "http://localhost:8080/api/auth/register"
        // : "http://localhost:8080/api/auth/login";
        ? "https://parkingserver-6onn.onrender.com/api/auth/register"
        : "https://parkingserver-6onn.onrender.com/api/auth/login";

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
  <Container
    maxWidth={false}
    disableGutters
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f4f7fb, #e8efff)",
      px: 2,
    }}
  >
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 1000,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Grid container>

        {/* LEFT SIDE - LOGO */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Box textAlign="center">
            <Box
              component="img"
              src="spaces.png"
              alt="Logo"
              sx={{
                width: "100%",
                maxWidth: 200,
                mb: 2,
              }}
            />
            <Typography variant="h5" fontWeight="bold">
              Parking Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find. Park. Move On.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE - FORM */}
        <Grid item xs={12} md={6} sx={{ p: 4 }}>
          <Box maxWidth={400} mx="auto">

            {/* Social Login */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mb={2}
            >
              <Typography color="#7E7E7E">
                {isRegister ? "Register with" : "Sign in with"}
              </Typography>

              {[MicrosoftIcon, FacebookIcon, TwitterIcon].map(
                (Icon, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      bgcolor: "#386BC0",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { bgcolor: "#2f5aa3" },
                    }}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                )
              )}
            </Box>

            <Divider sx={{ my: 2 }}>Or</Divider>

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {/* Form Fields */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isRegister && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox size="small" />
                  <Typography variant="body2">Remember Me</Typography>
                </Box>

                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Forgot Password?
                </Button>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #2b7cff, #0052cc)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1e5fd8, #003d99)",
                },
              }}
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

            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>

              <Button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                  setSuccess("");
                }}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {isRegister ? "Login" : "Register"}
              </Button>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}

export default SignIn;