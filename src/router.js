import Router from 'vue-router';
import Login from "./components/Login.vue";

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
        name: "events",
        path: "/events"
    }
];

export default new Router({routes});
