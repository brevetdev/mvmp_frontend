<template>
  <div class="expo_container">
    <full-page :options="options" id="fullpage" v-if="isLoaded">
      <div v-for="(data, index) in mainData" :key="index" class="section">
        <div v-if="data.seccionPrincipal">
          <div class="exposicion_introduccion">
            <div class="exposicion_texto animated animated-slow fadeInUp" style="animation-duration:3s;animation-delay:2s;">
              <h1 class="exposicion_texto__titulo">{{ data.tituloSeccion }}</h1>
              <p class="exposicion_texto__subtitulo">{{ data.subtituloSeccion }}</p>
            </div>
          </div>
          <div class="btn_exposicion--center">
            <a href="#2" class="btn_exposicion">
              <span>{{data.textoBoton}}</span>
              <svg
                aria-hidden="false"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-down"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="btn_exposicion__svg fa-chevron-down fa-w-14 fa-2x"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                  class=""
                ></path>
              </svg>
            </a>
          </div>
          <div class="page_animation">
            <div class="page_animation__capa page_animation__capa_1 animated fadeIn" style="animation-duration: 3s; animation-delay: 0.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo + ')' }"></div>
            <div class="page_animation__capa page_animation__capa_2 animated fadeIn" style="animation-duration: 3s; animation-delay: 1s" v-bind:style="{ 'background-image': 'url(' + imgFondo1 + ')' }"></div>
            <div class="page_animation__capa page_animation__capa_3 animated fadeIn" style="animation-duration: 3s; animation-delay: 1.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo2 + ')' }" ></div>
            <div class="page_animation__capa page_animation__capa_4" style="animation-duration: 3s; animation-delay: 2s"  v-bind:style="{ 'background-image': 'url(' + imgFondo3 + ')' }"></div>
          </div>
        </div>

        <div v-else>
          <div class="ComponentBg">
            <div class="ComponentBg_Container">
              
                <div class="ComponentBg_Container--lazyloaded" v-bind:style="{'background-image': 'url(' + bgSecondary[index] + ')' }"></div>
              </div>
              
              
            <div class="TextWrapper">
              <h2
                class="TextComponent TextComponent--left animated animated-slow fadeInUp"
                style="animation-delay: 0.75s"
              >
                {{ data.descripcion }}
              </h2>
            </div>
            <div class="btn">
              <a
                id="btn_2"
                class="ButtonCta ButtonCta--icon ButtonComponent--historia"
                ><i class="zmdi zmdi-play-circle">{{ data.textoBoton }}</i></a
              >
            </div>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import axios from "axios";
import VueFullPage from "vue-fullpage.js";

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
      imgFondo: "",
      imgFondo1: "",
      imgFondo2: "",
      imgFondo3: "",
      isImg: false,
      isVdo: false,
      bgSecondary: [],
      options: {
        licenseKey: "4%2M$#W?x0",
        navigation: true
      },
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

          //VALIDAR LA RUTA CON LA PÁGINA
          if (response.data.paginasExposiciones[i].nombrePagina === nombreRuta) {
                  this.mainData = response.data.paginasExposiciones[i].agregarSeccion;

                  console.log( response.data.paginasExposiciones[i].agregarSeccion[i].seccionPrincipal );
                  console.log("index",i);
                  //SECCIONES
                  for (let j = 0; j < response.data.paginasExposiciones[i].agregarSeccion.length; j++) {
                    //VALIDAR SECCION PRINCIPAL
                          if (response.data.paginasExposiciones[i].agregarSeccion[j].seccionPrincipal) {
                          this.imgFondo =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_1.url === undefined ?  'empty':  this.imgFondo = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_1.url;
                          this.imgFondo1 =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_2.url === undefined ?  'empty':  this.imgFondo1 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_2.url;
                          this.imgFondo2 =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_3.url === undefined ?  'empty':  this.imgFondo2 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_3.url;
                          this.imgFondo3 = response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_4.url === undefined ?  'empty':  this.imgFondo3 = this.apiUrl + response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_4.url;
                        }
                        //VALIDAR SECCIONES SECUNDARIAS
                                if (response.data.paginasExposiciones[i].agregarSeccion[j].seccionPrincipal == undefined) {
                                  //VALIDAR SI ES IMAGEN O VIDEO EL FONDO
                                          if(response.data.paginasExposiciones[i].agregarSeccion[j].imagenFondo !== null && response.data.paginasExposiciones[i].agregarSeccion[j].imagenFondo !== undefined){
                                            this.bgSecondary[j] = this.apiUrl+response.data.paginasExposiciones[i].agregarSeccion[j].imagenFondo.url;
                                            this.isImg = true;
                                          }else if(response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo !== null && response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo !== undefined){
                                            this.bgSecondary[j] = this.apiUrl+response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo.url;
                                            this.isVdo = true;
                                          }          
                                }
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
    &.text {
      padding: 3em;
      h1 {
        font-size: 300;
        color: #fff;
        font-family: "Ibarra Real Nova", serif;
      }
    }
  }
  .btn_exposicion--center {
    position: absolute;
    text-align: center;
    top: 90vh;
    z-index: 1;
    width: 100%;
    svg {
      width: 20px;
      margin-top: 20px;
    }
    a {
      color: #fff;
      font-family: "Libre Franklin", sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 12px;
      text-align: center;
      display: block;
      margin: auto;
      letter-spacing: 0.7px;
      span {
        display: block;
      }
    }
    &::after {
      color: #fff;
      position: relative;
    }
  }
  .page_animation {
    width: 100vw;
    height: 100vh;
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: column;
    z-index: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
      .page_animation {
      &__capa {
        background-position: bottom;
        height: 100vh;
        width: 100vw;
        position: absolute;
        z-index: 2;
        &_1 {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      }
    
  }
  .exposicion_introduccion {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    .exposicion_texto {
      margin-left: 15vw;
      &__titulo {
        font-family: 'Ibarra Real Nova', serif;
        font-size: 5em;
        color: rgb(255, 255, 255);
        margin: 0px;
      }
      &__subtitulo {
          font-family: 'Libre Franklin', sans-serif;
          font-size: 3em;
          color: rgb(255, 255, 255);
          margin: 0.2em 0 0 0;
      }
    }
  }
  .texto_exposiciones {
    &__parrafo {
      p {
        font-size: 1.87rem;
        line-height: 48px;
        left: 0;
        margin-left: 100px;
        padding-right: 250px;
        z-index: 1;
        margin-bottom: 0;
        font-family: 'Ibarra Real Nova';
      }
    }
  }
  .ComponentBg {
    height: 100vh;
    display: flex;
    &_Container {
      background-position: center;
      background-color: #2c2327;
      height: 100%;

      &--lazyloaded {
        opacity: 0.7;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        position: absolute;
      }
    }
  }
}
</style>
