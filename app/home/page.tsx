"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { BiLogoReact } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { SiMui,SiTypescript } from "react-icons/si";
import {SiNextdotjs} from 'react-icons/si'
const Home = () => {
  return (
    <Container className="container" maxWidth="lg">
      <Container className="container-text-wrapper" maxWidth="md">
        <Typography variant="h2" className="barlow hero-text">
          Upload Your File Today With <span>Solo Upload</span>
        </Typography>
        <p className="barlow">
          Solo Upload is built on top of MUI, a powerful library that provides
          flexible, customizable, and easy-to-use components.
        </p>
        <Button
          sx={{
            bgcolor: "black",
            color: "#fff",
            padding: "10px",
            ":hover": {
              bgcolor: "rgb(46, 42, 42)",
            },
          }}
          endIcon={<CloudUploadIcon />}
          size="small"
          className="button"
        >
          Start uploading
        </Button>
        <Box>
          <p>Made With</p>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              fontSize: "1.5rem",
            }}
          >
            <BiLogoReact />
            <SiMui />
            <FaNode />
            <SiNextdotjs/>
            <SiTypescript/>
          </Stack>
        </Box>
      </Container>
      <div className="container-img-wrapper">
        <img src="/home_hero.png" alt="banner" loading="lazy" />
      </div>
    </Container>
  );
};

export default Home;
