import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
//import UIRoute from '../pages/admin/ui/route'
import Dashboard from '../pages/admin/dashboard/Dashboard.vue'
import Tarifas from '../pages/admin/ranking/Tarifas.vue'
import Timeline from '../pages/admin/ranking/Timeline.vue'
import Top5 from '../pages/admin/ranking/Top5.vue'
import Comparador from '../pages/admin/comparator/Comparator.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      /* Taxas de Serviços*/
      {
        name: 'dashboard',
        path: 'dashboard',
        component: Dashboard,
      },

      /* Ranking */
      {
        name: 'ranking',
        path: 'ranking',
        component: RouteViewComponent,
        children: [
          {
            name: 'tariffs',
            path: 'tariffs',
            component: Tarifas
          },
          {
            name: 'timeline',
            path: 'timeline',
            component: Timeline
          },
          {
            name: 'topfive',
            path: 'topfive',
            component: Top5
          }
        ]
        
      },
      /* Comparador */
      {
        name: 'comparator',
        path: 'comparator',
        component: Comparador
      }

  
    
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue')
   
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes,
})

export default router
