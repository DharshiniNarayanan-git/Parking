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
  Box,
  InputAdornment
} from "@mui/material";
import React, { useState } from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Assets/logo.png";

function SignIn() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = isRegister
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
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const socialColors = ["#2F2F2F", "#1877F2", "#1DA1F2"];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: 4,
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.8s ease",
        }}
      >
        <Grid container>

          {/* 🔥 LEFT SIDE (IMPROVED) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: "relative",
              background: "linear-gradient(135deg, #2b7cff, #00c6ff)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 6,
              overflow: "hidden",
            }}
          >
            {/* Decorative Shapes */}
            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                top: -80,
                right: -80,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                bottom: -60,
                left: -60,
              }}
            />

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>

              {/* Logo (fixed position) */}
              <Box
  component="img"
  src={logo}
  alt="AccessPark Logo"
  sx={{
    width: 350,
    mb: 4,
    objectFit: "contain"
  }}
/>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Smart Parking Starts Here 🚗
              </Typography>

              <Typography
                variant="body1"
                sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6 }}
              >
                Find, book, and manage parking spaces effortlessly.
                Save time and park smarter with AccessPark.
              </Typography>

              <Box>
                <Typography sx={{ mb: 1 }}>
                  ✔ Real-time parking availability
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  ✔ Instant booking
                </Typography>
                <Typography>
                  ✔ Secure & reliable system
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            <Box maxWidth={400} mx="auto">

              {/* Heading */}
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {isRegister ? "Create Account" : "Welcome Back"}
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                {isRegister
                  ? "Start your smart parking journey"
                  : "Login to continue"}
              </Typography>

              {/* Social Login */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography color="#7E7E7E">
                  {isRegister ? "Register with" : "Sign in with"}
                </Typography>

                {[MicrosoftIcon, FacebookIcon, TwitterIcon].map(
                  (Icon, index) => (
                    <Avatar
                      key={index}
                      sx={{
                        bgcolor: socialColors[index],
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <Icon fontSize="small" />
                    </Avatar>
                  )
                )}
              </Box>

              <Divider sx={{ my: 2 }}>Or</Divider>

              {/* Alerts */}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁️"}
                    </IconButton>
                  ),
                }}
              />

              {/* Remember + Forgot */}
              {!isRegister && (
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Box display="flex" alignItems="center">
                    <Checkbox size="small" />
                    <Typography variant="body2">Remember Me</Typography>
                  </Box>
                  <Button size="small">Forgot Password?</Button>
                </Box>
              )}

              {/* Button */}
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                  color: "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isRegister ? (
                  "Register"
                ) : (
                  "Login"
                )}
              </Button>

              {/* Toggle */}
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
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  {isRegister ? "Login" : "Register"}
                </Button>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Container>
  );
}

export default SignIn;