import axios from "axios";

const fastApiHost = `https://fastapi-2i32.onrender.com`;

const NBCFStatus = async () => {
  return axios.post(`${fastApiHost}/api/get/status/nbcf`);
};

const trainNBCF = async () => {
  return axios.post(`${fastApiHost}/api/trainingNBCF`);
};

const CancelNBCF = async () => {
  return axios.get(`${fastApiHost}/get/nbcf/cancel`);
};

const CBFStatus = async () => {
  return axios.post(`${fastApiHost}/api/get/status/cbf`);
};

const trainCBF = async () => {
  return axios.get(`${fastApiHost}/api/trainingCBF`);
};

const CancelCBF = async () => {
  return axios.get(`${fastApiHost}/get/cbf/cancel`);
};

export { trainNBCF, CBFStatus, CancelCBF, CancelNBCF, trainCBF, NBCFStatus };
