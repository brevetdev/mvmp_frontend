<template>
  <div class="contentmap">
    <div id="features">
     
      <section
        v-bind:id="category.idseccion"
        v-bind:class="category.claseSeccion"
        v-for="(category, index) in mapa"
        :key="index"
      >
        <h2 class="subtitulosld">{{category.tituloSeccion}}</h2>
        <p class="subtitulosld">{{category.descripcionSeccion}}</p>
        <img v-bind:src="(category.seccionImagen)?(apiUrl+category.seccionImagen[0].url):'/'" class="img-fluid" />
      </section>
      <section id="rellemo">
        <img src="../assets/img/exposicion-mapa.jpg" class="img-fluid"/>

</section>
    </div>
    <div id="map"></div>
  </div>
</template>
<script src="./scripts/mapbox-gl.js"></script>
<script>
import axios from "axios";
//import VueMapbox from "vue-mapbox";
//import mapboxgl from "mapbox-gl";

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
export default {
  name: "Mapa",
  components: {},

  data() {
    return {
      apiUrl:process.env.API,
      dataInicio: [],
      activeChapterName: "",
      map: {},
      mapa: [],
      chapters: {}
    };
  },
 mounted() {
   
    const plugin = document.createElement("script");
    plugin.setAttribute("src", "./scripts/mapbox-gl.js");
    plugin.async = true;
    document.head.appendChild(plugin);

    let vueMapa = this;
    let estylo;
    let latutud;
    let longitud;
    let zoom;
 var InfoMap={}

 let urlMapa =this.apiUrl+"/exposicion-mapa";
    axios.get(urlMapa).then(function(response) {
      vueMapa.mapa = response.data.ExposicionMapa;
     console.log('Contenido mapa');
       console.log(vueMapa.mapa);
       console.log(urlMapa);
       InfoMap={
         estylo:response.data.urlmapa,
         zoom:response.data.zoom,
         pitch:response.data.pitch,
         bearing:response.data.bearing,
         accessToken:response.data.accessToken
       }
      for (var i = 0; i < vueMapa.mapa.length; i++) {
        vueMapa.chapters[vueMapa.mapa[i].idseccion] = {
          center: [vueMapa.mapa[i].longitud, vueMapa.mapa[i].latitud],
          zoom: vueMapa.mapa[i].zoom|| InfoMap.zoom,
          bearing: vueMapa.mapa[i].bearing || InfoMap.bearing,
          pitch: vueMapa.mapa[i].pitch || InfoMap.pitch
        };
        if (i == 0) {
          vueMapa.activeChapterName = vueMapa.mapa[i].idseccion;
          mapboxgl.accessToken = InfoMap.accessToken;
         /* mapboxgl.accessToken =
            "pk.eyJ1IjoiamNhcnJveW9zIiwiYSI6ImNqdzBnYnNnNzBhdjUzeXFqZXpscWFmaTMifQ.wIDKxTEiwP4QNwu2M9CtpQ";*/
            //vueMapa.mapa[i].AccessToken;
          vueMapa.map = new mapboxgl.Map({
            container: "map",
            style:  InfoMap.estylo,
            center:[vueMapa.mapa[i].longitud, vueMapa.mapa[i].latitud],
            zoom: vueMapa.mapa[i].zoom || InfoMap.zoom,
            bearing: vueMapa.mapa[i].bearing || InfoMap.bearing,
            pitch: vueMapa.mapa[i].pitch || InfoMap.pitch
          });
        }
      }

      //var activeChapterName = "baker";
      // const container = document.getElementById("map");
      //if (container) {}
    });

    var _this = this;
    window.onscroll = function() {
      var chapterNames = Object.keys(_this._data.chapters);
      for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (_this.isElementOnScreen(chapterName)) {
          _this.setActiveChapter(chapterName);
          var x = 0;
           chapterNames = x += 5;
          break;
        }
      }
    };
  },
  methods: {
    setActiveChapter: function(chapterName) {
      debugger;
      if (chapterName === this._data.activeChapterName) return;

      this._data.map.flyTo(this._data.chapters[chapterName]);

      document.getElementById(chapterName).setAttribute("class", "active");
      document
        .getElementById(this._data.activeChapterName)
        .setAttribute("class", "");

      this._data.activeChapterName = chapterName;
    },

    isElementOnScreen: function(id) {
      //   debugger;

      const element = document.getElementById(id);
      const bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    }
  },
  computed: {}
 
};

// On every scroll event, check which element is on screen

/*********************************************/

</script>

<style lang="scss">

@import '../css/mapbox-gl.css';

#map {
  position: fixed;
  width: 70%;
  left: 30%;
  top: 0px;
  bottom: 0px;
}
#features {
  width: 30%;
  font-family: sans-serif;
  overflow-y: scroll;
  background-color: #fafafa;
  
}
section {
padding: 70px 50px;
line-height: 25px;
border-bottom: 1px solid #ddd;
opacity: 0.25;
font-size: 13px;
}
section.active {
opacity: 1;
}
section:last-child {
border-bottom: none;
margin-bottom: 200px;
}
section#rellemo {
    opacity: revert;
}
#nav.mapaMenu {
    padding: 0px;
    position: relative;
    left: 0;
    transform: rotate(0deg);
    margin-top: 10px;
    z-index: 10;
}

section#rellemo p {
    color: transparent;
}

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>

