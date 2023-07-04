"use client";

import DropZone from "@/components/dropzone";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Fade } from "@mui/material";

const Upload = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fade in={show} timeout={2000}>
      <Container>
        <Box>
          <h1 className="title  text-[16px] mt-8 font-bold text-[#817245]">
            Upload Files
          </h1>
          <DropZone className="p-16 mt-10 border border-neutral-200" />
        </Box>
      </Container>
    </Fade>
  );
};

export default Upload;
