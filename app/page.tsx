"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { BiLogoReact } from "react-icons/bi";
import { FaNode } from "react-icons/fa";
import { SiMui, SiTypescript } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./Context/store";
import { RiSupabaseFill } from "react-icons/ri";
const Home = () => {
  const [show, setShow] = useState<boolean>(false);
  const user = useAuthContext();

  const router = useRouter();
  useEffect(() => {
    setShow(true);
  }, []);


  return (
    <Fade in={show} timeout={2000}>
      <Container className="container" maxWidth="lg">
        <Container className="container-text-wrapper" maxWidth="xl">
          <Typography variant="h2" className="barlow hero-text">
            Upload Your File Today With <span>Solo Upload</span>
          </Typography>
          <p
            className="barlow"
            style={{
              color: "#817245",
              marginBottom:"15px"
            }}
          >
            Welcome to our cutting-edge website built with React at the frontend
            and Node.js at the backend. Our platform empowers you to
            effortlessly upload and manage your images on the cloud using
            Cloudinary. With seamless integration with Supabase as our robust
            database, we offer a powerful solution for storing and retrieving
            your data securely. 
          </p>
          <Button
            sx={{
              bgcolor: "black !important",
              color: "#fff",
              padding: "10px",
              ":hover": {
                bgcolor: "rgb(46, 42, 42)",
              },
            }}
            endIcon={<CloudUploadIcon />}
            size="small"
            className="button"
            onClick={() => router.push("/dashboard/upload")}
          >
            Start uploading
          </Button>
          <Box>
            <p style={{ color: "#817245", marginBottom: "15px" }}>Made With</p>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                fontSize: "1.5rem",
              }}
            >
              <BiLogoReact className=" text-blue-800" />
              <SiMui className=" text-blue-500" />
              <FaNode className=" text-teal-600" />
              <SiNextdotjs />
              <SiTypescript className=" text-blue-500" />
              <RiSupabaseFill className=" text-teal-600" />
            </Stack>
          </Box>
        </Container>
        <div className="container-img-wrapper">
          <img src="/home_hero.png" alt="banner" loading="lazy" />
        </div>
      </Container>
    </Fade>
  );
};

export default Home;
