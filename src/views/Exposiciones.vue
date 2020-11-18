<template>
  <div class="expo_container">
    <full-page :options="options" id="fullpage" v-if="isLoaded">
      <div v-for="(data, index) in mainData" :key="index" class="section" v-bind:id="'section'+index">

        <div  v-if="data.seccionPrincipal" >
          <div class="introduccion">  
            <div id="text">
                <h1>{{data.tituloSeccion}}</h1>
                <p class="subtitle">{{data.subtituloSeccion}}</p>
            </div>
        </div>
          <div id="page_Animation" class="caqueta">
            <div class="capa _1 " style="animation-duration:3s;animation-delay:0.5s;" v-bind:style="{ 'background-image': 'url('+imgFondo+')'}"></div>
            <div class="capa _2 " style="animation-duration:3s;animation-delay:1s;"  v-bind:style="{ 'background-image': 'url('+imgFondo1+')'}"  ></div>
            <div class="capa _3 " style="animation-duration:3s;animation-delay:1.5s;" v-bind:style="{ 'background-image': 'url('+imgFondo2+')'}" ></div>
            <div class="capa _4 " style="animation-duration:3s;animation-delay:2s;" v-bind:style="{ 'background-image': 'url('+imgFondo3+')'}" ></div>
            <div class="capa _5 " style="animation-duration:3s;animation-delay:3s;" v-bind:style="{ 'background-image': 'url('+imgFondo4+')'}" ></div>
          </div>
        </div>


        <div v-else>
          <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vel rerum
          quae officiis possimus magni temporibus. Nihil corporis id voluptas
          dicta necessitatibus sint, in reprehenderit cumque a dolor minima
          quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Delectus molestiae pariatur expedita, earum repellat id sapiente modi
          ea praesentium dolorum officiis ab non architecto tempore autem,
          tempora ipsum distinctio maxime! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Numquam dicta, suscipit perferendis
          accusamus, accusantium eius commodi fuga saepe consectetur totam vero
          ex explicabo consequuntur ratione. Dicta velit reprehenderit ipsam
          aliquam.
          </p>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import axios from "axios";
import VueFullPage from 'vue-fullpage.js'

export default {
  name: "Exposicion",
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
      isLoaded: false,
      mainData: [],
      apiUrl: process.env.API,
      imgFondo: '',
      imgFondo1: '',
      imgFondo2: '',
      imgFondo3: '',
      options: {
            licenseKey: '4%2M$#W?x0',
            navigation: true,
             anchors: ['section0', 'section1', 'section3', 'section4', 'section5', 'section6', 'section7','section8','section9','section10']
      } 
    };
  },
  methods: {
    parseoHtml(msg) {
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      return converter.makeHtml(msg);
    },
    traerInfo(nombreRuta) {
      let url2Col = process.env.API + "/exposicines";
      axios.get(url2Col).then((response) => {
        for (let i = 0; i < response.data.paginasExposiciones.length; i++) {
          if (
            response.data.paginasExposiciones[i].nombrePagina === nombreRuta
          ) {
            this.mainData = response.data.paginasExposiciones[i].agregarSeccion;
            console.log(response.data.paginasExposiciones[i].agregarSeccion[i].seccionPrincipal);
            if(response.data.paginasExposiciones[i].agregarSeccion[i].seccionPrincipal){
              this.imgFondo = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[i].imagenesRecurso_1.url;
              this.imgFondo1 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[i].imagenesRecurso_2.url;
              this.imgFondo2 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[i].imagenesRecurso_3.url;
              this.imgFondo3 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[i].imagenesRecurso_4.url;
            }
            this.isLoaded = true;
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
.expo_container {
  
    .introduccion {
    display: flex;
    position: absolute;
    z-index: 1;
    align-items: center;
    width: 100vw;
    height: 100vh;
    .text{
      padding: 3em;
      h1{
        font-size: 300;
        color: #fff;
        font-family: 'Ibarra Real Nova', serif;
      }
    }
}  
    div#page_Animation {
      width: 100vw;
      height: 100vh;
      display: block;
      position: relative;
      display: flex;
      justify-content: center;
      flex-flow: column;
      z-index: 0;
      &.caqueta {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        .capa {
          background-position: bottom;
          height: 100vh;
          width: 100vw;
          position: absolute;
          z-index: 2;
          &._1 {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
          &._2 {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
          &._3 {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
          &._4 {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
          &._5 {
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      }
    }
    
}
</style>
