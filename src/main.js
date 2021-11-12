import Vue from 'vue'
import App from './components/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'

const routes = [
    { path: '/', component: Students},
    { path: '/student-info/:id', component: StudentInfo, props: true},
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
    render: h => h(App),
    el: '#app',
    router
})