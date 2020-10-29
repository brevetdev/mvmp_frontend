<template>
  <div id="dosColOverlay">
    <div v-for="(data, index) in dataPag" :key="index">
      <div class="grid-container">
        <div class="grid-item izq">
        <h1>{{ data.titulo }}</h1> 
        <div id="overlay">
          {{ data.descripcion }}
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'dosColView',
  mounted() {
    this.nameRoute = this.$route.params.nombre;
    if(window.location.href.split('/')[4] != this.nameRoute){
      window.location.reload();
    }else{
    this.traerInfo(this.nameRoute);
    console.log(this.dataPag);
    }
  },
  data () {
    return {
      dataPag: [],
      nameRoute: ""
    }

  },
  methods: {
  traerInfo(nombreRuta){
        let url2Col =process.env.API +"/paginas-2-colum";
        let dosColVue = this;
        let dataP = [];
        axios.get(url2Col).then(response => {
          for (let i = 0; i < response.data.Paginas.length; i++) {
            if(response.data.Paginas[i].NombrePagina === nombreRuta){
                dosColVue.dataPag = response.data.Paginas[i].contenidoPagina2Colum;
          }else{continue;}
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../sass/main";
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  background-color: #464646;
  padding: 10px;
  .grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  h1{
        font-family: 'Libre Franklin', sans-serif;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 3px;
        font-size: 22px;
        line-height: 1.6em;
        color: #01b5f4;
    }
     h3{
        font-family: 'Libre Franklin', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 1.6em;
        color: #ffffff;
        font-weight: 600;
        margin: 20px 0;
    }
}
.izq{
            font-family: 'Libre Franklin', sans-serif;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1.5px;
            font-size: 14px;
            line-height: 1.6em;
        }
  .der {
            margin-top: 30px;
            font-size: large;
        }

}

</style>
