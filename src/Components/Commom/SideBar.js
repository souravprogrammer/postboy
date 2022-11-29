import React, { useMemo } from "react";

import { Box, List, ListItem, ButtonBase, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ChangeCurrentPage } from "../../Redux/CompReducers/CompSlice";
import SideBarCollection from "./SideBarCollection/SideBarCollection";

function SideBar({ list }) {
  const tab = useSelector((s) => s.comp.page);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Box sx={{ height: "100%" }}>
        <List>
          {list?.map((li, index) => {
            return (
              <ListItem
                key={index}
                disablePadding
                sx={
                  tab === li.id
                    ? {
                        backgroundColor: "rgba(0,0,0,0.1)",
                        color: "primary.main",
                        borderLeft: "4px solid",
                        borderColor: "primary.main",
                      }
                    : {}
                }
              >
                <ButtonBase
                  onClick={() => {
                    dispatch(ChangeCurrentPage(li.id));
                  }}
                  sx={{
                    height: "52px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",

                    width: "72px",
                  }}
                >
                  {<li.icon sx={{ width: "16px" }} />}

                  <Typography sx={{ fontSize: "10px" }}>{li.name}</Typography>
                </ButtonBase>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        {useMemo(
          () => (
            <SideBarCollection />
          ),
          []
        )}
      </Box>
    </Box>
  );
}

export default React.memo(SideBar);
