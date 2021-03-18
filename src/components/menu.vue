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
                <span> {{dataIn.tituloItem}}</span> 
                </router-link>  

                <div v-if="dataIn.tituloItem === 'Contacto'" >
                  <a href="https://www.flip.org.co/index.php/es/contacto" target="_blank">
                    <span> {{dataIn.tituloItem}}</span>
                  </a>
                </div>
                <div v-else-if="dataIn.tituloItem !='Contacto'" >
                  <router-link :to="`/${dataIn.tipoPagina}/${dataIn.urlItem}`" v-if="dataIn.tipoPagina != 'dosColumnas' && dataIn.tipoPagina.toLowerCase() !== dataIn.urlItem.toLowerCase()">
                    <span> {{dataIn.tituloItem}}</span>
                  </router-link>  
                </div>
                 <router-link :to="`/${dataIn.urlItem}`" v-if="dataIn.tipoPagina.toLowerCase() == dataIn.urlItem.toLowerCase()">
                   <span> {{dataIn.tituloItem}}</span>
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
@import "../sass/components/_menu";


</style>