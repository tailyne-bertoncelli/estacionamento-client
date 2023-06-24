<template>
    <section class="container">
        <h1 class="text-start my-4">Cadastrar modelo</h1>
        <div v-if="mensagem.ativo" class="row">
            <div class="col-md-12 text-start">
                <div :class="mensagem.css" role="alert">
                    <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column align-items-start mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nome do modelo</label>
            <input type="text" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3" v-model="modelo.nome" id="exampleFormControlInput1">

            <label for="exampleFormControlInput1" class="form-label">Selecione a marca:</label>
            <select class="form-select" v-model="modelo.marca" aria-label="Default select example" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled">
                <option v-for="itemMarca in marcasAtivas" :key="itemMarca.id" :value="itemMarca" selected>{{ itemMarca.nome }}</option>
            </select>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <router-link to="/lista-modelos">
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
                <button v-if="form === 'ver'" type="button" class="btn btn-secondary" @click="findById(modelo.id)">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import modeloClient from '@/client/modelo.client';
import { Modelo } from '@/model/modelo';

import MarcaClient from '@/client/marca.client';
import { Marca } from '@/model/marca';

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModeloFormulario',
    data() {
        return {
            modelo: new Modelo(),
            marcaLista: [] as Marca[],
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
        marcasAtivas(): Marca[]{
            return this.marcaLista.filter((itemMarca: Marca) => itemMarca.ativo)
        }
    },
    mounted() {

        if (this.id !== undefined) {
            this.findById(Number(this.id));
        }
      
        this.findAll();

    },
    methods: {
        findAll() {
            MarcaClient.listAll()
                .then(sucess => {
                    this.marcaLista = sucess
                })
                .catch(error => {
                    console.log(error);
                });
        },

        onClickCadastrar() {
            modeloClient.cadastra(this.modelo)
                .then(sucess => {
                    this.modelo = new Modelo()

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
            modeloClient.findById(id)
                .then(sucess => {
                    this.modelo = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickEditar() {
            modeloClient.altera(this.modelo.id, this.modelo)
                .then(success => {
                    this.modelo = new Modelo()

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
            modeloClient.deleta(this.modelo.id)
                .then(sucess => {
                    this.modelo = new Modelo()

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
