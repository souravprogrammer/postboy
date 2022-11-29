import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ApiIcon from "@mui/icons-material/Api";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";

export default function SideBarList() {
  return [
    {
      name: "Collections",
      icon: FolderIcon,
      id: "coll",
    },
    {
      name: "API's",
      icon: ApiIcon,
      id: "api",
    },
    {
      name: "Environments",
      icon: MarkunreadMailboxIcon,
      id: "env",
    },
  ];
}
