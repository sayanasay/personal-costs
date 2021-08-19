<template>
  <div id="app">
    <div class="page-links">
      <router-link to='/dashboard'>dashboard</router-link> /
      <router-link to='/about'>about</router-link> /
      <router-link to='/404'>404</router-link>
      <button @click="goTo(404)">404</button>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
    }
  },
  methods:{
    goTo(pageName){
      this.$router.push({
        name: pageName
      })
    }
  },
  mounted(){
    /* const links = document.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
        history.pushState({}, '', link.href)
        this.setPage()
        console.log(link.href)
      })
    })
    window.addEventListener('popstate', this.setPage) */
    /*this.setPage()
    window.addEventListener('hashchange', () => {
      this.setPage()
    })*/
  },
}
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
