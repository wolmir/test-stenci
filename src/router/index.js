import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreatePessoa from '../views/CreatePessoa.vue'
import EditPessoa from '../views/EditPessoa.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/new',
    name: 'criarPessoa',
    component: CreatePessoa
  },
  {
    path: '/edit/:pessoaId',
    name: 'editarPessoa',
    component: EditPessoa,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
