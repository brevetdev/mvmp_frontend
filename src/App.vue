<template>
    <div id="app">
      <router-view/>
      <Menu></Menu>
    </div>
  </template>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-164174320-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-164174320-1');
</script>
<script>
    import Menu from './components/menu.vue';
    export default {
        name: 'App',
        components: {
            Menu
        }

    }
</script>
<style lang="scss">
body{
  margin: 0 ;
}
</style>
