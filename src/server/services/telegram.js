const axios = require('axios');
const config = require('config');
const baseUrl = config.get('telegram.baseUrl');

const getUrl = (method, token) => baseUrl + token + '/' + method;

const sendMessage = (token, data) => {
    data = {...data, parse_mode: 'markdown'}
    const url = getUrl('sendMessage', token);
    console.log(url);
    return axios.post(url, data);
}

module.exports = {
    sendMessage
}