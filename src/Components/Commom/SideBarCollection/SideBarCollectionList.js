import React from "react";

import AddIcon from "@mui/icons-material/Add";
import {
  List,
  Box,
  ListSubheader,
  Tooltip,
  IconButton,
  Collapse,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CreateCollectonModal } from "./SideBarCollection";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeCollection, OpenTab } from "../../../Redux";

export default function SideBarCollectionList({ collection }) {
  const [openCreateCollection, setOpenCreateCollection] = useState(false);
  const currCollection = useSelector((s) => s.comp?.currentCollection);
  return (
    <Box>
      <CreateCollectonModal
        open={openCreateCollection}
        setOpen={setOpenCreateCollection}
      />
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Tooltip title="create Collection">
              <IconButton
                onClick={() => {
                  setOpenCreateCollection(true);
                }}
                size="small"
                sx={{
                  marginRight: "8px",
                  width: "24px",
                  height: "24px",
                }}
              >
                <AddIcon
                  size="small"
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Box>All Collections</Box>
          </ListSubheader>
        }
      >
        {collection?.map((m, i) => {
          return (
            <MyListItem
              sx={{
                backgroundColor:
                  m.uuid === currCollection ? "rgba(0,0,0,0.09)" : "",
              }}
              key={i}
              collection={m}
            />
          );
        })}
      </List>
    </Box>
  );
}

const MyListItem = ({ collection, sx }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const collectionRequest = useSelector((s) => {
    const req = s.req;
    const request = [];
    try {
      for (let a of collection?.request) {
        request.push(req[a?.uuid]);
      }
      return request;
    } catch (e) {
      return [];
    }
  });
  const handleCollectionClick = () => {
    dispatch(ChangeCollection(collection?.uuid ?? ""));
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem
        sx={{ ...sx }}
        onClick={handleCollectionClick}
        secondaryAction={
          <IconButton edge="end" aria-label="comments" onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <ListItemText primary={collection?.name} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {collectionRequest?.map((m, i) => {
            return (
              <ListItemButton
                key={i}
                onClick={() => {
                  dispatch(OpenTab(m?.uuid));
                }}
              >
                <ListItemText primary={m?.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
