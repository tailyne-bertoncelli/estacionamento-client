<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <h1 class="text-start m-0">Configurações</h1>
            </div>
            <router-link to="/configuracao/formulario" class="col d-flex align-items-center justify-content-end" style="text-decoration: none;">
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
                    <th scope="col" class="col-1">V. Hora</th>
                    <th scope="col" class="col-1">V. minuto</th>
                    <th scope="col" class="col-2">Abertura</th>
                    <th scope="col" class="col-2">Fechamento</th>
                    <th scope="col" class="col-1">Tempo para desconto</th>
                    <th scope="col" class="col-1">Tempo de desconto</th>
                    <th scope="col" class="col-1">Gerar desconto</th>
                    <th scope="col" class="col-2">Opções</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="config in configuracaoList">
                    <th scope="row">{{ config.id }}</th>
                    <td>R$ {{ config.valorHora }}</td>
                    <td>R$ {{ config.valorMinutoMulta }}</td>
                    <td>{{ config.inicioExpediente }}</td>
                    <td>{{ config.fimExpediente }}</td>
                    <td>{{ config.tempoParaDesconto }}</td>
                    <td>{{ config.tempoDeDesconto }}</td>
                    <td>{{ config.gerarDesconto }}</td>
                    <td>
                        <router-link :to="{name: 'configuracao-formulario-editar-view', query:{id: config.id, form: 'editar'} }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square mx-2" viewBox="0 0 16 16" color="black">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </router-link>
                        <router-link :to="{name: 'configuracao-formulario-ver-view', query: {id: config.id, form: 'ver'}}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-text-left mx-2" viewBox="0 0 16 16" color="black">
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
import ConfiguracaoClient  from '@/client/configuracao.client';
import { Configuracao } from '@/model/configuracao';

export default defineComponent({
    name: 'ConfiguracaoLista',
    data() {
        return {
            configuracaoList: new Array<Configuracao>()
        }
    },
    mounted() {
        this.findAll();
    },
    methods: {

        findAll() {
            ConfiguracaoClient.listAll()
                .then(sucess => {
                    this.configuracaoList = sucess
                    console.log(this.configuracaoList)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});

</script>