import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from '../views/home-page/home-page.vue'
import leadApp from '../views/lead-app/lead-app.vue'
import funnelBoard from '../components/funnel-board/funnel-board.vue'
import leadList from '../components/lead-list/lead-list.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: homePage,
        },
        {
            path: '/lead',
            redirect: '/lead/list',
            name: 'lead',
            component: leadApp,
            children: [
                {
                    path: 'list',
                    name: 'list',
                    component: leadList,
                },
                {
                    path: 'board',
                    name: 'board',
                    component: funnelBoard,
                },
            ],
        },
        {
            path: '/contact',
            name: 'contact',
            component: funnelBoard,
        },
    ],
})

export default router
