import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/Home.vue'
import DosColum from '../views/DosColum.vue'
Vue.use(Router)
export default new Router({
    routes: [
        //Default route -> HomeView Component.
        {
            path: '*',
            component: HomeView
        },
        {
            path: '/home',
            name:'HomeView',
            component: HomeView
        },
        
        {
            path: '/paginas/:nombre',
            name: 'DosColum',
            component: DosColum
        }
    ]
})