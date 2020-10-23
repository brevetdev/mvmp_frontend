import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/Home.vue'
import DosColum from '../views/DosColum.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HomeView',
            component: HomeView
        },

        {
            path: '/DosColum',
            name: 'DosColum',
            component: DosColum
        }

    ]
})