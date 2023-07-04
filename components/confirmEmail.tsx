"use client";

import { Box, Container, Typography } from "@mui/material";

import { MailOutline } from "@mui/icons-material";

const ConfirmEmailPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" className="auth-container-main2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "25px",
            alignItems: "center",
          }}
        >
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
            <MailOutline sx={{ fontSize: 64, mb: 4, color: "#817245" }} />
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
              Confirm Your Email
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
              We have sent you an email with a confirmation link. Please click
              the link to confirm your email address.
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              Didn't receive an email? Check your spam folder or{" "}
              <a href="/resend">resend confirmation email</a>.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ConfirmEmailPage;
