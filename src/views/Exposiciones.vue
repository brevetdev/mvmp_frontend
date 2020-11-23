<template>
  <div class="expo_container">
    <div v-show="!this.isshowLateral" >
    <full-page :options="options" id="fullpage" ref="fullpage" v-if="isLoaded">
      <div v-for="(data, index) in mainData" :key="'main'+index" class="section" >
        <div v-if="data.seccionPrincipal" v-bind:style="{'background-image': 'url(' +apiUrl+data.imagenFondo.url +')' }">
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
          <div class="seccion_secu">
            <div class="seccion_secu_container">
              <div v-if="data.videoFondo !== undefined && data.videoFondo !== null">
                    <video class="seccion_secu_container__video" loop  data-autoplay data-keepplaying>
                            <source v-bind:src="apiUrl +bgSecondary[index].url" type="video/mp4">
                   </video>
              </div>
              <div class="seccion_secu_container__imagen" v-if="data.imagenFondo !== undefined && data.imagenFondo !== null" v-bind:style="{'background-image': 'url(' +apiUrl+data.imagenFondo.url +')' }">
              </div>
            <div class="seccion_secu_container__texto">
              <h2
                class="seccion_secu_container__texto--izquierda animated animated-slow fadeInUp"
                style="animation-delay: 0.75s"
              >
                {{ data.descripcion }}
              </h2>
            </div>
            <div class="seccion_secu_container__btn">
              <a class="btn_seccionsecu" @click.prevent="cambiarVista(''+data.id+'')">
                <i class="zmdi zmdi-play-circle btn_seccionsecu__icono"></i>
                {{ data.textoBoton }}
              </a>
            </div>
           </div>
          </div>
        </div>
      </div>
    </full-page>
    </div>
    <div v-show="this.isshowLateral" >
      
    <full-page :options="options" id="fpInterna" ref="fpInterna" v-if="iIsloaded">
     <div v-for="(data, index) of buttonTitle" :key="'lateral'+index" class="section" >
       {{data}}
      </div>
    </full-page>
    </div>
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
    this.traerInfo(this.nameRoute);
  },
  data() {
    return {
      iIsloaded: false,
      idLateral: 0,
      isLoaded: false,
      isshowLateral: false,
      mainData: [],
      api: undefined,
      lateralData: [],
      apiUrl: process.env.API,
      imgFondo: "",
      imgFondo1: "",
      imgFondo2: "",
      imgFondo3: "",
      buttonTitle: {},
      bgSecondary: [],
      options: {
        licenseKey: "4%2M$#W?x0",
        navigation: true,
        controlArrows: true,
        navigationPosition: 'right',
        onLeave: function () {console.log("he dejado esta seccion")}
      },
      options2: {
        licenseKey: "4%2M$#W?x0",
        navigation: true,
        controlArrows: true,
        navigationPosition: 'right',
        onLeave: function () {console.log("he dejado esta seccion")}
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
            
            //SECCIONES
            for (let j = 0; j < response.data.paginasExposiciones[i].agregarSeccion.length; j++) {
              console.log(response.data.paginasExposiciones[i]);
              
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
                  this.bgSecondary[j] = response.data.paginasExposiciones[i].agregarSeccion[j].imagenFondo;
                }
                if(response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo !== null && response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo !== undefined){
                  this.bgSecondary[j] = response.data.paginasExposiciones[i].agregarSeccion[j].videoFondo;
                }          
              }
         
            }
          this.isLoaded = true;
          //this.buildFullpage("#fullpage");
          } else {
            continue;
          }
        }
      });
    },
    buildFullpage(id) {
      this.$refs.fullpage.init();
    },
    cambiarVista(id) {
      this.idLateral = id;
      this.isshowLateral = true;
      for (let index = 0; index <  this.mainData.length; index++) {
        //console.log("MAIN DATA",this.mainData);
        if(this.mainData[index].seccion_laterale !== null && this.mainData[index].seccion_laterale !== undefined){
          if(this.mainData[index].id == this.idLateral) {
             this.lateralData = this.mainData[index].seccion_laterale.Internas;
              this.buttonTitle = [ this.mainData[index].textoBoton, this.lateralData];
              
                this.iIsloaded = true;
                fullpage_api.destroy('#fullpage');
                this.api = new fullpage(this.$refs.fpInterna, this.options2)
           } 
         }
      }
    }
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
  .seccion_secu {
    height: 100vh;
    display: flex;
    &_container {
      background-position: center;
      background-color: #2c2327;
      display: flex;
      align-items: center;
      &__video {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
      }
      &__imagen {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
      }
      &__texto {
        position: relative;
        width: 50%;
        display: flex;
         margin: 0 10vw;
        &--izquierda {
            font-family: 'Ibarra Real Nova';
            color: rgb(255, 255, 255);
            line-height: 48px;
            font-size: 1.87rem;
        }
      }
      &__btn {
         position: absolute;
         right: 15vw;
         cursor: pointer;
         margin-top: 6em;
        .btn_seccionsecu {
          z-index: 1;
          font-family: 'Libre Franklin', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 24px;
          border-radius: 10px;
          letter-spacing: 1px;
          border: transparent;
          position: absolute;
          bottom: 0;
          color: rgb(255, 255, 255);
          height: 115px;
          padding: 40px 0 0 20px;
          &__icono {
            background-image: url('../assets/img//flecha-derecha.svg');
            height: 40px;
            width: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            position: relative;
            display: block;
            transition: all .3s linear;
          }
        }
        &:hover {
          .btn_seccionsecu__icono {
            transform: translateX(10em);
          }
        }
      }
    }
  }
/*
  .seccion_lateral {
    height: 100vh;
    display: flex;
    &_container {
      background-position: center;
      background-color: #2c2327;
      display: flex;
      align-items: center;
      &__video {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
      }
      &__imagen {
        min-height: 100%;
        min-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
      }
      &__texto {
        position: relative;
        width: 50%;
        display: flex;
         margin: 0 10vw;
        &--izquierda {
            font-family: 'Ibarra Real Nova';
            color: rgb(255, 255, 255);
            line-height: 48px;
            font-size: 1.87rem;
        }
      }
      &__btn {
         position: absolute;
         right: 15vw;
         cursor: pointer;
         margin-top: 6em;
        .btn_seccionsecu {
          z-index: 1;
          font-family: 'Libre Franklin', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 24px;
          border-radius: 10px;
          letter-spacing: 1px;
          border: transparent;
          position: absolute;
          bottom: 0;
          color: rgb(255, 255, 255);
          height: 115px;
          padding: 40px 0 0 20px;
          &__icono {
            background-image: url('../assets/img//flecha-derecha.svg');
            height: 40px;
            width: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            position: relative;
            display: block;
            transition: all .3s linear;
          }
        }
        &:hover {
          .btn_seccionsecu__icono {
            transform: translateX(10em);
          }
        }
      }
    }
  }
*/
  #fp-nav ul li a span,
   .fp-slidesNav ul li a span {
    background: white !important;
  }
}
</style>
