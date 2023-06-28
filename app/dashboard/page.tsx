"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { Fade } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Fade in={show} timeout={2000}>
      <Container
        maxWidth="xl"
        sx={{
          padding: { xs: "10px", lg: "20px" },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background:
              "linear-gradient(250.38deg,rgb(230, 244, 255) 2.39%,rgb(105, 177, 255) 34.42%,rgb(22, 119, 255) 60.95%,rgb(9, 88, 217) 84.83%,rgb(0, 44, 140) 104.37%);",
            padding: "20px",
            color: "#fff",
          }}
          className="main-banner"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              padding: "27.2px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "18px", lg: "1.5rem" },
              }}
            >
              Welcome to Solo Uploads
            </Typography>
            <Typography
              paragraph
              sx={{
                color: "#f2f2f2",
                margin: "16px 0px 16px",
                fontSize: { xs: "10px", md: "14px" },
              }}
            >
              The purpose of file uploader is to help you keep truck of your
              file
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "white",
                borderColor: "white",
                width: { xs: "80%", lg: "40%" },
                ":hover": {
                  borderColor: "#f2f2f2",
                  scale: 1.2,
                },
                padding: "8px",
              }}
              onClick={() => router.push("/dashboard/upload")}
            >
              Start uploading
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          >
            <img src="/banner.png" alt="banner" loading="lazy" />
          </Box>
        </Container>
      </Container>
    </Fade>
  );
};

export default Dashboard;
