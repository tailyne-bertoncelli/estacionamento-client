<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <h1 class="text-start m-0">Movimentações finalizadas</h1>
            </div>
            <router-link to="/movimentacao/formulario" class="col d-flex align-items-center justify-content-end" style="text-decoration: none;">
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
                    <th scope="col" class="col-2">Entrada</th>
                    <th scope="col" class="col-2">Saída</th>
                    <th scope="col" class="col-3">Veiculo</th>
                    <th scope="col" class="col-3">Condutor</th>
                    <th scope="col" class="col-1">Ver mais</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="mov in movimentacaoList">
                    <th scope="row">{{ mov.id }}</th>
                    <td>{{ mov.entrada }}</td>
                    <td>{{ mov.saida }}</td>
                    <td>{{ mov.veiculo.modelo.nome }} - {{ mov.veiculo.ano }}</td>
                    <td>{{ mov.condutor.nome }}</td>
                    <td>
                        <router-link :to="{ name: 'relatorio-movimentacao-view', query: { id: mov.id, form: 'relatorio'}}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-text-left"
                                viewBox="0 0 16 16" color="black">
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
import MovimentacaoClient  from '@/client/movimentacao.client';
import { Movimentacao } from '@/model/movimentacao';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MovimentacaoLista',
    data() {
        return {
            movimentacaoList: new Array<Movimentacao>()
        }
    },
    mounted() {
        this.findAll();
    },
    methods: {

        findAll() {
            MovimentacaoClient.finalizadas()
                .then(sucess => {
                    this.movimentacaoList = sucess
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});



</script>