<template>
    <section class="container col-12">
        <h1 class="text-start my-4">Cadastrar veiculo</h1>
        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3 text-start">
                <label for="exampleFormControlInput1" class="form-label">Placa</label>
                <input type="text" v-model="veiculo.placa" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Selecione o modelo</label>
                <select class="form-select" v-model="veiculo.modelo" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" aria-label="Default select example">
                    <option v-for="modelo in modeloLista" :key="modelo.id" :value="modelo" selected>{{ modelo.nome }}</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Cor</label>
                <select class="form-select" v-model="veiculo.cor" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" aria-label="Default select example">
                    <option v-for="cor in cores" :value="cor" :key="cor">{{ cor }}</option>
                </select>
            </div>
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Tipo</label>
                <select class="form-select" v-model="veiculo.tipo" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" aria-label="Default select example">
                    <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                </select>
            </div>
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Ano</label>
                <input type="number" v-model="veiculo.ano" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <router-link to="/lista-veiculos">
                <button type="button" v-if="form != 'ver'" class="btn btn-outline-secondary me-3">Cancelar</button>
            </router-link>
            <button v-if="form === undefined" type="button" class="btn btn-success" @click="onClickCadastrar()">
                Salvar
            </button>
            <button v-if="form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
                Editar
            </button>
            <button v-if="form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">
                Excluir
            </button>
            <router-link to="/lista-veiculos">
                <button v-if="form === 'ver'" type="button" class="btn btn-secondary" @click="findById(veiculo.id)">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import VeiculoClient from '@/client/veiculo.client'
import { Veiculo } from '@/model/veiculo';

import ModeloClient from '@/client/modelo.client'
import { Modelo } from '@/model/modelo';

import { Tipo } from '@/model/tipo';
import { Cor } from '@/model/cor';

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'VeiculoFormulario',
    data() {
        return {
            veiculo: new Veiculo(),
            modeloLista: [] as Modelo[],
            tipos: Tipo,
            cores: Cor,
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
        modelosAtivos(): Modelo[]{
            return this.modeloLista.filter((modelo: Modelo) => modelo.ativo)
        }
    },
    mounted() {

        if (this.id !== undefined) {
            this.findById(Number(this.id));
        }

        this.findAll();
    },
    methods: {

        onClickCadastrar() {
            VeiculoClient.cadastra(this.veiculo)
                .then(sucess => {
                    this.veiculo = new Veiculo()

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
            VeiculoClient.findById(id)
                .then(sucess => {
                    this.veiculo = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickEditar() {
            VeiculoClient.altera(this.veiculo.id, this.veiculo)
                .then(success => {
                    this.veiculo = new Veiculo()

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
            VeiculoClient.deleta(this.veiculo.id)
                .then(sucess => {
                    this.veiculo = new Veiculo()

                    this.$router.push({ name: 'marca-lista-view' });
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        findAll(){
            ModeloClient.listAll()
                .then(sucess => {
                    this.modeloLista = sucess 
                }).catch(error => {
                    console.log(error);
                });
        }
    }
})
</script>