<template>
  <div id="menu">
    <Slide width="350">
      <a href="index.html"
        ><div class="logomenu_txt">MEMORIAS DEL PERIODISMO</div></a
      >
      <div class="itemMenu" v-for="(data, index) in dataMenu" :key="index">
        <!-- <a :id="data.id" href="#">
              <span>{{data.NombrePagina}} xxx</span>
            </a>  -->
            <a @click="ir(data.NombrePagina)" href="#">{{ data.NombrePagina }}</a>
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
    this.traerMenu();
  },
  data() {
    return {
      dataMenu: [],
    };
  },
  methods: {
    traerMenu() {
      let urlInicio = process.env.API + "/paginas-2-colum";
      let menu = this;
      console.log(urlInicio);
      axios.get(urlInicio).then((response) => {
        menu.dataMenu = response.data.Paginas;
        console.log("Menu");
        console.log(menu.dataMenu);
      });
    },
    ir(data){
      this.$router.push(data);
      window.location.reload();
    }
  },
};
</script>

<style lang="scss" scoped>
#menu {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #373a47;
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
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #f2efe6 !important; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-burger-bars {
    background-color: #fff;
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 0%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: #000000 !important;
    font-family: "Ibarra Real Nova";
    font-size: 1.3em;
    font-weight: 100;
    margin-left: -20px;
  }
  .bm-item-list > * > span:hover {
    color: #ae8ec2 !important;
  }
}
</style>