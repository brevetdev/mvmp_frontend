<template>
<div v-html="msg"></div>
</template>

<script>
import axios from "axios";
    import Slider from '@jeremyhamm/vue-slider'
export default {
  name: 'menu',
  components: {
            'slider': Slider
        },

        mounted() {
            this.traerInfo()
        },
        data() {
            return {
                menuPrincipal: [],

            }
        },
        methods: {
            traerInfo() {
                let urlInicio = process.env.API + "/paginas-2-colum";
                let homeVue = this;
                axios.get(urlInicio).then(response => {
                    homeVue.menuPrincipal = response.data.Paginas;
                    console.log('lista de paginas');
                    console.log(homeVue.menuPrincipal);
                });
            }
        }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
