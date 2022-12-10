import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tabs, Grid } from "@mui/material";
import { CloseTab, NewRequest, OpenTab } from "../../../Redux";
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
      container
      alignItems={"center"}
      sx={
        {
          // border: "1px solid red",
        }
      }
    >
      <Grid item xs={11}>
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
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={onAddTab}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
