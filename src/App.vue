<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Estacionamento Pedro</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                        <router-link class="nav-link" to="/lista-marcas">Marcas</router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Features</a> -->
                        <router-link class="nav-link" to="/lista-condutores">Condutores</router-link> 
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Pricing</a> -->
                        <router-link class="nav-link" to="/lista-modelos">Modelos</router-link> 
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Pricing</a> -->
                        <router-link class="nav-link" to="/lista-veiculos">Veiculos</router-link> 
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Pricing</a> -->
                        <router-link class="nav-link" to="/lista-configuracoes">Configurações</router-link> 
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Pricing</a> -->
                        <router-link class="nav-link" to="/lista-movimentacoes">Movimentações</router-link> 
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
