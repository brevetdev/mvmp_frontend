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
.doscolumn_container {
  height: 100vw;
    padding: 40px 50px;
    display: flex;
    width: auto;
    flex-direction: row;
    background-color: #2c2327;
    &__item {
      display: flex;
      width: 60%;
      &.main_column {
        width: 38%;
      }
      &--izquierda {
        width: 100%;
        margin-left: 2em;
        flex-direction: column;
        padding: 0em 3em;
        h1 {
          font-family: "Libre Franklin", sans-serif;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 3px;
          font-size: 22px;
          line-height: 1.6em;
          color: #01b5f4;
        }
        p {
              font-family: 'Libre Franklin', sans-serif;
              text-transform: uppercase;
              font-weight: 600;
              letter-spacing: 1.5px;
              font-size: 14px;
              line-height: 1.6em;
              background-image: url("../assets/bgTextPrueba.png");
              background-size: cover;
              -webkit-background-clip: text;
              color: transparent;
                
        }
      }
      &--derecha {
      flex-direction: column;
      width: 90%;
      margin-left: .5em;
      margin-top: 2.5em;
          .html_render {
           /deep/ h3 {
        font-family: 'Libre Franklin', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 1.6em;
        color: #fff;
        font-weight: 600;
        margin: 20px 0;
          }
          /deep/ p{
                margin-top: 0;
                margin-bottom: 1rem;
                font-family: 'Ibarra Real Nova';
                font-size: 16px;
                letter-spacing: 1px;
                margin: 0;
                color: #d1d1d1;
          }
        }
        .container_images {
          display: flex;
          justify-content: space-between;
          margin: 2em 0em;
          &__logos {
              height: 45px;
          }
        }
     /*    .logosCreditos{
         
          margin: 0 20px 20px 0;
        } */

      }
    }

  }

</style>
