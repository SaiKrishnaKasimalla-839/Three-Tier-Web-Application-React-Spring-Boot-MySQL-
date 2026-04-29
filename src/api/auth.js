import axios from "axios";

const BASE_URL = "http://20.164.2.140:8080";

export const signup = (data) =>
  axios.post(`${BASE_URL}/api/signup`, data);

export const login = (data) =>
  axios.post(`${BASE_URL}/api/login`, data);
