// import { storeLoginToken, getLoginToken } from "../../utils/authutils"

const TOKEN_KEY = "LOGIN_TOKEN";

export const storeLoginToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getLoginToken = () => localStorage.getItem(TOKEN_KEY);
