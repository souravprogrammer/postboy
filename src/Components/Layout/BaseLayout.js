import React, { useEffect } from "react";
import { Box } from "@mui/material";

import SplitPane from "react-split-pane";
import useSaveToLoacalStorage from "../Utils/UseSaveToLoacalStorage";
import SideBar from "../Commom/SideBar";
import SideBarList from "../Commom/SideBarList";

import MainPannel from "../Commom/MainPannel/MainPannel";

function BaseLayout() {
  const [compSize, setCompSize] = useSaveToLoacalStorage("splitPos", 360);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <SplitPane
        split="vertical"
        minSize={360}
        maxSize={500}
        defaultSize={parseInt(compSize)}
        onChange={setCompSize}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
        }}
      >
        <SideBar list={SideBarList()} />

        <Box
          sx={{
            width: `calc(100vw - ${compSize}px)`,
            height: "100vh",
          }}
        >
          <MainPannel />
        </Box>
      </SplitPane>
    </Box>
  );
}

export default React.memo(BaseLayout);
