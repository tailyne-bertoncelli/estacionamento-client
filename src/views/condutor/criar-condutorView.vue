<template>
    <section class="container col-12">
        <h1 class="text-start my-4">Cadastrar condutor</h1>
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
                <label for="exampleFormControlInput1" class="form-label">Nome Completo</label>
                <input type="text" v-model="condutor.nome" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled"
                    class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="row">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">CPF</label>
                <input type="text" v-model="condutor.cpf" :disabled="form === 'excluir' || form === 'ver' ? '' : disabled"
                    class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Telefone</label>
                <input type="text" v-model="condutor.telefone"
                    :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3"
                    id="exampleFormControlInput1">
            </div>
        </div>
        <div class="row">
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Tempo pago</label>
                <input type="number" v-model="condutor.tempoPagoHora"
                    :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3"
                    id="exampleFormControlInput1" readonly>
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Tempo desconto</label>
                <input type="number" v-model="condutor.tempoDesconto"
                    :disabled="form === 'excluir' || form === 'ver' ? '' : disabled" class="form-control mb-3"
                    id="exampleFormControlInput1" readonly>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <router-link to="/lista-condutores">
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
            <router-link to="/lista-condutores">
                <button v-if="form === 'ver'" type="button" class="btn btn-secondary" @click="findById(condutor.id)">
                    Voltar
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import condutorClient from '@/client/condutor.client';
import { Condutor } from '@/model/condutor';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CondutorFormulario',
    data() {
        return {
            condutor: new Condutor(),
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
            condutorClient.cadastrar(this.condutor)
                .then(sucess => {
                    this.condutor = new Condutor()

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
            condutorClient.findById(id)
                .then(sucess => {
                    this.condutor = sucess
                })
                .catch(error => {
                    this.mensagem.ativo = true;
                    this.mensagem.mensagem = error;
                    this.mensagem.titulo = "Error. ";
                    this.mensagem.css = "alert alert-danger alert-dismissible fade show";
                });
        },
        onClickEditar() {
            condutorClient.altera(this.condutor.id, this.condutor)
                .then(success => {
                    this.condutor = new Condutor()

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
            condutorClient.deleta(this.condutor.id)
                .then(sucess => {
                    this.condutor = new Condutor()

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
