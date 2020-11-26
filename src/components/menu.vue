<template>
  <div id="menu">
    <Slide width="350" class="menu">
      <!--HOME-->
      <router-link :to="`/home`" class="menu_link">
        <div class="menu_link__principal">{{ this.dataMenu.tituloPrincipal}}</div>
      </router-link>

      <!-- SECCION -->
        <div class="menu_seccion"  v-bind:class="{ subitems : dataM['tituloSeccion'] != null &&  dataM['tituloSeccion'] != undefined}" v-for="(dataM, ind) in dataMenu.seccionesMenu" :key="ind">
          <div class="sin_subitems" v-if="dataM['tituloSeccion'] == null && dataM['tituloSeccion'] == undefined">
          <div  class="menu_seccion__items" v-for="(dataIn, indexI) in dataM.itemMenu" :key="indexI">
                <router-link :to="`/paginas/${dataIn.urlItem}`" v-if="dataIn.tipoPagina === 'dosColumnas'">
                <span>  {{dataIn.tituloItem}}</span> 
                </router-link>  
                <router-link :to="`/${dataIn.tipoPagina}/${dataIn.urlItem}`" v-if="dataIn.tipoPagina != 'dosColumnas'">
                   <span>  {{dataIn.tituloItem}}</span>
                </router-link>  
                
          </div>
          </div>
          <div class="menu_seccion__titulo" v-if="dataM['tituloSeccion'] !== null && dataM['tituloSeccion'] !== undefined">
            <i class="menu_seccion__title">{{ dataM.tituloSeccion }}</i>
              <div class="menu_seccion__items--derecha" v-for="(dataI, index) in dataM.itemMenu" :key="index">
             <router-link :to="`/${dataI.tipoPagina}/${dataI.urlItem}`">
                <span>  {{dataI.tituloItem}}</span> 
                </router-link>   
              </div>
          </div> 
        </div>
    </Slide>
  </div>
</template>

<script>
import DosColum from "../views/DosColum.vue";
import axios from "axios";
import { Slide } from "vue-burger-menu";
export default {
  name: "Menu",
  /*---------------------*/

  /*---------------------*/
  components: {
    Slide,
  },
  computed: {},
  mounted() {
    this.traer2Col();
    this.traerExpo();
    this.traerMenu();
  },
  data() {
    return {
      data2Col: [],
      dataExpo: [],
      dataMenu: [],
      homeUrl: "home",
      flag: false,
    };
  },
  methods: {
    traer2Col() {
      let urlInicio = process.env.API + "/paginas-2-colum";
      axios.get(urlInicio).then((response) => {
        this.data2Col = response.data.Paginas;
      });
    },
    traerExpo(){
      let urlInicio = process.env.API + "/exposicines";
      axios.get(urlInicio).then((response)=>{
        this.dataExpo = response.data.paginasExposiciones;
      });
    },
    traerMenu() {
      let urlInicio = process.env.API + "/menu";
      axios.get(urlInicio).then((response)=>{
        this.dataMenu = response.data;
        console.log("DATA DEL MENÚ---",response.data);
      });
    },
    isOn() {
      this.flag = true;
      console.log(this.flag);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main";
#menu {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  margin-top: 60px;
  .menu_link {
    &__principal {
      font-size: 32px;
      color: rgb(0, 0, 0);
      text-align: left;
    }
  }
  .menu_seccion {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 1em;
    &__title {
      font-family: 'Libre Franklin', sans-serif;
      font-size: 14px;
      color: #000000;
      font-weight: 400;
      margin-left: 1em;
    }
    &.subitems {
      margin-left: 0;
      padding-left: 0;
      padding-top: 0;
    }
    .sin_subitems {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
    &__items {
      font-family: 'Ibarra Real Nova';
      font-size: 21px;
      font-weight: 100;
      margin-left: -20px;
      margin-bottom: .5em;
      a {
        text-decoration: none;
      }
      &--derecha {
        display: flex;
        width: 80%;
        font-size: 12px;
        justify-content: flex-start;
        margin-left: auto;
        text-align: left;
        font-family: Arial, Helvetics, sans-serif;
        font-size: 12px;
        font-weight: bolder;
        margin-top: 1em;
        margin-bottom: 1em;
      }
    }
  }

  .logomenu_txt {
    font-size: xx-large;
    font-weight: lighter;
    text-indent: 0;
    line-height: 41px;
    color: #000000;
  }

  .itemMenu {
    padding: 6px 0px;
    margin-left: 10%;
  }

  .itemMenu a {
    font-family: "Ibarra Real Nova";
    font-size: 1.3em;
    font-weight: 100;
    margin-left: -20px;
    display: block;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
  }
  /deep/ .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    cursor: pointer;
    @include breakpoint(phone) {
      left: 21px;
    }
  }
  /deep/.bm-burger-bars {
    background-color: #fff !important;
  }
  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #bdc3c7;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  /deep/ .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 5; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #f2efe6 !important; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }

   /deep/ .bm-burger-bars {
    background-color: #fff;
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 0%;
    font-size: 20px;
    span{
      color: #000;
      
    }
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    }
  /deep/ .bm-item-list > * > span {
    
    font-weight: 700;
    font-family: "Ibarra Real Nova";
    font-size: 1em;
    font-weight: 100;
    margin: 23px 2em;
  } 
  
  .bm-item-list > * > span:hover {
    color: #ae8ec2 !important;
  }
}
</style>