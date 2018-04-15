<template>
  <div id="app">
      <div class="logo"><img src="./assets/images/logo.png" alt=""></div>
      <h1>vue-gantt</h1>
      <router-view></router-view>
      <div class="footer">Made with ♥ by mamboer</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
*,
table,
th,
tr,
div {
  margin: 0;
  padding: 0;
}
body {
  background: linear-gradient(90deg, #25c481, #25b7c4);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  padding: 20px;
}
.logo img {
  width: 100%;
}
h1 {
  height: 80px;
  line-height: 80px;
}
.footer {
  height: 60px;
  line-height: 60px;
}
</style>
