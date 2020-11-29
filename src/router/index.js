import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/Home.vue';
import DosColum from '../views/DosColum.vue';
import Exposicion from '../views/Exposiciones.vue';
import Mapa from '../views/Mapa.vue';
Vue.use(Router);
export default new Router({
    routes: [
        //Default route -> HomeView Component.
        {
            path: '*',
            component: HomeView
        },
        {
            path: '/home',
            name: 'HomeView',
            component: HomeView
        },
        {
            path: '/paginas/:nombre',
            name: 'DosColum',
            component: DosColum
        },
        {
            path: '/exposicion/:nombre',
            name: 'Exposicion',
            component: Exposicion
        },
        {
            path: '/mapa/:nombre',
            name: 'Mapa',
            component: Mapa
        }
    ]
});