import axios from "axios";

const API_URL = 'http://192.168.0.181:8080/reports';

export async function getReport(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function searchReports(searchParams,page = 0, size = 10) {
    return await axios.get(`${API_URL}?&page=${page}&size=${size}`,searchParams);
}
