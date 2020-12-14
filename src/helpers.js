import axios from "axios";
import moment from "moment";
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