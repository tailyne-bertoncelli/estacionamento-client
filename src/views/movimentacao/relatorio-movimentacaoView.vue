<template>
    <section class="container col-12">
        <h1 class="text-center my-4">Detalhes da movimentação</h1>
        <div class="row mb-3">
            <ul class="list-group text-start col-6">
                <li class="list-group-item text-center"><strong>DADOS DO VEICULO</strong></li>
                <li class="list-group-item"><strong>PLACA:</strong> {{ movimentacao.veiculo.placa }}</li>
                <li class="list-group-item"><strong>MODELO:</strong> {{ movimentacao.veiculo.modelo.nome }}</li>
                <li class="list-group-item"><strong>TIPO:</strong> {{ movimentacao.veiculo.tipo }}</li>
                <li class="list-group-item"><strong>COR:</strong> {{ movimentacao.veiculo.cor }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>ANO:</strong> {{ movimentacao.veiculo.ano }}</li>
            </ul>
            <ul class="list-group text-start col-6">
                <li class="list-group-item text-center"><strong>DADOS DO CONDUTOR</strong></li>
                <li class="list-group-item"><strong>NOME: </strong> {{ movimentacao.condutor.nome }}</li>
                <li class="list-group-item"><strong>TELEFONE: </strong>{{ movimentacao.condutor.telefone }}</li>
                <li class="list-group-item"><strong>CPF: </strong>{{ movimentacao.condutor.cpf }}</li>
                <li class="list-group-item"><strong>HORAS PAGAS: </strong>{{ movimentacao.condutor.tempoPagoHora }}</li>
            </ul>
        </div>
        <div class="row text-end mb-3">
            <ul class="list-group text-start">
                <li class="list-group-item text-center"><strong>DADOS DA MOVIMENTAÇÃO</strong></li>
                <li class="list-group-item"><strong>ENTRADA: </strong>{{ movimentacao.entrada }}</li>
                <li class="list-group-item"><strong>SAÍDA: </strong>{{ movimentacao.saida }}</li>
                <li class="list-group-item"><strong>TEMPO DE PERMANÊNCIA : </strong>{{ movimentacao.tempoHoras }} horas e {{ movimentacao.tempoMinutos }} minutos</li>
                <li class="list-group-item"><strong>TEMPO DE MULTA: </strong>{{ movimentacao.tempoMulta }} minutos</li>
                <li class="list-group-item"><strong>VALOR HORAS: </strong> R$ {{ movimentacao.valorHora }}</li>
                <li class="list-group-item"><strong>VALOR MULTA: </strong> R$ {{ movimentacao.valorMulta }}</li>
                <li class="list-group-item"><strong>VALOR DESCONTO: </strong> R$ {{ movimentacao.valorDesconto }}</li>
                <li class="list-group-item"><strong>VALOR TOTAL: </strong> R$ {{ movimentacao.valorTotal }}</li>
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
