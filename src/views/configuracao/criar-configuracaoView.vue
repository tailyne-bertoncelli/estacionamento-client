<template>
    <section class="container col-12">
        <h1 class="text-start my-4">Cadastrar configuração</h1>
        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Inicio do expediente</label>
                <input type="text" v-model="config.inicioExpediente" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Fim do expediente</label>
                <input type="text" v-model="config.fimExpediente" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="row">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Valor Hora</label>
                <input type="text" v-model="config.valorHora" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Valor Minuto</label>
                <input type="text" v-model="config.valorMinutoMulta" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="row">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Tempo de desconto</label>
                <input type="text" v-model="config.tempoDeDesconto" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Tempo para desconto</label>
                <input type="text" v-model="config.tempoParaDesconto" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Gerar desconto</label>
                <div class="form-check form-switch m-0 text-center">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Vagas carro</label>
                <input type="text" v-model="config.vagasCarro" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Vagas moto</label>
                <input type="text" v-model="config.vagasMoto" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Vagas van</label>
                <input type="text" v-model="config.vagasVan" :disabled="form === 'ver' ? '' : disabled" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <router-link to="/lista-configuracoes">
                <button type="button" v-if="form != 'ver'" class="btn btn-outline-secondary me-3">Cancelar</button>
            </router-link>
            <button type="button" class="btn btn-success" v-if="form === undefined" @click="onClickCadastrar()">
                Salvar
            </button>
            <button v-if="form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
                Editar
            </button>
            <router-link to="/lista-configuracoes">
                <button v-if="form === 'ver'" type="button" class="btn btn-secondary" @click="findById(config.id)">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConfiguracaoClient from '@/client/configuracao.client';
import { Configuracao } from '@/model/configuracao';

export default defineComponent({
    name: 'ConfiguracaoFormulario',
    data() {
        return {
            config: new Configuracao(),
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

        onClickCadastrar() {
            ConfiguracaoClient.cadastra(this.config)
                .then(sucess => {
                    this.config = new Configuracao()

                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = sucess;
                    this.mensagem.titulo = "Parabens. ";
                    this.mensagem.css = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error.data;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        findById(id: number) {
            ConfiguracaoClient.findById(id)
                .then(sucess => {
                    this.config = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error.data;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickEditar() {
            ConfiguracaoClient.altera(this.config.id, this.config)
                .then(success => {
                    this.config = new Configuracao()

                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = success;
                    this.mensagem.titulo = "Parabens. ";
                    this.mensagem.css = "alert alert-success alert-dismissible fade show";
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error.data;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        }
    }
});

</script>
