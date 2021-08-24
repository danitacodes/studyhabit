import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://studyhabit.herokuapp.com/",
});
