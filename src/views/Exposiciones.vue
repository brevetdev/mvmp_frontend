<template>
  <div class="expo_container">
    <div id="fullpage" >
      <div
        v-for="(data, index) in mainData" :key="index" class="section expo_container__main ">
          <p v-if="data.seccionPrincipal">
            {{ data.imagenesRecurso_1.url }}
          </p>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vel rerum quae officiis possimus magni temporibus. Nihil corporis id voluptas dicta necessitatibus sint, in reprehenderit cumque a dolor minima quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestiae pariatur expedita, earum repellat id sapiente modi ea praesentium dolorum officiis ab non architecto tempore autem, tempora ipsum distinctio maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dicta, suscipit perferendis accusamus, accusantium eius commodi fuga saepe consectetur totam vero ex explicabo consequuntur ratione. Dicta velit reprehenderit ipsam aliquam.</p>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    this.initFull();
 
  },
  data() {
    return {
      mainData: [],
      apiUrl: process.env.API,
    };
  },
  methods: {
      initFull() {
      var myFullpage = new fullpage("#fullpage", {
      licenseKey: "4%2M$#W?x0",
      navigation: true,
      navigationPosition: "right",
        });
      },
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
            console.log(this.mainData);
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
  &__main {
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
}
</style>
