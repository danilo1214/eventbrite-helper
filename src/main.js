import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'; //All the CSS
import Store from "./store";
import router from "./router";
import locale from "element-ui/lib/locale/lang/en";



Vue.config.productionTip = false
export const store = Store(Vue);

Vue.use(VueRouter)
Vue.use(ElementUI, {
  locale
});

new Vue({
  render: h => h(App),
  store,
  router

}).$mount('#app')
