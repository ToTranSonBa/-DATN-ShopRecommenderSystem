import axios from "axios";

const fastApiHost = `http://127.0.0.1:8000`

const  trainStatus= async () => {
    return axios.post(`${fastApiHost}/api/get/status/nbcf`)
}

const trainNBCF = async () => {
    return axios.post(`${fastApiHost}/api/trainingNBCF`)
}

const trainCancel = async () => {
    return axios.get(`${fastApiHost}/get/nbcf/cancel`)
}

export {
    trainNBCF, trainStatus, trainCancel
};