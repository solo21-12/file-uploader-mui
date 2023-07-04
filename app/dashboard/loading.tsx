"use client";

import { CircularProgress, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Profile = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <div className="loading-container">
        <CircularProgress
          sx={{
            color: "#817245",
          }}
          size={80}
        />
        <Typography
          variant="h6"
          className="loading-text"
          sx={{
            color: "#817245",
            fontSize: "40px",
            fontFamily: "Caprasimo",
            opacity: "0.7",
          }}
        >
          Solo Upload
        </Typography>
      </div>
    </Fade>
  );
};

export default Profile;
