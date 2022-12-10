import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tabs, Grid } from "@mui/material";
import { CloseTab, NewRequest } from "../../../Redux";
import uuid4 from "uuid4";

export default function CustomTabs({ onChangeTab, tabOpen, setTabOpen }) {
  const dispatch = useDispatch();
  const tab = useSelector((s) => {
    const arr = [];
    s.comp?.tabOpen?.forEach((t) => {
      arr.push(s.req[t]);
    });
    return arr;
  });

  const onRemoveTab = (m) => {
    dispatch(CloseTab(m.uuid));
  };
  const onAddTab = () => {
    dispatch(
      NewRequest({
        url: "",
        uuid: `${uuid4()}request`,
      })
    );
  };

  useEffect(() => {
    console.log("setting tab open");
    if (!tab?.find((f) => f?.uuid === tabOpen)) {
      setTabOpen(tab[0]?.uuid);
    }
  }, [tab]);
  useEffect(() => {
    if (tab.length > 0 && !tabOpen) {
      setTabOpen(tab[0].uuid);
    } else if (tab.length === 0 && tabOpen) {
      setTabOpen("");
    }
  }, [tab]);

  return (
    <Grid
      alignItems={"center"}
      sx={{
        display: "flex",

        maxWidth: "100%",
        position: "relative",

        minHeight: "42px",

        borderBottom: "1px solid rgba(0,0,0,0.1)",
        maxHeight: "42px",
      }}
    >
      <Grid
        sx={{
          position: "relative",
          overflow: "hidden",
          maxWidth: "100%",
          minHeight: "42px",
          position: "absolute",
          width: "100%",
        }}
      >
        {tabOpen && tab.length > 0 && (
          <Tabs
            value={tabOpen}
            variant="scrollable"
            onChange={(c, v) => {
              setTabOpen(v);
              onChangeTab?.(v);
            }}
            scrollButtons="auto"
            TabIndicatorProps={{
              style: {
                backgroundColor: "grey",
              },
            }}
            sx={{
              height: "42px",
              minHeight: "42px",
              minWidth: "200px",
              width: "calc(100% - 40px)",
              maxWidth: "calc(100% - 40px)",
            }}
          >
            {tab?.map((m, i) => {
              return (
                <Tab
                  key={i}
                  label={m?.name ?? "untitled Request"}
                  value={m.uuid}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    padding: "4px 8px",

                    height: "42px",
                    minHeight: "32px",
                  }}
                  icon={
                    <IconButton
                      component={"span"}
                      onClick={() => {
                        onRemoveTab(m);
                      }}
                      sx={{
                        height: "20px",
                        maxWidth: "14px",
                      }}
                    >
                      <CloseIcon
                        sx={{
                          height: "14px",
                          maxWidth: "14px",
                        }}
                      />
                    </IconButton>
                  }
                  iconPosition="end"
                  disableRipple
                />
              );
            })}
          </Tabs>
        )}
        <Grid
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <IconButton onClick={onAddTab}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
