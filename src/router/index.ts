import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/Login.vue';
import AccountPage from '../views/Account.vue';
import RegisterPage from '../views/Register.vue';

import AdminPage from '../views/AdminPage.vue';
import ModelerPage from '../views/ModelerPage.vue';
import TehnicarPage from '../views/TehnicarPage.vue';
import QRPage from '../views/QRPage.vue';
import PhotoGaleryPage from '../views/PhotoGaleryPage.vue';
import WelcomePage from '../views/WelcomePage.vue';

import MagacinPage from '../views/MagacinPage.vue';
import MagacinUnesiPage from '../views/MagacinUnesiPage.vue';
import MagacinStanjePage from '../views/MagacinStanjePage.vue';

import ProfilePage from '../views/ProfilePage.vue';
import PocetnaPage from '../views/PocetnaPage.vue';

import ProjektiPage from '../views/ProjektiPage.vue';
import CreateProjectPage from '../views/CreateProjectPage.vue';

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
    path: '/qr',
    name: 'QR',
    component: QRPage 
  }, 
  { 
    path: '/photogalery',
    name: 'PhotoGalery',
    component: PhotoGaleryPage 
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
  { 
    path: '/welcome',
    name: 'Welcome',
    component: WelcomePage,
    meta: { requiresAuth: true, roles: ['welcome', 'admin'] } // only admins can access
  }, 
  { 
    path: '/magacin',
    name: 'Magacin',
    component: MagacinPage,
    meta: { requiresAuth: true, roles: ['magacin', 'admin'] } // only admins can access
  }, 
  {
    path: '/magacinUnesi',
    name: 'MagacinUnesi',
    component: MagacinUnesiPage,
    meta: { requiresAuth: true, roles: ['magacinUnesi', 'admin'] } // only admins can access
  }, 
  {
    path: '/magacinStanje',
    name: 'MagacinStanje',
    component: MagacinStanjePage,
    meta: { requiresAuth: true, roles: ['magacinStanje', 'admin'] } // only admins can access
  }, 
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  }, 
  {
    path: '/pocetna',
    name: 'Pocetna',
    component: PocetnaPage,
  }, 
  {
    path: '/projekti',
    name: 'Projekti',
    component: ProjektiPage,
  }, 
  {
    path: '/napraviprojekat',
    name: 'NapraviProjekat',
    component: CreateProjectPage,
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router