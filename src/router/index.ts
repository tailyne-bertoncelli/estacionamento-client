import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/lista-marcas',
    name: 'ListarMarcas',
    component: () => import('../views/marca/marca-listVue.vue')
  },
  {
    path: '/criar-marca',
    name: 'CriarMarca',
    component: () => import('../views/marca/criar-marcaView.vue')
  },
  {
    path: '/editar-marca',
    name: 'EditarMarca',
    component: () => import('../views/marca/editar-marcaView.vue')
  },
  {
    path: '/lista-condutores',
    name: 'ListarCondutores',
    component: () => import('../views/condutor/condutor-listView.vue')
  },
  {
    path: '/criar-condutor',
    name: 'CriarCondutor',
    component: () => import('../views/condutor/criar-condutorView.vue')
  },
  {
    path: '/editar-condutor',
    name: 'EditarCondutor',
    component: () => import('../views/condutor/editar-condutorView.vue')
  },
  {
    path: '/lista-configuracoes',
    name: 'ListarConfiguracoes',
    component: () => import('../views/configuracao/configuracao-listView.vue')
  },
  {
    path: '/criar-configuracao',
    name: 'CriarConfiguracao',
    component: () => import('../views/configuracao/criar-configuracaoView.vue')
  },
  {
    path: '/editar-configuracao',
    name: 'EditarConfiguracao',
    component: () => import('../views/configuracao/editar-configuracaoView.vue')
  },
  {
    path: '/lista-modelos',
    name: 'ListarModelos',
    component: () => import('../views/modelo/modelo-listView.vue')
  },
  {
    path: '/criar-modelo',
    name: 'CriarModelo',
    component: () => import('../views/modelo/criar-modeloView.vue')
  },
  {
    path: '/editar-modelo',
    name: 'EditarModelo',
    component: () => import('../views/modelo/editar-modeloView.vue')
  },
  {
    path: '/lista-movimentacoes',
    name: 'ListarMovimentacoes',
    component: () => import('../views/movimentacao/movimentacao-listView.vue')
  },
  {
    path: '/criar-movimentacao',
    name: 'CriarMovimentacao',
    component: () => import('../views/movimentacao/criar-movimentacaoView.vue')
  },
  {
    path: '/editar-movimentacao',
    name: 'EditarMovimentacao',
    component: () => import('../views/movimentacao/editar-movimentacaoView.vue')
  },
  {
    path: '/lista-veiculos',
    name: 'ListarVeiculos',
    component: () => import('../views/veiculo/veiculo-listView.vue')
  },
  {
    path: '/criar-veiculo',
    name: 'CriarVeiculo',
    component: () => import('../views/veiculo/criar-veiculoView.vue')
  },
  {
    path: '/editar-veiculo',
    name: 'EditarVeiculo',
    component: () => import('../views/veiculo/editar-veiculoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
