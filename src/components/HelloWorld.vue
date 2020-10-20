<template>
<div v-html="msg"></div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    console.log(process.env.API),
    this.parseoHtml()
  },
  data () {
    return {
      msg: '**YAAAAAAAAS**'
    }
  },
  methods: {
    parseoHtml(){
      var showdown  = require('showdown');
    var converter = new showdown.Converter();
    this.msg = converter.makeHtml(this.msg);
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
