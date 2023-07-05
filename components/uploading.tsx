
"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

const Uploading = (text: string) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "80vh",
      }}
    >
      <CircularProgress
        sx={{
          color: "#817245",
          width: "80px !important",
          height: "80px !important",
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Barlow",
          color: "#817245",
          fontSize: "60px",
        }}
        className="mt-5 text-lg"
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Uploading;
