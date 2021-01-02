import Router from 'vue-router';
import Login from "./components/Login.vue";
import Events from "./components/Events.vue";
import Event from "./components/Event.vue";
import NewEvent from "./components/NewEvent.vue";
import NewTicketClass from "./components/NewTicketClass.vue";


const routes = [
    {
        name: "oauth",
        path: "/token_type=Bearer&access_token=:token"
    },
    {
        name: "login",
        path: "/login",
        component: Login
    },
    {
        name: "new-event",
        path: "/new-event",
        component: NewEvent
    },
    {
        name: "logout",
        path: "/logout"
    },
    {
        name: "events",
        path: "/events",
        component: Events
    },
    {
        name: "event",
        path: "/events/:id",
        component: Event
    },
    {
        name: "ticket-class",
        path: "/events/:id/class",
        component: NewTicketClass
    },
    {
        name: "event-edit",
        path: "/events/:id/edit",
        component: NewEvent
    }
];

export default new Router({routes});
