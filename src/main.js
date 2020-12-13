// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Slide } from 'vue-burger-menu'
import VueFullPage from 'vue-fullpage.js'
import VuePlyr from 'vue-plyr'
import Carousel3d from 'vue-carousel-3d';
import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin);
Vue.use(Slide);
Vue.use(VueFullPage);
Vue.use(VuePlyr);
Vue.use(Carousel3d);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    render: h => h(App),

})