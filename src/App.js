import { Box, Button, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import HistoryList from "./components/HistoryList";
import Marker from "./components/Marker";
import MUISearchBox from "./components/MUISearchBox";

function App() {
  const listHistoryPlaces = useSelector((state) => state.listPlaces);
  const [state, setState] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });
  const [loading, setLoading] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [defaultLocation, setDefaultLocation] = useState([
    3.827975861558074, 102.022925653552622,
  ]);

  const apiHasLoaded = (map, maps) => {
    setLoading(true);
    setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  const handleAdd = useCallback(
    (place) => {
      setOpenHistory(false);
      setSelectedPlace(place);

      if (place.geometry) {
        state.mapInstance.setCenter(place?.geometry?.location);
        state.mapInstance.setZoom(16);
        setLoading(false);
      }
    },
    [state.mapInstance]
  );

  useEffect(() => {
    setLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (position) => {
      if (state.mapInstance) {
        state.mapInstance.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        state.mapInstance.setZoom(16);
        setDefaultLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      }
      setLoading(false);
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [state.mapInstance]);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          px: 2,
          py: 2,
          color: "yellow",
          textShadow: "0 0 2px #000",
          background: "black",
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        <h2>Google Place Autocomplete</h2>
      </Box>

      <Box sx={{ pt: 5 }}>
        {state.mapApiLoaded && (
          <MUISearchBox
            selectedPlace={selectedPlace}
            map={state.mapInstance}
            mapApi={state.mapApi}
            handleAdd={handleAdd}
          />
        )}

        <Box sx={{ paddingBottom: 2 }}>
          {listHistoryPlaces.length > 0 && (
            <Button
              variant="text"
              onClick={() => setOpenHistory((props) => !props)}
            >
              Search History
            </Button>
          )}
          <HistoryList
            open={openHistory}
            list={listHistoryPlaces}
            handleAdd={handleAdd}
          />
        </Box>

        {loading && <LinearProgress />}
        <Box
          sx={{
            mt: 1,
            height: "65vh",
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: "0 0 4px 2px black",
          }}
        >
          <GoogleMap
            defaultCenter={defaultLocation}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
          >
            {selectedPlace && (
              <Marker
                color="primary"
                fontSize="inherit"
                lat={
                  selectedPlace?.geometry?.location?.lat() ?? defaultLocation[0]
                }
                lng={
                  selectedPlace?.geometry?.location?.lng() ?? defaultLocation[1]
                }
                style={{ fontSize: 70, margin: -50 }}
                text={selectedPlace.name}
              />
            )}
          </GoogleMap>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
