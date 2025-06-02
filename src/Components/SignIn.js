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
} from "@mui/material";
import React from "react";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

function SignIn({ redirect }) {

    const navigate = useNavigate();
  
  return (
    <Container
      maxWidth={false}
      sx={{ height: 550 }}
      disableGutters
      className="container"
    >
      <Grid container height={"100%"} alignItems={"center"}>
        <Grid item lg={6} textAlign={"center"}>
          <img
            src="Access_Earth_Logo.png"
            alt="No Image"
            style={{ width: "100%", maxWidth: "300px", height: "30vh" }}
          />
        </Grid>

        <Grid item lg={6}>
          <Grid
            item
            display={"flex"}
            gap={1}
            mb={2}
            alignItems={"center"}
            justifyContent={"center"}
            lg={8.5}
          >
            <Typography fontSize={25} color={"#7E7E7E"}>
              Sign in with
            </Typography>
            <Avatar sx={{ bgcolor: "#386BC0" }}>
              {/* <IconButton sx={{ color: "white" }} onClick={redirect}> */}
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
          <Grid item my={2}>
            <Divider variant="middle" sx={{ width: 410, fontWeight: "bold" }}>
              Or
            </Divider>
          </Grid>

          <Grid item container gap={2}>
            <Grid item lg={12}>
              <TextField label="Email" variant="outlined" sx={{ width: 450 }} />
            </Grid>
            <Grid item lg={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                sx={{ width: 450 }}
              />
            </Grid>
          </Grid>
          <Grid item container lg={8.4} justifyContent={"space-between"}>
            <Grid item>
              <Checkbox />
              Remember Me
            </Grid>
            <Grid item>
              <Button style={{ textTransform: "none", color: "#525252" }}>
                Forget Password?
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={()=>navigate('/home')}>Login</Button>
          </Grid>
          <Grid item display={"flex"} alignItems={"center"}>
            <Typography>Don't have an account?</Typography>
            <Button
              style={{
                textTransform: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;


