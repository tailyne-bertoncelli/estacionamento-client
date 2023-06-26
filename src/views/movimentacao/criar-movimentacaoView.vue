<template>
    <section class="container col-12">
        <h1 class="text-start my-4">Cadastrar movimentação</h1>
        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Selecione o condutor:</label>
                <select class="form-select" aria-label="Default select example" v-model="movimentacao.condutor" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" >
                    <option v-for="itemCondutor in condutorList" :value="itemCondutor" :key="itemCondutor.id" selected>{{ itemCondutor.nome }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Selecione o veiculo:</label>
                <select class="form-select" v-model="movimentacao.veiculo" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" aria-label="Default select example">
                    <option v-for="itemVeiculo in veiculoAtivos" :key="itemVeiculo.id" :value="itemVeiculo">{{ itemVeiculo.modelo.nome }} - {{ itemVeiculo.cor }} - {{ itemVeiculo.ano }}</option>
                </select>
            </div>
        </div>

        <div class="d-flex flex-row justify-content-end">
            <router-link to="/movimentacoes-ativa">
                <button type="button" class="btn btn-outline-secondary me-3">Cancelar</button>
            </router-link>
            <button type="button" class="btn btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check-square" viewBox="0 0 16 16">
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path
                        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                </svg>
                Salvar
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MovimentacaoClient from '@/client/movimentacao.client';
import { Movimentacao } from '@/model/movimentacao';

import CondutorClient from '@/client/condutor.client';
import { Condutor } from '@/model/condutor';

import VeiculoClient from '@/client/veiculo.client';
import { Veiculo } from '@/model/veiculo';

export default defineComponent({
    name: 'MovimentacaoFormulario',
    data() {
        return {
            movimentacao: new Movimentacao(),
            condutorList: [] as Condutor[],
            veiculoList: [] as Veiculo[],
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
        },
        condutoresAtivos(): Condutor[]{
            return this.condutorList.filter((itemCondutor: Condutor) => itemCondutor.ativo)
        },
        veiculoAtivos(): Veiculo[]{
            return this.veiculoList.filter((itemVeiculo: Veiculo) => itemVeiculo.ativo)
        }
    },
    mounted() {
        if (this.id !== undefined) {
            this.findById(Number(this.id));
        }
        this.findAllCondutor();
        this.findAllVeiculo();
    },
    methods: {
        findAllCondutor() {
            CondutorClient.listAll()
                .then(sucess => {
                    this.condutorList = sucess
                })
                .catch(error => {
                    console.log(error);
                });
        },
        findAllVeiculo() {
            VeiculoClient.listAll()
                .then(sucess => {
                    this.veiculoList = sucess
                })
                .catch(error => {
                    console.log(error);
                });
        },

        onClickCadastrar() {
            MovimentacaoClient.cadastra(this.movimentacao)
                .then(sucess => {
                    this.movimentacao = new Movimentacao()

                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = sucess;
                    this.mensagem.titulo = "Parabens. ";
                    this.mensagem.css = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
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
        onClickEditar() {
            MovimentacaoClient.altera(this.movimentacao.id, this.movimentacao)
                .then(success => {
                    this.movimentacao = new Movimentacao()

                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = success;
                    this.mensagem.titulo = "Parabens. ";
                    this.mensagem.css = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickExcluir() {
            MovimentacaoClient.deleta(this.movimentacao.id)
                .then(sucess => {
                    this.movimentacao = new Movimentacao()

                    this.$router.push({ name: 'marca-lista-view' });
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        }
    }
});
</script>
