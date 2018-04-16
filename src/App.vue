<template>
  <div id="app">
      <h1>ROBO2025</h1>
      <router-view></router-view>
      <div class="footer">Made with ♥ by ROBO2025</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
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
  background: linear-gradient(to bottom,  #25b7c4,#25c481);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  height: 80px;
  line-height: 80px;
  color:#fff;
  font-size: 50px;
  font-weight: 100;
  margin: 60px 0;
}
.footer {
  height: 60px;
  line-height: 60px;
  color:#fff;
}
</style>
