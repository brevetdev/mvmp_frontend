<template>
  <div class="expo_container">
    <full-page :options="options" id="fullpage" v-if="isLoaded">
      <div
        v-for="(data, index) in mainData"
        :key="index"
        class="section"
        v-bind:id="'section' + index"
      >
        <div v-if="data.seccionPrincipal">
          <div class="introduccion">
            <div id="text">
              <h1>{{ data.tituloSeccion }}</h1>
              <p class="subtitle">{{ data.subtituloSeccion }}</p>
            </div>
          </div>
          <div class="btn--center">
            <a href="#2">
              <span>{{data.textoBoton}}</span>
              <svg
                aria-hidden="false"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-down"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-chevron-down fa-w-14 fa-2x"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                  class=""
                ></path>
              </svg>
            </a>
          </div>
          <div id="page_Animation" class="caqueta">
            <div
              class="capa _1"
              style="animation-duration: 3s; animation-delay: 0.5s"
              v-bind:style="{ 'background-image': 'url(' + imgFondo + ')' }"
            ></div>
            <div
              class="capa _2"
              style="animation-duration: 3s; animation-delay: 1s"
              v-bind:style="{ 'background-image': 'url(' + imgFondo1 + ')' }"
            ></div>
            <div
              class="capa _3"
              style="animation-duration: 3s; animation-delay: 1.5s"
              v-bind:style="{ 'background-image': 'url(' + imgFondo2 + ')' }"
            ></div>
            <div
              class="capa _4"
              style="animation-duration: 3s; animation-delay: 2s"
              v-bind:style="{ 'background-image': 'url(' + imgFondo3 + ')' }"
            ></div>
            <div
              class="capa _5"
              style="animation-duration: 3s; animation-delay: 3s"
              v-bind:style="{ 'background-image': 'url(' + imgFondo4 + ')' }"
            ></div>
          </div>
        </div>

        <div v-else>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vel
            rerum quae officiis possimus magni temporibus. Nihil corporis id
            voluptas dicta necessitatibus sint, in reprehenderit cumque a dolor
            minima quod. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Delectus molestiae pariatur expedita, earum repellat id
            sapiente modi ea praesentium dolorum officiis ab non architecto
            tempore autem, tempora ipsum distinctio maxime! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Numquam dicta, suscipit
            perferendis accusamus, accusantium eius commodi fuga saepe
            consectetur totam vero ex explicabo consequuntur ratione. Dicta
            velit reprehenderit ipsam aliquam.
          </p>
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
      options: {
        licenseKey: "4%2M$#W?x0",
        navigation: true,
        anchors: [
          "section0",
          "section1",
          "section3",
          "section4",
          "section5",
          "section6",
          "section7",
          "section8",
          "section9",
          "section10",
        ],
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
          if (
            response.data.paginasExposiciones[i].nombrePagina === nombreRuta
          ) {
            this.mainData = response.data.paginasExposiciones[i].agregarSeccion;
            console.log(
              response.data.paginasExposiciones[i].agregarSeccion[i]
                .seccionPrincipal
            );
            if (
              response.data.paginasExposiciones[i].agregarSeccion[i]
                .seccionPrincipal
            ) {
              this.imgFondo =
                this.apiUrl +
                response.data.paginasExposiciones[i].agregarSeccion[i]
                  .imagenesRecurso_1.url;
              this.imgFondo1 =
                this.apiUrl +
                response.data.paginasExposiciones[i].agregarSeccion[i]
                  .imagenesRecurso_2.url;
              this.imgFondo2 =
                this.apiUrl +
                response.data.paginasExposiciones[i].agregarSeccion[i]
                  .imagenesRecurso_3.url;
              this.imgFondo3 =
                this.apiUrl +
                response.data.paginasExposiciones[i].agregarSeccion[i]
                  .imagenesRecurso_4.url;
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
  .btn--center {
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
