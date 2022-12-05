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
import { useSelector } from "react-redux";

export default function SideBarCollectionList({ collection }) {
  const [openCreateCollection, setOpenCreateCollection] = useState(false);
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
          return <MyListItem key={i} collection={m} />;
        })}
      </List>
    </Box>
  );
}

const MyListItem = ({ collection }) => {
  const [open, setOpen] = useState(false);

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

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem
        sx={{}}
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
              <ListItemButton key={i}>
                <ListItemText primary={m?.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
