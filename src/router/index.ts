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
import RegisterPage from '../views/Register.vue';
import AccountPage from '../views/Account.vue';


const routes: Array<RouteRecordRaw> = [
  { 
    path: "/",
    name: 'Home',
    component: HomePage
  } ,
  { 
    path: "/login",
    name: 'Login',
    component: LoginPage
  } ,
  { 
    path: '/account',
    name: 'Account',
    component: AccountPage
  }, 
  { 
    path: '/register',
    name: 'Register',
    component: RegisterPage 
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router