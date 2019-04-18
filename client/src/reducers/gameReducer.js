import {
  SET_GAME_MEMORY, GET_GAME_MEMORY, DELETE_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, RESET_SCORE
} from "../actions/types";

const initialState = {
  memory: {},
  computer: 0,
  player: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GAME_MEMORY:
      console.log('reducer action ->', action.payload);
      return {
        ...state,
        memory: action.payload,
      };
    case GET_GAME_MEMORY:
      return {
        ...state,
      };
    case DELETE_GAME_MEMORY:
      return {
        ...state,
      };
    case INCREMENT_PLAYER:
      return {
        ...state,
        player: state.player + 1
      };
    case INCREMENT_COMPUTER:
      return {
        ...state,
        computer: state.computer +1
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