<template>
    <section class="container">
        <h1 class="text-start my-4">Cadastrar marca</h1>
        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column align-items-start mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nome da marca</label>
            <input type="text" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control" v-model="marca.nome"
                id="exampleFormControlInput1">
        </div>

        <div class="d-flex flex-row justify-content-end">
            <router-link to="/lista-marcas">
                <button type="button" v-if="form != 'ver'" class="btn btn-outline-secondary me-3">Cancelar</button>
            </router-link>
            <button type="button" class="btn btn-success" v-if="form === undefined" @click="onClickCadastrar()">
                Salvar
            </button>
            <button v-if="form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
                Editar
            </button>
            <button v-if="form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">
                Excluir
            </button>
            <router-link to="/lista-marcas">
                <button v-if="form === 'ver'" type="button" class="btn btn-secondary" @click="findById(marca.id)">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>
  
<script lang="ts">

import MarcaClient from '@/client/marca.client';
import { Marca } from '@/model/marca';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MarcaFormulario',
    data() {
        return {
            marca: new Marca(),
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
            MarcaClient.cadastrar(this.marca)
                .then(sucess => {
                    this.marca = new Marca()

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
            MarcaClient.findById(id)
                .then(sucess => {
                    this.marca = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error.data;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickEditar() {
            MarcaClient.altera(this.marca.id, this.marca)
                .then(success => {
                    this.marca = new Marca()

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
        },
        onClickExcluir() {
            MarcaClient.deleta(this.marca.id)
                .then(sucess => {
                    this.marca = new Marca()

                    this.$router.push({ name: 'marca-lista-view' });
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