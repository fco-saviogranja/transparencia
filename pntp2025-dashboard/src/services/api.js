import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchAlerts = async () => {
    try {
        const response = await axios.get(`${API_URL}/alerts`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserProfile = async (userId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchNotifications = async () => {
    try {
        const response = await axios.get(`${API_URL}/notifications`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};