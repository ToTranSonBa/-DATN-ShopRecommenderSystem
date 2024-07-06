import axios from "axios";

const fastApiHost = `https://fastapi-2i32.onrender.com/`;

const trainStatus = async () => {
  return axios.post(`${fastApiHost}/api/get/status/nbcf`);
};

const trainNBCF = async () => {
  return axios.post(`${fastApiHost}/api/trainingNBCF`);
};

const trainCancel = async () => {
  return axios.get(`${fastApiHost}/get/nbcf/cancel`);
};

export { trainNBCF, trainStatus, trainCancel };
