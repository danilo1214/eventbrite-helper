import axios from "axios";
const endpoint = "http://localhost:8080";

const getEndpoint = (url,state) => {
    const {token} = state;
    return axios.get(`${endpoint}${url}`, {
        mode: 'no-cors',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};
export  {
    getEndpoint
};