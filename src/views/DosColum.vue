<template>
  <div class="doscolumn_container">
    <div v-for="(data, index) in dataPag" :key="index" class="doscolumn_container__item" v-bind:class="{ main_column : index==0 }">
      <div v-if="index == 0" class="doscolumn_container__item--izquierda">
        <h1>{{ data.titulo }}</h1>
           <p>
          {{ data.descripcion }}
        </p>
       
      </div>
      <div v-if="index == 1" class="doscolumn_container__item--derecha">
        <div v-html="parseoHtml(data.descripcion) " class="html_render"></div>
        <div v-if="data.imagenPaginaUno != null && data.imagenPaginaDos != null && data.imagenPaginaTres != null" class="container_images">
          <img v-bind:src="apiUrl+data.imagenPaginaUno.url" class="container_images__logos">
          <img v-bind:src="apiUrl+data.imagenPaginaDos.url" class="container_images__logos">
          <img v-bind:src="apiUrl+data.imagenPaginaTres.url" class="container_images__logos">
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DosColum",
  //Ir a otra cargar otro componente dentro del mismo.
  beforeRouteUpdate(to, from, next) {
    this.traerInfo(to.params.nombre);
    next();
  },
  mounted() {
    this.nameRoute = this.$route.params.nombre;
    console.log(this.nameRoute);
    this.traerInfo(this.nameRoute);
  },
  data() {
    return {
      dataPag: [],
      apiUrl:process.env.API
    };
  },
  methods: {
    parseoHtml(msg) {
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      return converter.makeHtml(msg);
    },
    traerInfo(nombreRuta) {
      let url2Col = process.env.API + "/paginas-2-colum";
      axios.get(url2Col).then((response) => {
        for (let i = 0; i < response.data.Paginas.length; i++) {
          if (response.data.Paginas[i].NombrePagina === nombreRuta) {
            this.dataPag = response.data.Paginas[i].contenidoPagina2Colum; 
          } else {
            continue;
          }
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../sass/main";
@import "../sass/layouts/dosColumnas";
</style>
