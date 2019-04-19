import axios from "axios";

import {
  SET_GAME_MEMORY, DELETE_GAME_MEMORY, INCREMENT_PLAYER, INCREMENT_COMPUTER, SET_SCORE, RESET_SCORE
} from "../actions/types";

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

export function postMemory(id, memory) {
  return (dispatch) => {
    axios.post('/api/users/memory/' + id, memory)
      .then((response) => { return (response) })
      .catch((response) => { return (response) })
  }
}

export function setMemory(memory) {
  return {
    type: SET_GAME_MEMORY,
    payload: memory
  }
}

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

export function postScore(id, data) {
  return (dispatch) => {
    axios.post('/api/users/score/' + id, data)
      .then((response) => { return (response) })
      .catch((response) => { return (response) })
  }
}

export function setScore(data) {
  return {
    type: SET_SCORE,
    payload: data
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