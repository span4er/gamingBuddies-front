import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/library';

export async function getGame(id) {
    return await axios.get(`${API_URL}/game/${id}`);
}

export async function searchGames(searchParams,page = 0, size = 10) {
    return await axios.get(`${API_URL}?&page=${page}&size=${size}`,searchParams);
}
