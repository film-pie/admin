import { createRouter, createWebHistory } from 'vue-router'
import { compile } from 'vue'
import Home from '@/components/Demo.vue'
import Login from '@/components/login'
import Dashboard from '@/components/admin/dashboard.vue'
import allVideo from '@/components/admin/allVideo.vue'
import allUser from '@/components/admin/allUser.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: '/allVideo',
        component: allVideo,
      },
      {
        path: '/allUser',
        component: allUser,
      }

    ]
  },
  {
    path: '/login',
    component: Login,

  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
