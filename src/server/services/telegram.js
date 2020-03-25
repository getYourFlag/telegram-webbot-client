const axios = require("axios");
const config = require("config");
const FormData = require("form-data");
const baseUrl = "https://api.telegram.org/bot";
const Fs = require("fs");
const Path = require("path");

const getUrl = (method, token) => baseUrl + token + "/" + method;
const getFormData = data => {
    const output = new FormData();
    for (let key in data) {
        output.append(key, data[key]);
    }
    return output;
}

const sendMessage = async (token, source) => {
    const data = {
        chat_id: source.chat_id,
        text: source.text,
        parse_mode: "markdown",
    };
    const url = getUrl("sendMessage", token);
    return axios.post(url, data);
};

const sendPhoto = async (token, source) => {
    const data = {
        chat_id: source.chat_id,
        caption: source.caption,
        photo: source.photo
    }
    const multipartData = getFormData(data);
    const url = getUrl("sendPhoto", token);
    return axios.post(url, multipartData, {
        headers: {
           ...multipartData.getHeaders()
        },
        maxContentLength: Infinity
    });
}

const sendVideo = async (token, source) => {
    const data = {
        chat_id: source.chat_id,
        caption: source.caption,
        video: source.video
    }
    const multipartData = getFormData(data);
    const url = getUrl("sendVideo", token);
    return axios.post(url, multipartData, {
        headers: {
           ...multipartData.getHeaders()
        },
        maxContentLength: Infinity
    });
}

const sendAudio = async (token, source) => {
    const data = {
        chat_id: source.chat_id,
        caption: source.caption,
        audio: source.audio
    }
    const multipartData = getFormData(data);
    const url = getUrl("sendAudio", token);
    return axios.post(url, multipartData, {
        headers: {
           ...multipartData.getHeaders()
        },
        maxContentLength: Infinity
    });
}

const downloadFile = (token, fileId, fileName) => {
    const filePath = Path.resolve(__dirname, "../../../", "assets", fileName);
    const writer = Fs.createWriteStream(filePath);
    return axios
        .post(getUrl("getFile", token), { file_id: fileId })
        .then(res => {
            return axios.get(
                `https://api.telegram.org/file/bot${token}/${res.data.result.file_path}`,
                {
                    responseType: "stream",
                }
            );
        })
        .then(res => {
            res.data.pipe(writer);
            return Promise.resolve(`/assets/${fileName}`);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

module.exports = {
    sendMessage,
    sendPhoto,
    sendVideo,
    downloadFile,
};
