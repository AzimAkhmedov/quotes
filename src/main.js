import './assets/main.css'
import 'vue-toastification/dist/index.css'

import Toast from 'vue-toastification'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(Toast)
app.use(router)
app.use(store)

app.mount('#app')
