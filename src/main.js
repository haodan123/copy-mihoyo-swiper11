import { createApp } from 'vue'
import pinia from './stores'
import { register } from 'swiper/element/bundle'


import App from './App.vue'
import router from './router'
import '@/assets/css/anim.css'
import '@/assets/css/style.css'
// import 'swiper/css';
// register()

const app = createApp(App)
app.use(register); //注册swiper


// app.use(createPinia())
app.use(pinia)

app.use(router)

app.mount('#app')
