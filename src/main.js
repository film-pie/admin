import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import VueCookies from 'vue-cookies'

const app = createApp(App)
// 将事件总线对象添加到应用程序上下文中

app.use(store)
app.use(router)
app.use(ViewUIPlus)
app.mount('#app')
app.use(VueCookies)
