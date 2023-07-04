import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/material";

const YourComponent = () => {
  return (
    <Stack
      spacing={1}
      sx={{
        width: "30% !important",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={210}
        height={118}
        animation="wave"
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton animation="wave" />
        
      </Box>
    </Stack>
  );
};

export default function Variants() {
  const renderComponentMultipleTimes = () => {
    const times = 10;
    const components = [];

    for (let i = 0; i < times; i++) {
      components.push(<YourComponent key={i} />);
    }

    return components;
  };

  return (
    <Container
      sx={{
        maxWidth: "70%",
      }}
      className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-col-5 gap-5"
    >
      {renderComponentMultipleTimes()}
    </Container>
  );
}
