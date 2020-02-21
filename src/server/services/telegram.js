const axios = require('axios');
const config = require('config');
const baseUrl = config.get('telegram.baseUrl');

const getUrl = (method, token) => baseUrl + token + '/' + method;

const sendMessage = async (token, source) => {
    const data = {
        chat_id: source.chat_id, 
        text: source.text,
        parse_mode: 'markdown'}
    const url = getUrl('sendMessage', token);
    return axios.post(url, data);
}

module.exports = {
    sendMessage
}