import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setListPlaces } from "../redux/actions";

const options = {
  componentRestrictions: { country: "my" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"],
};

const MUISearchBox = ({ map, mapApi, handleAdd, selectedPlace }) => {
  const inputRef = useRef();
  const autoCompleteRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    autoCompleteRef.current = new mapApi.places.Autocomplete(
      inputRef.current,
      options
    );
  }, [mapApi.places.Autocomplete]);

  useEffect(() => {
    autoCompleteRef.current.addListener("place_changed", async function () {
      const selected = await autoCompleteRef.current.getPlace();

      dispatch(setListPlaces(selected));
      inputRef.current.value = selected.name;
      handleAdd(selected);
    });
  }, [dispatch, handleAdd, map]);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.value = selectedPlace.name ?? "";
    }
  }, [selectedPlace.name]);

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      label="Search Location"
      InputProps={{
        endAdornment: inputRef?.current?.value && (
          <IconButton onClick={() => (inputRef.current.value = "")}>
            <ClearIcon color="inherit" size={20} />
          </IconButton>
        ),
      }}
    />
  );
};

export default MUISearchBox;
