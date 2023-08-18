import axios from "./config";

export const csrf = async () => await axios.get("/sanctum/csrf-cookie");