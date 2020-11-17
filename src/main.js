// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Slide } from 'vue-burger-menu'
import VueFullPage from 'vue-fullpage.js'

Vue.use(Slide)
Vue.use(VueFullPage);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    render: h => h(App),

})