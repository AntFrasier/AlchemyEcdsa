import axios from "axios";

const server = axios.create({
  baseURL: "https://alchemy-ecdsa.vercel.app/",
});

export default server;
