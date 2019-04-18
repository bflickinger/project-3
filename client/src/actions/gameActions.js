import axios from "axios";

import {
  SET_GAME_MEMORY, GET_GAME_MEMORY, DELETE_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, RESET_SCORE
} from "../actions/types";

export function getMemory(id, memory) {
  return dispatch => {
    return axios.get('/api/users/memory/', id, memory)
      .catch(err => console.log(err));
  }
}

export function postMemory(id, memory) {
  return(dispatch) => {
      axios.post('/api/users/memory/' + id, memory)
        .then((response) => {dispatch(setMemory(memory));})
        .catch((response) => {return Promise.reject(response);});
    };
}

export const setMemory = memory => {
  return {
    type: SET_GAME_MEMORY,
    payload: memory
  };
};

export function incrementPlayer() {
  return {
    type: INCREMENT_PLAYER
  }
}

export function incrementComputer() {
  return {
    type: INCREMENT_COMPUTER
  }
}