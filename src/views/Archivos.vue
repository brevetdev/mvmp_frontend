<template>
  <div class="archivos__container">
    <div class="archivos__titulo">
      {{ this.listaArchivos.titulo }}
    </div>
    <carousel-3d
      :width="anchoPantalla"
      :height="altoPantalla"
      v-if="flagLoadArchivos"
      class="carrusel_main"
      :perspective="0"
      :border="6"
      :scaling="400"
      :space="800"
      :display="9"
      :controls-visible="true"
      :controls-prev-html="'🡠'"
      :controls-next-html="'🡢'"
      :controls-width="30"
      :controls-height="60"
      :clickable="false"
    >
      <slide
        class="carrusel_main__item"
        v-for="(data, i) in imagenesDescatadas"
        :key="i"
        :index="i"
      >
        <img
          class="carrusel_item__imagen"
          v-bind:src="apiUrl + data.imagen.url"
          alt="IMAGEN URL"
        />
        <div class="carrusel_item__texto">
          <mark
            v-html="eliminarP(parseoHtml(data.descripcion)) + '</p>'"
          ></mark>
        </div>
      </slide>
    </carousel-3d>
    <div class="archivos__contenidos">
      <p class="archivos__contenidos__parrafo">
        {{ this.listaArchivos.descripcion }}
      </p>
      <div class="archivos__contenidos__controls">
        <dropdown
          class="my-dropdown-toggle"
          :options="arrayOfObjects"
          :selected="object"
          v-on:updateOption="methodToRunOnSelect"
          :placeholder="'Select an Item'"
        >
        </dropdown>
        <dropdown
          class="my-dropdown-toggle"
          :options="arrayOfObjects"
          :selected="object"
          v-on:updateOption="methodToRunOnSelect"
          :placeholder="'Select an Item'"
        >
        </dropdown>
        <dropdown
          class="my-dropdown-toggle"
          :options="arrayOfObjects"
          :selected="object"
          v-on:updateOption="methodToRunOnSelect"
          :placeholder="'Select an Item'"
        >
        </dropdown>
      </div>
      <div class="archivos__contenidos__cards">
          <div
            class="mansory__container"
            v-masonry="containerId"
            transition-duration="0.3s"
            item-selector=".item "
            v-if="flagLoadArchivos"
            horizontal-order="false"
            origin-left="true"
            fit-width="true"
            :gutter="10"
            columnWidth="190000"
          >
          
            <div
              
              v-masonry-tile
              class="item mansory-item "
              v-for="(item, index) in objRandom"
              :key="index" 
            >
             <div class="mansory-item__imagen" v-if="item.tipo==='Imagen'" @click.prevent="showFiles(item)">
              <img v-bind:src="apiUrl + item.imagen.url" alt="" v-bind:height="item.imagen.height" v-bind:width="item.imagen.width" />
              <p class="mansory-item__imagen__cita">{{ item.pieImagen }}</p>
             </div>
            <div class="mansory-item__audio" v-if="item.tipo === 'Audio'" @click.prevent="showFiles(item)">
               <vue-plyr ref="miaudio" class="audio_container__reproductor">
                <audio controls crossorigin playsinline>
                  <source
                    v-bind:src="apiUrl + item.audio.url"
                    type="audio/mp3"
                  />
                </audio>
              </vue-plyr>
                 <div class="mansory-item__audio__cita" v-html="parseoHtml(item.piedeAudio)"></div>
            </div>
            <div class="mansory-item__video"  @click.prevent="showFiles(item)" v-if="item.tipo==='Video'">
               <vue-plyr clickToPlay="true" :enabled="false" ref="mivideo" class="video_container__reproductor">
                <video  crossorigin playsinline>
                  <source
                    v-bind:src="apiUrl + item.video[0].url"
                    type="video/mp4"
                  />
                </video>
              </vue-plyr>
              <div class="mansory-item__video__cita" v-html="parseoHtml(item.pieVideo)"></div>
            </div>
            <div class="mansory-item__blog" @click.prevent="showFiles(item)" v-if="item.tipo==='Blog'">
                <div class="mansory-item__blog__resumen" v-html="parseoHtml(cutResume(item.ResumenArticulo))"></div>
               <div class="mansory-item__blog__articulo"  v-html="parseoHtml(cutResume(item.citaArticulo))"></div> 
            </div>
            </div>
          </div>
      </div>
      <div class="archivos__contenidos__interna" v-if="showingFile">
        <div class="archivos_interna__options" @click.prevent="closeInt" >
              <img src="../assets/img/close-icon.svg" alt="">
        </div>
        <div class="container__interna">
              <div class="interna-item__imagen" >
               <img v-bind:src="apiUrl + InternaFiles.imagen.url" alt="" v-bind:height="InternaFiles.imagen.height" v-bind:width="InternaFiles.imagen.width" />
                <p class="interna-item__imagen__cita">{{ InternaFiles.pieImagen }}</p> 
             </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Carousel3d, Slide } from "vue-carousel-3d";
