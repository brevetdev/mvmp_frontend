<template>
<div class="bckgr" v-bind:style="{ 'background-image': 'url('+imgFondo+'  )' }">
  <!--<div v-html="msg"></div>-->
  <div id="overlay">
  <div v-for='data in dataTitulo'>
     <p  v-bind:class="data.classTitulo"> {{data.titulo}}</p>
  </div>
  </div>
  <div class="logo">
    <div class="logo__content">
      <img v-bind:src="logo" />
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'HomeView',
  mounted () {
   // this.parseoHtml(),
    this.traerInfo()
  },
  data () {
    return {
     // msg: '**Probando Showdown**',
      dataTitulo: [],
      imgFondo: "",
      logo: ""
    }
  },
  methods: {
   // parseoHtml(){
     // var showdown  = require('showdown');
    //var converter = new showdown.Converter();
    //this.msg = converter.makeHtml(this.msg);
    //},

    traerInfo(){
        let urlInicio =process.env.API +"/inicio";
        let homeVue = this;
        axios.get(urlInicio).then(response => {     
          homeVue.dataTitulo = response.data.contenidoInicio;
          homeVue.imgFondo = process.env.API+response.data.imagenFondo.url;
          homeVue.logo = process.env.API+response.data.logo.url;
          console.log(homeVue.logo);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../sass/main';
blockquote,
body,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
ol,
p,
pre,
ul {
    margin: 0;
    padding: 0;
}
.bckgr{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    background-position: right;
}
#overlay {
    color: #f8a9ae;
    -webkit-background-clip: text;
    background-clip: text;
    position: absolute;
    width: 100vw;
    bottom: 0;
    top: 4vh;
    text-align: center;
     @include breakpoint(phone) {
      top: 20vh;
    }
    @include breakpoint(tablet) {
      top: 12vh;
    }
    @include breakpoint(desktopxl) {
      top: 20vh;
    }
}
.mayusculas{
    font-family: 'Libre Franklin', sans-serif;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1.5px;
    font-size: 4.8em;
    display: block;
    line-height: 1em;
    @include breakpoint(phone) {
      font-size: 2.8em;
    }
    @include breakpoint(tablet) {
      font-size: 3.8em;
    }
    @include breakpoint(desktopxl) {
      font-size: 5.8em;
    }
}
.minusculas{
    font-family: 'Ibarra Real Nova';
    color: #d1d1d1;
    font-size: 2.3em;
    @include breakpoint(phone) {
      font-size: 1.5em;
    }
    @include breakpoint(tablet) {
      font-size: 2.3em;
    }
    @include breakpoint(desktopxl) {
      font-size: 4.3em;
    } 
}
.logo{
  position: absolute;
    bottom: 50px;
    width: 100%;
    margin: 0 auto;
  &__content{
        display: block;
        margin: 30px auto;
        width: 200px;
        height: auto;

  }
}

</style>
