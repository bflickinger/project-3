import axios from "axios";

import {
  SET_GAME_MEMORY, DELETE_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, SET_SCORE, RESET_SCORE
} from "../actions/types";

//Memory Actions

export function getMemory(id) {
  return (dispatch) => {
    axios.get('/api/users/memory/' + id)
      .then((res) => {
        console.log('getMemory .then ->', res.data);
        dispatch(setMemory(res.data));
        return res.data;
      })
      .catch((res) => { return (res) })
  }
}
export function setMemory(memory) {
  return {
    type: SET_GAME_MEMORY,
    payload: memory
  }
}

export function postMemory(id, memory) {
  return (dispatch) => {
    axios.post('/api/users/memory/' + id, memory)
      .then((response) => { return (response) })
      .catch((response) => { return (response) })
  }
}

//Score Actions

export function getScore(id) {
  return (dispatch) => {
    axios.get('/api/users/score/' + id)
      .then((res) => {
        console.log('getScore .then ->', res.data);
        dispatch(setScore(res.data));
        return res.data;
      })
      .catch((res) => { return (res) })
  }
}

export function setScore(data) {
  return {
    type: SET_SCORE,
    payload: data
  }
}

export function postScore(id, scores) {
  return (dispatch) => {
    axios.post('/api/users/score/' + id, scores)
      .then((res) => { return (res) })
      .catch((res) => { return (res) })
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

export function resetScore() {
  return{
    type: RESET_SCORE
  }
}

export function deleteMemory() {
  return{
    type: DELETE_GAME_MEMORY
  }
}