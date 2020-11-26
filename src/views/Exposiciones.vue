<template>
  <div class="expo_container">
    <div class="overlay_inlateral" v-show="this.isshowLateral">
      <div class="image_overlayl" v-if="overlayimagen" v-bind:style="{'background-image': 'url(' + this.overlayrecursoUrl +')' }" ></div>
      <video v-if="!overlayimagen" v-bind:src="this.overlayrecursoUrl"></video>
    </div>
    <div class="seccion_principal__container" v-show="!this.isshowLateral">
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
              <a class="btn_seccionsecu" @click.prevent="cambiarVista(data.id, index)">
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
    <div v-bind:class="{ active: this.isshowLateral }" class="container__lateral">
      <a @click.prevent="cerrarbloque()"><i class="zmdi zmdi-play-circle lateralTitleIcon"></i></a>
      <div class="titleBtn" >
        <h2>{{buttonTitle}}</h2>        
      </div> 
      <div class="lateralTitleBg" v-bind:style="{'background-image': 'url(' +apiUrl+buttonTitleBg +')' }"></div>
    <full-page :options="options" id="fpInterna" ref="fpInterna" v-if="iIsloaded">
      <div v-for="(data, index) of lateralData" :key="'lateral'+index" class="section" >
        <div class="seccion_lateral interna">
          <div class="seccion_lateral_container">
            <div class="seccion_lateral_container__texto">
              {{data.descripcion}}
            </div> 
                <div v-if="data.videofondo !== undefined && data.videofondo !== null" class="seccion_lateral_container__video">
                    <video class="video_source" loop  data-autoplay data-keepplaying>
                            <source v-bind:src="apiUrl +data.videofondo.url" type="video/mp4">
                   </video>
              </div>
              <div class="seccion_lateral_container__imagen" v-if="data.imagenFondo !== undefined && data.imagenFondo !== null" v-bind:style="{'background-image': 'url(' +apiUrl+data.imagenFondo.url +')' }">
              </div>
         
          </div>
        </div>
       
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
      overlayimagen: false,
      overlayrecursoUrl: '',
      iIsloaded: false,
      idLateral: 0,
      isLoaded: false,
      isshowLateral: false,
      mainData: [],
      seccionActual: 0,
      api: undefined,
      lateralData: [],
      apiUrl: process.env.API,
      imgFondo: "",
      imgFondo1: "",
      imgFondo2: "",
      imgFondo3: "",
      buttonTitle: "",
      buttonTitleBg: "",
      bgSecondary: [],
      bgLateral: [],
      apif: undefined,
      options: {
        licenseKey: "4%2M$#W?x0",
        navigation: true,
        controlArrows: true,
        navigationPosition: 'right',
        onLeave: function () {}
      },
      options2: {
        licenseKey: "4%2M$#W?x0",
        navigation: true,
        controlArrows: true,
        navigationPosition: 'right',
        onLeave: function () {}
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
             // console.log(response.data.paginasExposiciones[i]);
              
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
    cerrarbloque() {
        this.isshowLateral = false;
        fullpage_api.destroy('#fpInterna');
        this.apif = new fullpage('#fullpage', this.options);
        this.seccionActual++;
        setTimeout(()=> {fullpage_api.silentMoveTo(this.seccionActual);}, 200)
        
    },
    cambiarVista(id, seccion) {
      this.seccionActual = seccion;
      if(this.mainData[seccion]["videoFondo"] !== undefined && this.mainData[seccion]["videoFondo"] !== null) {
        this.overlayimagen = false;
        this.overlayrecursoUrl = this.apiUrl+this.mainData[seccion].videoFondo.url;
      }
      if(this.mainData[seccion]["imagenFondo"] !== undefined && this.mainData[seccion]["imagenFondo"] !== null) {
        this.overlayimagen = true;
        this.overlayrecursoUrl = this.apiUrl+this.mainData[seccion].imagenFondo.url;
      }
      this.idLateral = id;
      this.isshowLateral = true;
      for (let index = 0; index <  this.mainData.length; index++) {
        //console.log("MAIN DATA",this.mainData);
        if(this.mainData[index].seccion_laterale !== null && this.mainData[index].seccion_laterale !== undefined){
          if(this.mainData[index].id == this.idLateral) {
             this.lateralData = this.mainData[index].seccion_laterale.Internas;
             this.buttonTitleBg = this.mainData[index].seccion_laterale.fondoTituto[0].url;
                this.buttonTitle = this.mainData[index].seccion_laterale.botonTitulo;
                this.iIsloaded = true;
                fullpage_api.destroy('#fullpage');
                this.api = new fullpage('#fpInterna', this.options2);
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
  .lateralTitleIcon{
    top: 1em;
    left: 2.1em;
    z-index: 2;
    transform: rotate(180deg);
    background-image: url('../assets/img//flecha-derecha.svg');
            height: 40px;
            width: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            display: block;
            transition: all .3s linear;
  }
  .titleBtn{
    
          position: absolute;
          -webkit-transform: rotate(-90deg);
          transform: rotate(-90deg);
          color: #fff;
          left: -180px;
          height: auto;
          width: 450px;
          top: 32vh;
          z-index: 2;
     h2{
                font-size: 13px;
                font-family: 'Libre Franklin', sans-serif;
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: 1px;
     }
  }
  .lateralTitleBg{
        position: absolute;
        width: 97px;
        display: inline-block;
        height: 100vh;
        top: 0;
        background-size: cover;
        z-index: 1;
  }
  .container__lateral {
    position: fixed;
    top: 0;
    z-index: 9;
    right: -100vw ;
    width: 100%;
    height: 100%;
    transition-property: position;
    -webkit-transition: 1s;
    transition: 1s;
    &.active {
     right: 0vw ;
    }
  }
  .seccion_lateral {
    height: 100vh;
    display: flex;
    &.interna {
      .seccion_lateral_container {
        &__video {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            .video_source {
              width: 100%;
              background-size: cover;
            }
        } 
        &__imagen {
          background-image: url(http://localhost:1337/uploads/museo_flip_caqueta_tira2_01_aa0f6bb56a.jpg);
          background-size: cover;
          height: 100%;
          width: 100%;
          position: absolute;
        }
        &__texto {
          z-index: 7;
          font-family: 'Ibarra Real Nova';
          b, strong, em {
              font-family: 'Libre Franklin', sans-serif;
              text-transform: uppercase;
          }
        }
      }
    }
    &_container {
      background-position: center;
      background-color: #2c2327;
      display: flex;
      align-items: center;
      &__texto {
        
      position: relative; 
      width: 65%;
      margin: 0 auto;
      font-family: 'Ibarra Real Nova';
      color: #fff;
      font-size: 1.3em;
        
      }
    }
  }
  .overlay_inlateral {
    video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
    }
    .image_overlayl {
        width: 100vw;
        height: 100vh;
    }
  }
   #fp-nav ul li a span,
   .fp-slidesNav ul li a span {
    background: white !important;
  }
}
</style>
