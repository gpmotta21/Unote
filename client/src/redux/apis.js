import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// process.env.REACT_APP_API_URL

export const REGISTER_URL = (user) => axios.post(`${url}register`, user);
export const LOGIN_URL = (user) => axios.post(`${url}login`, user);

export const FETCH_ACCOUNT_URL = async (token) => await axios.get(`${url}getaccount`, token);
export const CREATE_NOTE_URL = (note, id) => axios.patch(`${url}createnote/${id}`, note);
export const DELETE_NOTE_URL = (id, note) => axios.patch(`${url}delete/${id}/${note}`);
export const EDIT_NOTE_URL = (noteId, edit) => axios.patch(`${url}editnote/${noteId}`, edit);
export const DELETE_ACCOUNT_URL = (id) => axios.delete(`${url}deleteaccount/${id}`);
