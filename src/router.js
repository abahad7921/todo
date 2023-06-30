import { createWebHashHistory, createRouter } from 'vue-router'
import TodoTask from './pages/TodoTask.vue'
import MyHomepage from './pages/HomePage.vue'
import AboutUs from './pages/AboutUs.vue'
const routes = [
    {path: '/home', alias:'/',component: MyHomepage},
    {path: '/create', component: TodoTask},
    {path: '/about', component: AboutUs}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router