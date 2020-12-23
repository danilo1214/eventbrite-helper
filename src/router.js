import Router from 'vue-router';
import Login from "./components/Login.vue";
import Events from "./components/Events.vue";
import Event from "./components/Event.vue";
import NewEvent from "./components/NewEvent.vue";


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
        name: "events",
        path: "/events/:id",
        component: Event
    }
];

export default new Router({routes});
