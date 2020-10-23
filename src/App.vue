<template>
  <div id="app">
    <slider
      :width="300"
      format="push"
      direction="left"
      :opacity="0.15"
      :links="[
        {'id': 1, 'text': 'Link 1', 'url': 'https://github.com'},
        {'id': 2, 'text': 'Link 2', 'url': 'https://github.com'},
        {'id': 3, 'text': 'Link 3', 'url': 'https://github.com'}
      ]"
    >
    </slider>
    <router-view/>
  </div>
</template>

<script>
    import Slider from '@jeremyhamm/vue-slider'
    export default {
        name: 'App',
        components: {
            'slider': Slider
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    /*.navMenu {
    position: absolute;
    top: 0px;
    z-index: 99999;
}

      .bckgr {
          z-index: 0;
      }*/
    
    nav.navIcon {
        z-index: 9999;
        position: absolute;
        top: 21px;
        left: 25px;
    }
    
    .navMenu a[data-v-7f183654] {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #000000;
        display: block;
        -webkit-transition: .3s;
        transition: .3s;
        font-family: 'Ibarra Real Nova';
        font-size: 1.3em;
        font-weight: 100;
        margin-left: -20px;
    }
    
    .navMenu[data-v-7f183654] {
        font-family: Titillium Web, sans-serif;
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        background-color: #f2efe6;
        overflow-x: hidden;
        padding-top: 60px;
        -webkit-transition: .5s;
        transition: .5s;
    }
    
    .navMenu a[data-v-7f183654]:hover {
        color: #ae8ec2;
        text-decoration: underline;
    }
</style>