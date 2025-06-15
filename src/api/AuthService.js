import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/auth';

export async function login(user) {
    return await axios.post(`${API_URL}/sign-in`, user);
}

export async function signup(user) {
    return await axios.post(`${API_URL}/sign-up`, user);
}
