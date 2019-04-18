import axios from "axios";

import {
  SET_GAME_MEMORY, GET_GAME_MEMORY, DELETE_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, RESET_SCORE
} from "../actions/types";

// export function getMemory(id) {
// 	const request = axios.get('/api/users/memory/' + id);
// 	setMemory(request);
// };

export function getMemory(id) {
  return (dispatch) => {
    axios.get('/api/users/memory/' + id)
      .then((res) => {
        console.log('getMemory .then ->', res);
        dispatch(setMemory(res));
      })
      .catch((res) => { return (res) })
  }
}

export function postMemory(id, memory) {
  return (dispatch) => {
    axios.post('/api/users/memory/' + id, memory)
      .then((response) => { return (response) })
      .catch((response) => { return (response) })
  }
}

export function setMemory(memory) {
  console.log('setMemory fired');
  return {
    type: SET_GAME_MEMORY,
    payload: memory
  }
}

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