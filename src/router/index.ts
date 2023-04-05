import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/Login.vue';
import AccountPage from '../views/Account.vue';
import RegisterPage from '../views/Register.vue';

import AdminPage from '../views/AdminPage.vue';
import ModelerPage from '../views/ModelerPage.vue';
import TehnicarPage from '../views/TehnicarPage.vue';


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
  { 
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, roles: ['admin'] } // only admins can access
  }, 
  { 
    path: '/modeler',
    name: 'Modeler',
    component: ModelerPage,
    meta: { requiresAuth: true, roles: ['modeler', 'admin'] } // only admins can access
  }, 
  { 
    path: '/tehnicar',
    name: 'Tehnicar',
    component: TehnicarPage,
    meta: { requiresAuth: true, roles: ['tehnicar', 'admin'] } // only admins can access
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router