import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/notifications';

export async function searchNotifications(searchParams,page = 0, size = 10) {
    return await axios.get(`${API_URL}?&page=${page}&size=${size}`,searchParams);
}

export async function readNotification(id) {
    return await axios.patch(`${API_URL}/${id}`);
}