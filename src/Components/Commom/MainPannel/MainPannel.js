import React, { useEffect, useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import TabWindow from "../../TabWindow/TabWindow";
import { useSelector } from "react-redux";
import CustomTabs from "./CustomTabs";

export default function MainPannel() {
  // const [OpenTab, setOpenTab] = useState("");
  const [tabOpen, setTabOpen] = useState("");

  useEffect(() => {
    console.log(">>> ", tabOpen);
  }, [tabOpen]);

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "100%",
      }}
    >
      <CustomTabs tabOpen={tabOpen} setTabOpen={setTabOpen} />

      {tabOpen && <TabWindow uuid={tabOpen} />}
    </Box>
  );
}
