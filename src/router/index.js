import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Subject from '../views/Subject.vue'
import search2 from '../components/search2.vue'
import details from '../components/details.vue'
import comment from '../components/comment.vue'
import audiodetails from '../components/audiodetails.vue'
import register from '../components/register.vue'
import login from '../components/login.vue'
import mine from '../components/mine.vue'
import history from '../components/history.vue'
import topic from '../components/topic.vue'
import collection from '../components/collection.vue'
import store from '../components/store.vue'
import searchaudio from '../components/searchaudio.vue'



Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home',component: Home},
  {path: '/subject',name: 'Subject',component: Subject},
  {path: '/search2',name: 'search2',component: search2},
  {path: '/details/:id',name: 'details',component: details},
  {path: '/comment/:id',name: 'comment',component: comment},
  {path: '/audiodetails/:id',name: 'audiodetails',component: audiodetails},
  {path: '/register',name: 'register',component: register},
  {path: '/login',name: 'login',component: login},
  {path: '/mine',name: 'mine',component: mine},
  {path: '/history',name: 'history',component: history},
  {path: '/topic/:title',name: 'topic',component: topic},
  {path: '/collection',name: 'collection',component: collection},
  {path: '/store',name: 'store',component: store},
  {path: '/searchaudio',name: 'searchaudio',component: searchaudio},

]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
