import axios from "axios";

const BASE_URL = "http://localhost:3000/sheet";

export const setCell = async (payload) => {
    return await axios.post(`${BASE_URL}/set`, payload);
};

export const getValue = async (formula) => {
    return await axios.post(`${BASE_URL}/value`, { formula });
};

export const getAllCells = async () => {
    return await axios.get(`${BASE_URL}/all`);
};