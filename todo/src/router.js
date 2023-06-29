import { createWebHashHistory, createRouter } from 'vue-router'
import TodoTask from './pages/TodoTask.vue'
import MyHomepage from './pages/MyHomepage.vue'
import AboutUs from './pages/AboutUs.vue'
const routes = [
    {path: '/home', component: MyHomepage},
    {path: '/create', component: TodoTask},
    {path: '/about', component: AboutUs}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router