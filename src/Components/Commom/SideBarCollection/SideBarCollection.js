import React from "react";

import { Box, Typography, Button } from "@mui/material";

import { useSelector } from "react-redux";

// import PostBoy from "./assets/postboiir.png";

function SideBarCollection() {
  const collections = useSelector((s) => s?.data?.collections);
  return (
    <Box>
      {collections?.map((c, i) => {
        return <></>;
      })}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={"./assets/logo.webp"}
          sx={{
            width: "150px",
            height: "170px",
          }}
        />

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "grey",
              fontSize: "14px",
              paddingBottom: "8px",
            }}
          >
            You don’t have any collections
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "grey",
            }}
          >
            Collections let you group related requests, making them easier to
            access and run.
          </Typography>
        </Box>
        <Button
          sx={{
            fontSize: "14px",
            textTransform: "none",
          }}
        >
          Create Collection
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(SideBarCollection);