import dropdown from "vue-dropdowns";

export default {
  name: "Archivos",
  mounted() {
    this.infoExpo();
     window.onscroll = function() {
       this.actualScroll = window.scrollY;
       console.log(this.actualScroll);
    }
  },
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      listaArchivos: [],
      apiUrl: process.env.API,
      imagenesDescatadas: [],
      player: undefined,
      objRandom: [],
      actualScroll: 0,
      InternaFiles: [],
      showingFile: false,
      anchoPantalla: window.screen.width - 400,
      altoPantalla: window.screen.height - 300,
      flagLoadArchivos: false,
      arrayOfObjects: [
        { name: "ASDADAS", value: "SDS" },
        { name: "ASDADA", value: "ASDADAD" },
      ],
      object: {
        name: "Object Name",
        value: "OTRO VALOR",
      },
      object: {
        name: "Object Name",
        value: "OTRO VALOR",
      },
    };
  },
  components: {
    dropdown: dropdown,
  },
  methods: {
    showFiles(itemM) {
      this.InternaFiles = itemM;
      let bodyEl = document.querySelector('body');
      bodyEl.style.overflow ="hidden";
      window.scrollTo({top: 0})
      this.showingFile = true;
    },
    closeInt() {
      alert(this.actualScroll);
      let bodyEl = document.querySelector('body');
      bodyEl.style.overflow ="auto";
      window.scrollTo({top: this.actualScroll})
      this.showingFile = false;
    },
    infoExpo() {
      let urlExpo = process.env.API + "/archivos";
      axios.get(urlExpo).then((response) => {
        this.listaArchivos = response.data;
        this.sortRand();
        this.flagLoadArchivos = true;
        try {
          this.$refs.miaudio.player;
          this.$refs.mivideo.player;
        } catch (e) {}
      });
    },
    sortRand() {
      this.listaArchivos.EntradaImgen.forEach((element) => {
      element.tipo = "Imagen";
      if (element.destacado) {
        this.imagenesDescatadas.push(element);
      }
      this.objRandom.push(element);
      });
      this.listaArchivos.EntradaAudio.forEach((elementA) => {
      elementA.tipo = "Audio";
      this.objRandom.push(elementA);
      });
      this.listaArchivos.entradaVideo.forEach((elementV) => {
      elementV.tipo = "Video";
      this.objRandom.push(elementV);
      });

      this.listaArchivos.entradaBlog.forEach((elementB) => {
      console.log(elementB);
      elementB.tipo = "Blog";
      this.objRandom.push(elementB);
      });

      this.objRandom.sort(function() { return Math.random() - 0.5 });
      console.log(this.objRandom);
    },
    cutResume(textC) {
        // Length to cut 
        let lengthToCut = 180; 
        // Sample text var text = "The quick brown fox jumps over the lazy dog";
         // We are getting 50 letters (0-50) from sample text 
         let cutted = textC.substr(0, lengthToCut);
          return cutted+'....';
    },
    methodToRunOnSelect(payload) {
      this.object = payload;
    },
    parseoHtml(msg) {
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      return converter.makeHtml(msg);
    },
    eliminarP(cadenaHtml) {
      cadenaHtml = cadenaHtml.replace(/<[p].*?>/g, "");
      return cadenaHtml;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../sass/main";
@import "../sass/layouts/archivos";
.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}

</style>
