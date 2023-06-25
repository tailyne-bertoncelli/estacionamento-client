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
        path: '/marca/formulario',
        name: 'marca-formulario-view',
        component: () => import('../views/marca/criar-marcaView.vue'),
        children: [
            {
                path: '/marca/formulario',
                name: 'marca-formulario-editar-view',
                component: () => import('../views/marca/criar-marcaView.vue')
            },
            {
                path: '/marca/formulario',
                name: 'marca-formulario-excluir-view',
                component: () => import('../views/marca/criar-marcaView.vue')
            },
            {
                path: '/marca/formulario',
                name: 'marca-formulario-ver-view',
                component: () => import('../views/marca/criar-marcaView.vue')
            }
        ]
    },

    {
        path: '/lista-condutores',
        name: 'ListarCondutores',
        component: () => import('../views/condutor/condutor-listView.vue')
    },
    {
        path: '/condutor/formulario',
        name: 'condutor-formulario-view',
        component: () => import('../views/condutor/criar-condutorView.vue'),
        children: [
            {
                path: '/condutor/formulario',
                name: 'condutor-formulario-editar-view',
                component: ()=> import('../views/condutor/criar-condutorView.vue')
            },
            {
                path: '/condutor/formulario',
                name: 'condutor-formulario-excluir-view',
                component: ()=> import('../views/condutor/criar-condutorView.vue')
            },
            {
                path : '/condutor/formulario',
                name : 'condutor-formulario-ver-view',
                component: () => import('../views/condutor/criar-condutorView.vue') 
            }
        ]
    },
    
    {
        path: '/lista-configuracoes',
        name: 'ListarConfiguracoes',
        component: () => import('../views/configuracao/configuracao-listView.vue')
    },
    {
        path: '/configuracao/formulario',
        name: 'CriarConfiguracao',
        component: () => import('../views/configuracao/criar-configuracaoView.vue'),
        children : [
            {
                path : '/configuracao/formulario',
                name : 'configuracao-formulario-editar-view', 
                component: () => import('../views/configuracao/criar-configuracaoView.vue')
            },
            {
                path : '/configuracao/formulario',
                name : 'configuracao-formulario-excluir-view', 
                component: () => import('../views/configuracao/criar-configuracaoView.vue')
            },
            {
                path : '/configuracao/formulario',
                name : 'configuracao-formulario-ver-view', 
                component: () => import('../views/configuracao/criar-configuracaoView.vue')
            },
        ]
    },
    {
        path: '/lista-modelos',
        name: 'ListarModelos',
        component: () => import('../views/modelo/modelo-listView.vue')
    },
    {
        path: '/modelo/formulario',
        name: 'modelo-formulario-view',
        component: () => import('../views/modelo/criar-modeloView.vue'),
        children : [
            {
                path : '/modelo/formulario',
                name : 'modelo-formulario-editar-view', 
                component: () => import('../views/modelo/criar-modeloView.vue')
            },
            {
                path : '/modelo/formulario',
                name : 'modelo-formulario-excluir-view', 
                component: () => import('../views/modelo/criar-modeloView.vue')
            },
            {
                path : '/modelo/formulario',
                name : 'modelo-formulario-ver-view', 
                component: () => import('../views/modelo/criar-modeloView.vue')
            },
        ]
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
        path: '/lista-veiculos',
        name: 'ListarVeiculos',
        component: () => import('../views/veiculo/veiculo-listView.vue')
    },
    {
        path: '/veiculo/formulario',
        name: 'veiculo-formulario-view',
        component: () => import('../views/veiculo/criar-veiculoView.vue'),
        children: [
            {
                path: '/veiculo/formulario',
                name: 'veiculo-formulario-editar-view',
                component: ()=> import ('../views/veiculo/criar-veiculoView.vue')
            },
            {
                path: '/veiculo/formulario',
                name: 'veiculo-formulario-excluir-view',
                component: () => import ('../views/veiculo/criar-veiculoView.vue')
            },
            {
                path: '/veiculo/formulario',
                name: 'veiculo-formulario-ver-view',
                component: () => import ('../views/veiculo/criar-veiculoView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
