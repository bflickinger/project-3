import axios from "axios";

import { SET_GAME_MEMORY, CHANGE_SCORE, SET_CURRENT_USER  } from "./types";

export const getMemory = (id, memory) => dispatch => {
  axios
    .post("/api/users/memory/" + id, memory)
    .then(res => { console.log('postmemory res') })
    .catch(err => console.log(err));
};

//update the memory by user
export const postMemory = (id, memory) => dispatch => {
  axios
    .post("/api/users/memory/" + id, memory)
    .then(res => { console.log('postmemory res') })
    .catch(err => console.log(err));
};