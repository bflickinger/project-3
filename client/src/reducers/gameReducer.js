import { SET_GAME_MEMORY, CHANGE_SCORE } from "../actions/types";

const initialState = {
  user: {},
  computer: 0,
  player: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_MEMORY:
      return {
        ...state
      };
    case CHANGE_SCORE:
      return {
        ...state,
      };
    default:
      return state;
  }
}