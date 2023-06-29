"use client";

import {
  Box,
  Divider,
  Fade,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useSession } from "next-auth/react";
import { teal } from "@mui/material/colors";
const Profile = () => {
  const [show, setShow] = useState<boolean>(false);
  const { data: session } = useSession();
  const { email, name, image }: any = session?.user;

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Container
          sx={{
            height: "100px",
            position: "relative",
          }}
        ></Container>
        <Divider />

        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "66px",
            left: { md: "20%" },
            maxWidth: "400px !important",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            src={image}
            alt={name}
            sx={{
              width: "120px",
              height: "120px",
              border: "5px dashed #f2f2f2",
              bgcolor: teal[500],
              fontSize: "25px",
            }}
          />
          <Box
            sx={{
              marginLeft: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Barlow",
                  color: "#817245",
                  fontSize: "23px",
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Barlow",
                  fontSize: "10px",
                }}
              >
                {email}
              </Typography>
            </Box>
            <VerifiedIcon
              color="primary"
              sx={{
                marginLeft: "10px",
                fontSize: "19px",
              }}
            />
          </Box>
        </Container>

        <Divider />
      </Box>
    </Fade>
  );
};

export default Profile;
