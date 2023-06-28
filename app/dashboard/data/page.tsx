
"use client"

import { Fade } from "@mui/material";
import { useEffect, useState } from "react";

const Data = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <h1>Data Page</h1>
    </Fade>
  );
};

export default Data;
