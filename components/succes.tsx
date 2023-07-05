// import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

"use client";

import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Typography } from "@mui/material";

const Success = ({ setIsUploaded, isUploaded }: any) => {
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
      <div className="">
        <div className="message-container-child-cirlce">
          <CheckIcon
            sx={{
              color: "white",
              fontSize: "45px",
            }}
          />
        </div>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Barlow",
            color: "#817245",
            fontSize: "60px",
          }}
          className="mt-5 text-lg"
        >
          Succesfully Uploaded
        </Typography>
        <Button
          sx={{
            color: "#817245",
            ":hover": {
              backgroundColor: "white !important",
              scale: "1.05",
            },
            marginTop: "25px",
          }}
          style={{
            backgroundColor: "white",
          }}
          variant="contained"
          onClick={() => setIsUploaded(!isUploaded)}
        >
          Continue Uploading
        </Button>
      </div>
    </Box>
  );
};

export default Success;
