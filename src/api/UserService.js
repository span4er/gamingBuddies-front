import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/users';

export async function saveUser(user) {
    return await axios.post(`${API_URL}/new`, user);
}

export async function getUsers(searchParams,page = 0, size = 10) {
    return await axios.post(`${API_URL}?&page=${page}&size=${size}`,searchParams);
}

export async function getUser(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateUser(user) {
    return await axios.post(API_URL, user);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteUser(id) {
    return await axios.delete(`${API_URL}/${id}`);
}