"use client";

import { Fade } from "@mui/material";
import { useEffect, useState } from "react";

const Profile = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <h1>Profile Page</h1>
    </Fade>
  );
};

export default Profile;
