import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// import HomePage from '../views/HomePage.vue'
import HomePage from '../views/00.HomePage/00.HomePage.vue'

import EntrancePage from '../views/01.AutenticationAndAutorization/00.EntrancePage.vue'
import LoginPage from '../views/01.AutenticationAndAutorization/02.LoginPage.vue';
import RegisterPage from '../views/01.AutenticationAndAutorization/01.RegisterPage.vue';

import MagacinStanjePage from '../views/02.Inventar/MagacinStanjePage.vue';
import MagacinUnesiPage from '../views/02.Inventar/MagacinUnesiPage.vue';

import ProjektiPage from '../views/03.Projekat/ProjektiPage.vue';
import ProjektiStanjePage from '../views/03.Projekat/ProjektiStanjePage.vue';
import CreateProjectPage from '../views/03.Projekat/CreateProjectPage.vue';

import SelektovanjeProjektaPage from '../views/04.Obrada/04.SelectProjectPage.vue';
import ArhivaPage from '../views/04.Obrada/01.ArhivaPage.vue';

import AccountPage from '../views/05.Account/01.AccountPage.vue'

import CrtanjePage from '../views/maketa/01.CrtanjePage.vue';
import ProgramiranjePage from '../views/maketa/02.ProgramiranjePage.vue';
import PripremaSjecenjePage from '../views/maketa/03.PripremaSjecenjePage.vue';
import SjecenjePage from '../views/maketa/04.SjecenjePage.vue';
import PripremaFarbanjePage from '../views/maketa/05.PripremaFarbanjePage.vue';
import FarbanjePage from '../views/maketa/06.FarbanjePage.vue';
import SklapanjePage from '../views/maketa/07.SklapanjePage.vue';

import PhotoGaleryPage from '../views/PhotoGaleryPage.vue';



const routes: Array<RouteRecordRaw> = [
  { 
    path: "/home",
    name: 'Home',
    component: HomePage
  } ,

  ////////////AUTENTICATION AND AUTORIZATION/////////////////////
  {
    path: '/',
    name: 'Entrance',
    component: EntrancePage,
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

 ///////////// INVENTAR ///////////////////// 
  {
    path: '/magacinStanje',
    name: 'MagacinStanje',
    component: MagacinStanjePage,
    meta: { requiresAuth: true, roles: ['magacinStanje', 'admin'] } // only admins can access
  }, 
  {
    path: '/magacinUnesi',
    name: 'MagacinUnesi',
    component: MagacinUnesiPage,
    meta: { requiresAuth: true, roles: ['magacinUnesi', 'admin'] } // only admins can access
  }, 

 /////////////// PROJEKTI /////////////////////// 
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
  
/////////////// OBRADA ///////////////////////
  {
    path: '/select',
    name: 'Select',
    component: SelektovanjeProjektaPage,
  },  
  {
    path: '/arhiva',
    name: 'Arhiva',
    component: ArhivaPage,
  }, 
  
 ///////////// ACCOUNT ///////////////////////   
  {
    path: '/account',
    name: 'Account',
    component: AccountPage,
  }, 

  ///////////// MAKETA ///////////////////////
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

 /////////////  PHOTO GALERY /////////////////////// 
  { 
    path: '/photogalery',
    name: 'PhotoGalery',
    component: PhotoGaleryPage 
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router