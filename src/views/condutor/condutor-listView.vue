<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <h1 class="text-start m-0">Condutores</h1>
            </div>
            <router-link to="/condutor/formulario" class="col d-flex align-items-center justify-content-end" style="text-decoration: none;">
                <button type="button" class="btn btn-primary center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-plus-square mr-3" viewBox="0 0 16 16">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Cadastrar
                </button>
            </router-link>
        </div>
        <table class="table table-striped mt-4 col-12">
            <thead>
                <tr>
                    <th scope="col" class="col-1">ID</th>
                    <th scope="col" class="col-1">Ativo</th>
                    <th scope="col" class="col-3">Nome</th>
                    <th scope="col" class="col-2">Telefone</th>
                    <th scope="col" class="col-1">H. pagas</th>
                    <th scope="col" class="col-1">Editar</th>
                    <th scope="col" class="col-1">Deletar</th>
                    <th scope="col" class="col-1">Ver mais</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="condutor in condutorList" :key="condutor.id">
                    <th scope="row">{{ condutor.id }}</th>
                    <td>
                        <span v-if="condutor.ativo" class="badge text-bg-success"> Ativo </span>
                        <span v-if="!condutor.ativo" class="badge text-bg-danger"> Inativo </span>
                    </td>
                    <td>{{ condutor.nome }}</td>
                    <td>{{ condutor.telefone }}</td>
                    <td>{{ condutor.tempoPagoHora }}</td>
                    <td>
                        <router-link :to="{name: 'condutor-formulario-editar-view', query: {id: condutor.id, form: 'editar'}}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square" viewBox="0 0 16 16" color="black">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'condutor-formulario-excluir-view', query: {id: condutor.id, form: 'excluir'} }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3" viewBox="0 0 16 16" color="black">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'condutor-formulario-ver-view', query: {id: condutor.id, form: 'ver'}}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-text-left" viewBox="0 0 16 16" color="black">
                                <path fill-rule="evenodd"
                                    d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </router-link>
                    </td>
                </tr>
               
             </tbody>
        </table>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

import CondutorClient from '@/client/condutor.client';
import { Condutor } from '@/model/condutor';

export default defineComponent({
    name: 'CondutorLista',
    data(){
        return {
        condutorList: new Array<Condutor>()
        }
    },
    mounted() {
        this.findAll();
    },
    methods:{
        findAll(){
            CondutorClient.listAll()
            .then(sucess => {
                this.condutorList = sucess
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})
</script>