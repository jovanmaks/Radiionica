import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import MemoriesPage from '../views/MemoriesPage.vue'
import SearchPage from '../views/SearchPage.vue'
import ActivityPage from '../views/ActivityPage.vue'
import MenyPage from '../views/MenyPage.vue'
import HomePage from '../views/HomePage.vue'
import QRPage from '../views/QRScannerPage.vue'
import MessagesPage from '../views/MessagesPage.vue'

import LoginPage from '../views/Login.vue';
import AccountPage from '../views/Account.vue';



const routes: Array<RouteRecordRaw> = [
  { 
    path: "/",
    name: 'Login',
    component: LoginPage
  } ,
  { 
    path: '/account',
    name: 'Account',
    component: AccountPage
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router



// // const routes: Array<RouteRecordRaw> = [
// const routes = [
//   {
//     path: '/',
//     redirect: '/tabs/tab1'
//   },
//   {
//     path:'/activity',
//     component: ActivityPage 
//   },
//   {
//     path:'/search',
//     component: SearchPage
//   },
//   {
//     path:'/meny',
//     component: MenyPage
//   },
//   {
//     path:'/profile',
//     component: ProfilePage
//   },
//   {
//     path:'/home',
//     component: HomePage
//   },
//   {
//     path:'/qr',
//     component: QRPage
//   },
//   {
//     path:'/messages',
//     component: MessagesPage
//   },
//   {
//     path: '/tabs/',
//     component: TabsPage,
//     children: [
//       {
//         path: '',
//         redirect: '/tabs/tab1'
//       },
//       {
//         path: 'tab1',
//         component: () => import('@/views/Tab1Page.vue')
//       },
//       {
//         path: 'messages',
//         component: () => import('@/views/MessagesPage.vue')
//       },
//       {
//         path: 'profile',
//         component: () => import('@/views/ProfilePage.vue')
//       },
//       {
//         path: 'search',
//         component: () => import('@/views/SearchPage.vue')
//       },
//       {
//         path: 'meny',
//         component: () => import('@/views/MenyPage.vue')
//       }
//     ]
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
