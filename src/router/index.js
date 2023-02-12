import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from '../views/home-page/home-page.vue'
import leadApp from '../views/lead-app/lead-app.vue'
import funnelBoard from '../components/funnel-board/funnel-board.vue'
import leadList from '../components/lead-list/lead-list.vue'
import leadCard from '../components/lead-card/lead-card.vue'

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
                // {
                //     path: 'card',
                //     name: 'card',
                //     component: contactCard,
                // },
                {
                    path: 'card/:id?',
                    name: 'card',
                    component: leadCard,
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
