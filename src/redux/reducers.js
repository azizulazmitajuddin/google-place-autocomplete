import { LIST_PLACES } from "./actions";

const initialState = {
  listPlaces: [],
};

export function reducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_PLACES:
      if (
        payload.geometry &&
        (state.listPlaces.length === 0 ||
          state.listPlaces[0]?.name !== payload.name)
      ) {
        return { ...state, listPlaces: [payload, ...state.listPlaces] };
      } else {
        return state;
      }
    default:
      return state;
  }
}
