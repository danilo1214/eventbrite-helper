import Vuex from "vuex";
import {getEndpoint, postEndPoint} from "./helpers";



export default (Vue) => {
    Vue.use(Vuex);
    return new Vuex.Store({
        state: {
            token: null,
            events: [],
            organizationId: null
        },
        mutations: {
            APP_LOGIN(state, value) {
                state.token = value;
            },
            SET_EVENTS(state, value) {
                state.events = value;
            },
            SET_ORGANIZATION(state,value){
                state.organizationId = value;
            }
        },
        getters: {
            token(state){
                return state.token;
            },
            events(state) {
                return state.events;
            },
            getEvent: (state) => (id) => {
                return state.events.filter(event => {
                    console.log(Number(event.id) === Number(id))
                    return Number(event.id) === Number(id);
                })[0];
            }
        },
        actions: {
            logout: ({commit}) => {
              commit('APP_LOGIN', null);
              localStorage.removeItem("eventbrite_token");
            },
            loadOrganization: ({commit,state}) => {
                return getEndpoint(`/users/me/organizations`, state).then(response=>{
                    let {data} = response;
                    data = JSON.parse(data);
                    if(data.organizations){
                        commit("SET_ORGANIZATION", data.organizations[0].id);
                    }
                }); 
            },
            auth: async ({commit,state}) => {
                const token = await localStorage.getItem("eventbrite_token");
                console.log(`authin with ${token}`);
                commit("APP_LOGIN",token);
                return getEndpoint(`/users/me`, state);
            },
            // eslint-disable-next-line no-unused-vars
            loadEvents: ({commit, state}) => {
                const {organizationId} = state;
                return getEndpoint(`/organizations/${organizationId}/events/?expand=ticket_classes,venue`, state).then(response => {
                    commit('SET_EVENTS', JSON.parse(response.data).events);
                }).catch(err => {
                    console.log(err);
                });
            },
            createEvent: ({state}, {event}) => {
                
                const {organizationId} = state;
                return postEndPoint(`/organizations/${organizationId}/events/`, state, {event}).then(data=>{
                    console.log(data);
                }).catch(err=>{
                    console.log("error ay");
                    console.log(JSON.stringify(err));
                });

            },
            login({commit}, {token}) {
                commit("APP_LOGIN", token);
                console.log(`setting token ${token}`);
                localStorage.setItem("eventbrite_token", token);
                console.log(`token is ${localStorage.getItem("eventbrite_token")}`)
            }
        }
    });
};
