import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/events';

export async function getEvent(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function getEvents(searchParams, page = 0, size = 10) {
    return await axios.post(`${API_URL}?&page=${page}&size=${size}`,searchParams);
}
