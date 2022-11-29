import React, { useEffect } from "react";
import { Box } from "@mui/material";

import SplitPane from "react-split-pane";
import useSaveToLoacalStorage from "../Utils/UseSaveToLoacalStorage";
import SideBar from "../Commom/SideBar";
import SideBarList from "../Commom/SideBarList";

import MainPannel from "../Commom/MainPannel/MainPannel";

function BaseLayout() {
  const [compSize, setCompSize] = useSaveToLoacalStorage("splitPos", 300);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <SplitPane
        split="vertical"
        minSize={300}
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

        <MainPannel />
      </SplitPane>
    </Box>
  );
}

export default React.memo(BaseLayout);
