import {
  SET_GAME_MEMORY, RESET_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, SET_SCORE, RESET_SCORE
} from "../actions/types";

const initialState = {
  memory: {},
  computer: 0,
  player: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_MEMORY:
      return {
        ...state,
        memory: action.payload
      };
    case RESET_GAME_MEMORY:
      return {
        ...state,
        memory: []
      };
    case INCREMENT_PLAYER:
      return {
        ...state,
        player: state.player + 1
      };
    case INCREMENT_COMPUTER:
      return {
        ...state,
        computer: state.computer + 1
      };
    case SET_SCORE:
      return {
        ...state,
        player: action.payload.player,
        computer: action.payload.computer
      };
    case RESET_SCORE:
      return {
        ...state,
        player: 0,
        computer: 0
      };
    default:
      return state;
  }
}