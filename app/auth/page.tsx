"use client";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fade } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <Fade in={show} timeout={2000}>
      <Container maxWidth="lg" className="auth-container">
        <Container maxWidth="lg" className="auth-container-main">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25px",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: " #637381",
              }}
            >
              Login
            </Typography>
            <Button
              sx={{
                color: "#0589ff",
                ":hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
              onClick={() => router.push("/auth/signup")}
            >
              Don't have an account?
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              height: "14vh",
            }}
          >
            <TextField
              label="Email Address"
              sx={{
                width: "90%",
              }}
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              sx={{
                width: "90%",
              }}
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                // width: "80%",
                marginBottom: "25px",
                bgcolor: "black",
                color: "white",
                ":hover": {
                  bgcolor: "rgb(46, 42, 42)",
                },
              }}
              endIcon={<LoginIcon />}
            >
              Sign in
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "12px",
                color: " #637381",
              }}
            >
              or
            </Typography>
            <Button endIcon={<GoogleIcon />} variant="contained">
              Sign in with{" "}
            </Button>
            <Button
              endIcon={<GitHubIcon />}
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                marginTop: "15px",
                marginBottom: "25px",
                ":hover": {
                  bgcolor: "rgb(46, 42, 42)",
                },
              }}
            >
              Sign in with{" "}
            </Button>
          </Box>
        </Container>
      </Container>
    </Fade>
  );
};

export default Auth;
