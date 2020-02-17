import axios from 'axios';
import config from 'config';
const baseUrl = config('telegram.baseUrl');

const getUrl = (method, token) => baseUrl + token + '/' + method;

export const sendMessage = async (token, data) => {
    data = {...data, parse_mode: 'markdown'}
    try {
        return await axios.post(getUrl('sendMessage', token), data)
    } catch (e) {
        return e;
    }
}