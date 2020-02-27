const axios = require("axios");
const config = require("config");
const baseUrl = config.get("telegram.baseUrl");
const Fs = require("fs");
const Path = require("path");

const getUrl = (method, token) => baseUrl + token + "/" + method;

const sendMessage = async (token, source) => {
  const data = {
    chat_id: source.chat_id,
    text: source.text,
    parse_mode: "markdown"
  };
  const url = getUrl("sendMessage", token);
  return axios.post(url, data);
};

const downloadFile = (token, fileId, fileName) => {
  const filePath = Path.resolve(__dirname, "../../../", "assets", fileName);
  const writer = Fs.createWriteStream(filePath);
  return axios
    .post(getUrl("getFile", token), { file_id: fileId })
    .then(res => {
      return axios.get(
        `https://api.telegram.org/file/bot${token}/${res.data.result.file_path}`,
        {
          responseType: "stream"
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
  downloadFile
};
