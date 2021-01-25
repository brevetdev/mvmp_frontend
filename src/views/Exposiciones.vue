<template>
  <div class="expo_container">
    <div class="overlay_inlateral" v-show="this.isshowLateral">
      <div class="image_overlayl" v-if="overlayimagen" v-bind:style="{'background-image': 'url(' + this.overlayrecursoUrl +')' }" ></div>
      <video v-if="!overlayimagen" v-bind:src="this.overlayrecursoUrl"></video>
    </div>
    <div class="seccion_principal__container" v-show="!this.isshowLateral">
    <full-page :options="options" id="fullpage" ref="fullpage" v-if="isLoaded">
      <div v-for="(data, index) in mainData" :key="'main'+index" class="section" >
        <div class="mainOverlay"></div>
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
            <div class="page_animation__capa page_animation__capa_0 animated fadeIn" style="animation-duration: 3s; animation-delay: 0.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo + ')' }"></div>
            <div class="page_animation__capa page_animation__capa_1 animated fadeInUp" style="animation-duration: 3s; animation-delay: 1s" v-bind:style="{ 'background-image': 'url(' + imgFondo1 + ')' }"></div>
            <div class="page_animation__capa page_animation__capa_2 animated fadeInUp" style="animation-duration: 3s; animation-delay: 1.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo2 + ')' }" ></div>
            <div class="page_animation__capa page_animation__capa_3 animated fadeInUp" style="animation-duration: 3s; animation-delay: 1.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo3 + ')' }" ></div>
            <div class="page_animation__capa page_animation__capa_4 animated fadeInUp" style="animation-duration: 3s; animation-delay: 1.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo4 + ')' }" ></div>
            <div class="page_animation__capa page_animation__capa_5 animated fadeInUp" style="animation-duration: 3s; animation-delay: 1.5s" v-bind:style="{ 'background-image': 'url(' + imgFondo5 + ')' }" ></div>
          </div>
        </div>
        <div v-else>
          <div class="seccion_secu">
            <div class="seccion_secu_container">
              <div v-if="data.videoFondo !== undefined && data.videoFondo !== null">
                    <video class="seccion_secu_container__video" loop  data-autoplay data-keepplaying>
                            <source v-bind:src="apiUrl + bgSecondary[index].url" type="video/mp4">
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
          <div class="mainOverlay"></div>
          <div class="seccion_lateral_container">
              <div class="seccion_lateral_container__texto" v-if="data.videoRecurso == undefined && data.videoRecurso == null ">
                {{data.descripcion}}
              </div> 
              <div class="seccion_lateral_container__rvideo" v-if="data.videoRecurso !== undefined && data.videoRecurso !== null">
                <vue-plyr ref="mivideo" class="audio_container__reproductor">
                <video
                  controls
                  crossorigin
                  playsinline
                >
                  <source
                    v-bind:src="apiUrl + data.videoRecurso.url"
                    type="video/mp4"
                  />
                </video>
                </vue-plyr>
              </div>
              <div v-if="data.audios.length > 0" class="seccion_lateral_container__audio audio_container" >
                <div v-for="(audiod, indexa) in data.audios" :key="indexa">
                    <div v-html="parseoHtml(audiod.descripcionAudio) " class="html_render seccion_lateral_container__leyenda"></div>
                    <vue-plyr ref="miaudio" class="audio_container__reproductor">
                    <audio controls crossorigin playsinline >
                      <source
                          v-bind:src = "apiUrl + audiod.audio.url"
                          type="audio/mp3"
                      />
                    </audio>
                  </vue-plyr>
                  </div> 
              </div>
              <div v-if="data.videofondo !== undefined && data.videofondo !== null" class="seccion_lateral_container__video">
                    <video class="video_source" loop  data-autoplay data-keepplaying>
                            <source v-bind:src="apiUrl + data.videofondo.url" type="video/mp4">
                   </video>
              </div>
              <div class="seccion_lateral_container__imagen" v-if="data.imagenFondo !== undefined && data.imagenFondo !== null" v-bind:style="{'background-image': 'url(' +apiUrl+data.imagenFondo.url +')' }">
              </div>
            <div class="seccion_lateral_container__texto video__texto" v-if="data.videoRecurso !== undefined && data.videoRecurso !== null ">
                {{data.descripcion}}
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
      player: undefined,
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
      imgFondo4: "",
      imgFondo5: "",
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
        onLeave: function() { 
           document.querySelectorAll('video').forEach(function(node) {
            node.pause(); 
          });
        }
      }
      ,
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
             console.log(response.data.paginasExposiciones[i]);
            //VALIDAR SECCION PRINCIPAL
              if (response.data.paginasExposiciones[i].agregarSeccion[j].seccionPrincipal) {
                this.imgFondo =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_1.url == undefined  || response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_1.url == null ?  'empty':  this.imgFondo = response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_1.url;
                this.imgFondo1 =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_2.url == undefined || response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_2.url == null  ?  'empty':  this.imgFondo1 = response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_2.url;
                this.imgFondo2 =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_3.url == undefined || response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_3.url == null ?  'empty':  this.imgFondo2 = response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_3.url;
                this.imgFondo3 =  response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_4.url == undefined || response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_4.url == null ?  'empty':  this.imgFondo3 = response.data.paginasExposiciones[i].agregarSeccion[j].imagenesRecurso_4.url;
               
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
      console.log(this.mainData[seccion]);
      if(this.mainData[seccion]["videoFondo"] !== undefined && this.mainData[seccion]["videoFondo"] !== null) {
        this.overlayimagen = false;
        this.overlayrecursoUrl = this.mainData[seccion].videoFondo.url;
      }
      if(this.mainData[seccion]["imagenFondo"] !== undefined && this.mainData[seccion]["imagenFondo"] !== null) {
        this.overlayimagen = true;
        this.overlayrecursoUrl = this.mainData[seccion].imagenFondo.url;
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
                this.$refs.miaudio.player;
                 this.$refs.mivdeo.player;
           } 
         }
      }
    }
  }
};
</script>
<!--        ESTILOS         -->
<style lang="scss">
  @import "../sass/main";
  @import "../sass/layouts/exposiciones";
</style>
