import Vuex from "vuex";
import {getEndpoint} from "./helpers";



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
            event: (state) => (id) => {
                return state.movies.filter(movie => {
                    return movie.id === id;
                });
            }
        },
        actions: {
            logout: ({commit}) => {
              commit('APP_LOGIN', null);
            },
            loadOrganization: ({commit,state}) => {
                return getEndpoint(`/users/me/organizations`, state).then(response=>{
                    const {data} = response;
                    if(data.organizations){
                        commit("SET_ORGANIZATION", data.organizations[0].id);
                    }
                }); 
            },
            auth: ({commit,state}) => {
                const token = localStorage.getItem("eventbrite_token");
                commit("APP_LOGIN",token);
                return getEndpoint(`/users/me`, state);
            },
            // eslint-disable-next-line no-unused-vars
            loadEvents: ({commit, state}) => {
                const {organizationId} = state;
                return getEndpoint(`/organizations/${organizationId}/events/`, state).then(data => {
                    commit('SET_EVENTS', data.data.events);
                }).catch(err => {
                    console.log(err);
                });
            },
            login({commit}, {token}) {
                commit("APP_LOGIN", token);
                localStorage.setItem("eventbrite_token", token);
            }
        }
    });
};
