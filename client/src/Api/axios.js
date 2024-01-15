import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5001",//server
});

Api.defaults.withCredentials = true;
export default Api;
