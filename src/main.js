import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin.js'
import Axios from 'axios'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

Vue.use(AudioPlayer)

Vue.use(preview)

const instance=Axios.create({
  baseURL:'http://localhost:1337/users/',
  timeout:5000
}) 
instance.interceptors.request.use(config=>{
  return config
});
instance.interceptors.response.use(res=>{
  return res.data
});
Vue.prototype.$axios = instance

// import { Cell, Checklist,Button } from 'mint-ui';
// import 'mint-ui/lib/style.min.css'
// Vue.component(Cell.name, Cell);
// Vue.component(Checklist.name, Checklist);
// Vue.component(Button.name, Button);


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
