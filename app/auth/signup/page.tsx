"use client";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
import { Fade } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import supabase from "@/config/supabse";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Cpassword, setCpassword] = useState<string>("");
  const [Mpassword, setMpassword] = useState<string>("");
  const [Lpassword, setLpassword] = useState<string>("");
  const [emailV, setemailV] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const steps = ["Step 1", "Step 2", "Step 3"]; // Add your desired step labels here

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
    } catch (error) {
      console.log("error occured");
      router.push("/");
    }
  };

  const steeper = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 0 && activeStep == 0) {
      if (!regex.test(email)) {
        setemailV("Please use a valid email address");
      } else {
        const a = activeStep + 1;
        setActiveStep(a);
      }
    }

    if (password.length > 0 && Cpassword.length > 0 && activeStep == 1) {
      if (password !== Cpassword) {
        setMpassword("Password didn't match");
      } else if (password.length < 8) {
        setMpassword("");
        setLpassword("Password must be at least 8 characters long");
      } else {
        const a = activeStep + 1;
        setActiveStep(a);
      }
    }
  };

  return (
    <Container maxWidth="lg" className="auth-container">
      <Fade in={show} timeout={2000}>
        {!loading ? (
          <Container maxWidth="lg" className="auth-container-main k">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#637381",
                }}
              >
                Sign up
              </Typography>
              <Button
                sx={{
                  color: "#0589ff",
                  ":hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => router.push("/auth")}
              >
                Already have an account?
              </Button>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                height: "18vh",
              }}
            >
              {activeStep === 0 && (
                <>
                  <TextField
                    label="Email Address"
                    sx={{
                      width: "90%",
                    }}
                    variant="standard"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {emailV}
                  </FormHelperText>
                </>
              )}
              {activeStep === 1 && (
                <>
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
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {Lpassword}
                  </FormHelperText>
                  <TextField
                    label="Confirm password"
                    type="password"
                    sx={{
                      width: "90%",
                    }}
                    variant="standard"
                    value={Cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {Mpassword}
                  </FormHelperText>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <TextField
                    label="Full Name"
                    sx={{
                      width: "90%",
                    }}
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormHelperText
                    sx={{
                      color: "red",
                    }}
                  >
                    {Mpassword}
                  </FormHelperText>
                </>
              )}
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
                  // width: "100%",
                  marginBottom: "45px",
                  marginTop: "25px",
                  bgcolor: "black",
                  color: "white",
                  ":hover": {
                    bgcolor: "rgb(46, 42, 42)",
                  },
                  backgroundColor: "black !important",
                }}
                endIcon={<LoginIcon />}
                onClick={
                  activeStep !== steps.length - 1
                    ? () => steeper()
                    : () => handleSubmit()
                }
              >
                {activeStep === steps.length - 1 ? "Sign up" : "Next"}
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
                color: "#637381",
              }}
            >
              or
            </Typography>
            <Button endIcon={<GoogleIcon />} variant="contained">
              Sign Up with
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
              Sign Up with
            </Button>
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
              Signing Up...
            </Typography>
          </Box>
        )}
      </Fade>
    </Container>
  );
};

export default SignUp;
