"use client";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fade } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
import supabase from "@/config/supabse";
import { useAuthContext } from "../Context/store";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useAuthContext();
  useEffect(() => {
    setShow(true);
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setLoading(false);
        setError("Please use a valid email and password");
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        router.push("/dashboard/upload");
      }
    } catch (error) {
      console.log("error occured");
      setLoading(false);
      setError("Please use a valid email and password");
    }
  };

  return (
    <Fade in={show} timeout={2000}>
      <Container maxWidth="lg" className="auth-container">
        {!loading ? (
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
            <FormHelperText
              sx={{
                color: "red",

                alignSelf: "center",
              }}
            >
              {error}
            </FormHelperText>
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
                type="email"
                sx={{
                  width: "90%",
                }}
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
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
                  backgroundColor: "black !important",
                }}
                endIcon={<LoginIcon />}
                onClick={(e: any) => handleSubmit(e)}
              >
                Sign in
              </Button>
            </Box>
            {/* <Box
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
              <Button
                color="primary"
                endIcon={<GoogleIcon />}
                variant="contained"
                sx={{
                  bgcolor: "#0589ff !important",
                }}
              >
                Sign in with{" "}
              </Button>
              <Button
                endIcon={<GitHubIcon />}
                variant="contained"
                sx={{
                  bgcolor: "black !important",
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
              ``{" "}
            </Box> */}
          </Container>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh",
            }}
          >
            <CircularProgress
              sx={{
                color: "#817245",
                width: "80px !important",
                height: "80px !important",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Barlow",
                color: "#817245",
                fontSize: "60px",
              }}
              className="mt-5 text-lg"
            >
              Signing...
            </Typography>
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default Auth;
