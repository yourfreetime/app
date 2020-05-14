import axios from "axios";
import { URL } from "../core/constants";

export const onLogin = (email, password) => {
  return axios.post(`${URL}/login`, {
    email,
    password
  });
};

export const onRegister = ({ email, name, password }) => {
  const idImage = Math.floor(Math.random() * 1000 + 1);

  return axios.post(`${URL}/signup`, {
    email,
    name,
    picture: `https://i.picsum.photos/id/${idImage}/500/500.jpg`,
    password
  });
};
