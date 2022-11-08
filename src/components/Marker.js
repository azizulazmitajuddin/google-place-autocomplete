import RoomIcon from "@mui/icons-material/Room";
import { Box } from "@mui/material";
import React from "react";

const Marker = ({ text }) => (
  <Box
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: 18,
      height: 18,
      backgroundColor: "yellow",
      border: "2px solid #fff",
      borderRadius: "100%",
      userSelect: "none",
      transform: "translate(-50%, -50%)",
    }}
    alt={text}
  >
    <Box
      style={{
        margin: "-15px -26px 10px",
      }}
    >
      <RoomIcon sx={{ fontSize: 70 }} color="primary" fontSize="inherit" />
      <b>{text}</b>
    </Box>
  </Box>
);

Marker.defaultProps = {
  text: null,
};

export default Marker;
