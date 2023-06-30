"use client";

import DropZone from "@/components/dropzone";
import { Box, Container } from "@mui/material";

const Upload = () => {
  return (
    <Container>
      <Box>
        <h1 className="title text-5xl font-bold text-[#817245]">Upload Files</h1>
        <DropZone className="p-16 mt-10 border border-neutral-200" />
      </Box>
    </Container>
  );
};

export default Upload;
