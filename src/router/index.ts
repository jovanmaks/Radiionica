import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import EntrancePage from '../views/00.EntrancePage.vue'
import AccountPage from '../views/01.AccountPage.vue'
import MagacinPage_2 from '../views/02.MagacinPage.vue'

import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';

import AdminPage from '../views/AdminPage.vue';
import QRPage from '../views/QRPage.vue';
import PhotoGaleryPage from '../views/PhotoGaleryPage.vue';
import WelcomePage from '../views/WelcomePage.vue';

import MagacinPage from '../views/MagacinPage.vue';
import MagacinUnesiPage from '../views/MagacinUnesiPage.vue';
import MagacinStanjePage from '../views/MagacinStanjePage.vue';

import ProjektiPage from '../views/ProjektiPage.vue';
import CreateProjectPage from '../views/CreateProjectPage.vue';
import ProjektiStanjePage from '../views/ProjektiStanjePage.vue';
import SelektovanjeProjektaPage from '../views/04.SelectProjectPage.vue';


// import CrtanjePage from '../views/CrtanjePage.vue';

import CrtanjePage from '../views/maketa/01.CrtanjePage.vue';
import ProgramiranjePage from '../views/maketa/02.ProgramiranjePage.vue';
import PripremaSjecenjePage from '../views/maketa/03.PripremaSjecenjePage.vue';
import SjecenjePage from '../views/maketa/04.SjecenjePage.vue';
import PripremaFarbanjePage from '../views/maketa/05.PripremaFarbanjePage.vue';
import FarbanjePage from '../views/maketa/06.FarbanjePage.vue';
import SklapanjePage from '../views/maketa/07.SklapanjePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Entrance',
    component: EntrancePage,
  }, 
  { 
    path: "/home",
    name: 'Home',
    component: HomePage
  } ,
  {
    path: '/account',
    name: 'Account',
    component: AccountPage,
  }, 
  {
    path: '/magacin_2',
    name: 'Magacin_2',
    component: MagacinPage_2,
  },
  {
    path: '/select',
    name: 'Select',
    component: SelektovanjeProjektaPage,
  },  
  {
    path: '/:pageRoute',
    name: 'DynamicPage',
    component: () => import(/* webpackChunkName: "dynamicPage" */ '../views/DynamicPage.vue'),
    props: true // Pass route params as props to the component
  },
  { 
    path: "/login",
    name: 'Login',
    component: LoginPage
  } ,
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
    path: '/projekti',
    name: 'Projekti',
    component: ProjektiPage,
  }, 
  {
    path: '/napraviprojekat',
    name: 'NapraviProjekat',
    component: CreateProjectPage,
  }, 
  {
    path: '/projektistanje',
    name: 'ProjektiStanje',
    component: ProjektiStanjePage,
  }, 
  {
    path: '/crtanje',
    name: 'Crtanje',
    component: CrtanjePage,
  }, 
  {
    path: '/programiranje',
    name: 'Programiranje',
    component: ProgramiranjePage,
  }, 
  {
    path: '/pripremasjecenje',
    name: 'PripremaSjecenje',
    component: PripremaSjecenjePage,
  }, 
  {
    path: '/sjecenje',
    name: 'Sjecenje',
    component: SjecenjePage,
  }, 
  {
    path: '/pripremafarbanje',
    name: 'PripremaFarbanje',
    component: PripremaFarbanjePage,
  }, 
  {
    path: '/farbanje',
    name: 'Farbanje',
    component: FarbanjePage,
  }, 
  {
    path: '/sklapanje',
    name: 'Sklapanje',
    component: SklapanjePage,
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router