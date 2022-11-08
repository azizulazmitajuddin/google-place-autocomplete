import GoogleMapReact from "google-map-react";
import React from "react";

const GoogleMap = ({ children, ...props }) => (
  <div style={{ height: "100%", width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY,
        libraries: ["places", "geometry"],
      }}
      defaultZoom={9}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
);

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
