import Router from 'vue-router';
import Login from "./components/Login.vue";
import Events from "./components/Events.vue";


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
        name: "logout",
        path: "/logout"
    },
    {
        name: "events",
        path: "/events",
        component: Events
    }
];

export default new Router({routes});
