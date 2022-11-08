import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const HistoryList = ({ open, list, handleAdd }) => (
  <Collapse
    in={open}
    sx={{
      border: "1px solid lightgrey",
      borderRadius: 1,
      maxHeight: 200,
      overflow: "auto",
    }}
  >
    <List>
      {list.map((item, i) => (
        <ListItem
          key={i}
          onClick={() => handleAdd(item)}
          disablePadding
          divider={list.length - 1 !== i}
        >
          <ListItemButton>
            <ListItemIcon>
              <img
                src={item.icon}
                height={20}
                alt={`icon_${i}`}
                loading={item.icon}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${item.name} - ${item.address_components?.map(
                (a) => ` ${a.long_name}`
              )}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Collapse>
);

HistoryList.defaultProps = {
  open: false,
  list: [],
};

export default HistoryList;
