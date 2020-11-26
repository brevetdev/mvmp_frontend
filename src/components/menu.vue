<template>
  <div id="menu">
    <Slide width="350">
      <!--HOME-->
      <router-link :to="`/home`">
        <div class="logomenu_txt">MEMORIAS DEL PERIODISMO</div>
      </router-link>
      <!--DOS COLUMNAS-->
      <div class="itemMenu" v-for="(data, index) in data2Col" :key="'2col'+index">
        <router-link :to="`/paginas/${data.NombrePagina}`">
         <span>  {{data.NombrePagina}}</span> 
        </router-link>
      </div>

      <!--Exposiciones-->
      <div class="bm-item-list"  v-for="(data, index) in  dataExpo" :key="'expo'+index">
        <router-link :to="`/exposicion/${data.nombrePagina}`">
          <span >  {{data.nombrePagina}}</span>
        </router-link>
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
  },
  data() {
    return {
      data2Col: [],
      dataExpo: [],
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