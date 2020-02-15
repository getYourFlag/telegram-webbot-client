import axios from '../helpers/axios';
import { response } from 'express';

function login(username, password) {
    axios.post('/auth', {
        username, password
    }).then(res => {
        if (response.status === 401) {
            logout();
            location.reload(true);
        }
        return res.data;
    }).then(userData => {
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    });

}

function logout() {
    localStorage.removeItem('user');
}

export const authService = {
    login,
    logout
}