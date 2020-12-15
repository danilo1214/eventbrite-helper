import moment from "moment";
import {HTTP} from "@ionic-native/http";
const endpoint = "https://www.eventbriteapi.com/v3";
// const endpoint = "http://localhost:8080"
console.log(HTTP);



const getEndpoint = (url,state) => {
    console.log("??????");
    const {token} = state;
  
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
    eventCreated
};