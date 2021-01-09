import moment from "moment";
import {HTTP} from "@ionic-native/http";
//import axios from "axios";
const endpoint = "https://www.eventbriteapi.com/v3";
// const endpoint = "http://localhost:8080"


const postEndPoint = (url, state, data) => {
    const {token} = state;
    HTTP.setDataSerializer("json");
    return HTTP.sendRequest(`${endpoint}${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: {
            ...data
        },
        method: "post"
    });
};
const deleteEndpoint = (url, state) => {
    const {token} = state;
    return HTTP.sendRequest(`${endpoint}${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "delete"
    });
};
const getEndpoint = (url,state) => {
    console.log("??????");
    const {token} = state;
    /* return axios.get(`${endpoint}${url}`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }); */
    return HTTP.sendRequest(`${endpoint}${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "get"
    });
};

const soldTickets = event => {
    let sold = 0;

    event.ticket_classes.forEach(ticketClass=>{
        sold += ticketClass.quantity_sold;
    });

    return sold;
};
const eventCreated = event => {
    return moment(event.created).from();
};

const eventTime = event => {
    return moment(event.start.utc).format("DD-MM-YYYY");
};

export  {
    getEndpoint,
    eventTime,
    soldTickets,
    eventCreated,
    postEndPoint,
    deleteEndpoint
};