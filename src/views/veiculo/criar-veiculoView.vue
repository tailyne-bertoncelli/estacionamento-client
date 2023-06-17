<template>
    <section class="container col-12">
        <h1 class="text-start my-4">Cadastrar veiculo</h1>
        <div class="row">
            <div class="col-3 text-start">
                <label for="exampleFormControlInput1" class="form-label">Placa</label>
                <input type="text" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
            <div class="col text-start">
                <label for="exampleFormControlInput1" class="form-label">Selecione o modelo</label>
                <select class="form-select" aria-label="Default select example">
                    <!-- <option selected>Open this select menu</option> -->
                    <option value="1">X6</option>
                    <option value="2">Velar</option>
                    <option value="3">Mustang</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Cor</label>
                <select class="form-select" aria-label="Default select example">
                    <!-- <option selected>Open this select menu</option> -->
                    <option value="1">Preto</option>
                    <option value="2">Cinza</option>
                    <option value="3">Branco</option>
                </select>
            </div>
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Tipo</label>
                <select class="form-select" aria-label="Default select example">
                    <!-- <option selected>Open this select menu</option> -->
                    <option value="1">Carro</option>
                    <option value="2">Van</option>
                    <option value="3">Moto</option>
                </select>
            </div>
            <div class="col-4 text-start">
                <label for="exampleFormControlInput1" class="form-label">Ano</label>
                <input type="number" class="form-control mb-3" id="exampleFormControlInput1">
            </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
            <button type="button" class="btn btn-outline-secondary me-3">Cancelar</button>
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

</script>