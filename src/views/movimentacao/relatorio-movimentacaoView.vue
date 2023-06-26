<template>
    <section class="container col-12">
        <h1 class="text-center my-4">Detalhes da movimentação</h1>
        <div class="row mb-3">
            <ul class="list-group text-start col-6">
                <li class="list-group-item">{{ movimentacao.entrada }}</li>
                <li class="list-group-item">{{ movimentacao.saida }}</li>
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
            </ul>
            <ul class="list-group text-start col-6">
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>
            </ul>
        </div>
        <div class="row text-end mb-3">
            <ul class="list-group text-center">
                <li class="list-group-item">An item</li>
            </ul>
        </div>

        <div class="d-flex flex-row justify-content-end">
            <router-link to="/movimentacoes-finalizadas">
                <button type="button" class="btn btn-secondary">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MovimentacaoClient from '@/client/movimentacao.client';
import { Movimentacao } from '@/model/movimentacao';

export default defineComponent({
    name: 'MovimentaçãoFormulario',
    data() {
        return {
            movimentacao: new Movimentacao(),
            mensagem: {
                ativo: false as boolean,
                titulo: "" as string,
                mensagem: "" as string,
                css: "" as string
            },
            disabled: false
        }
    },
    computed: {
        id() {
            return this.$route.query.id
        },
        form() {
            return this.$route.query.form
        }
    },
    mounted() {

        if (this.id !== undefined) {
            this.findById(Number(this.id));
        }


    },
    methods: {
        findById(id: number) {
            MovimentacaoClient.findById(id)
                .then(sucess => {
                    this.movimentacao = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        
    }
});

</script>
