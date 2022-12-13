import React, { useState } from "react";

import { Box } from "@mui/material";
import TabWindow from "../../TabWindow/TabWindow";
import CustomTabs from "./CustomTabs";
import useSaveToLoacalStorage from "../../Utils/UseSaveToLoacalStorage";
import SplitPane from "react-split-pane";
import ResponseContainer from "../../TabWindow/ResponseContainer";
import useFetch from "../../Functions/ApiHandler";

export default function MainPannel() {
  const [tabOpen, setTabOpen] = useState("");
  const [compSize, setCompSize] = useSaveToLoacalStorage("splitPos2", 439);
  const [response, dispatchRequest] = useFetch([tabOpen]);

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",

          position: "relative",
        }}
      >
        <SplitPane
          split="horizontal"
          minSize={439}
          maxSize={600}
          defaultSize={parseInt(compSize)}
          onChange={setCompSize}
          style={{
            width: "100%",

            height: "100%",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",

              overflow: "hidden",
            }}
          >
            <CustomTabs tabOpen={tabOpen} setTabOpen={setTabOpen} />
            {tabOpen && (
              <TabWindow
                uuid={tabOpen}
                response={response}
                dispatchRequest={dispatchRequest}
              />
            )}
          </Box>

          <Box
            sx={{
              height: ` calc(100vh - ${compSize}px)`,

              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <ResponseContainer response={response} />
          </Box>
        </SplitPane>
      </Box>
    </Box>
  );
}
