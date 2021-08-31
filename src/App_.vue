<template>
  <div id="app">
    <transition name="fade">
      <popup-window v-if="popupShown" v-click-outside="onClose" :popupSettings="popupSettings"/>
    </transition>
    <div class="page-links">
      <router-link to='/dashboard'>dashboard</router-link> /
      <router-link to='/about'>about</router-link> /
      <router-link to='/404'>404</router-link>
      <!-- <button @click="goTo(404)">404</button> -->
    </div>
    <div class="content">
      <router-view />
    </div>
    <transition name="fade">
      <modal-window-add-payment-form v-if="modalShown" :modalSettings="modalSettings"/>
    </transition>
    
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  components: {
    ModalWindowAddPaymentForm: () => import ('./components/ModalWindowAddPaymentForm.vue'),
    PopupWindow: () => import ('./components/PopupWindow.vue')
  },
  name: 'App',
  data(){
    return{
      modalShown: false,
      modalSettings: {},
      popupShown: false,
      popupSettings: {},
    }
  },
  methods:{
    goTo(pageName){
      this.$router.push({
        name: pageName
      })
    },
    onShow(settings) {
      this.modalSettings = settings
      this.modalShown = true
    },
    onHide() {
      this.modalSettings = {}
      this.modalShown = false
    },
    onShowPopup(settings) {
      this.popupShown = true
      this.popupSettings = settings
    },
    onHidePopup() {
      this.popupSettings = {}
      this.popupShown = false
    },
    onClose() {
      this.$popup.hide()
    } 
  },
  mounted(){
    this.$modal.EventBus.$on('show', this.onShow)
    this.$modal.EventBus.$on('hide', this.onHide)
    this.$popup.EventBus.$on('show', this.onShowPopup)
    this.$popup.EventBus.$on('hide', this.onHidePopup)
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
  directives: {
    ClickOutside
  },
  beforeDestroy() {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('hide', this.onHide)
    this.$popup.EventBus.$off('show', this.onShowPopup)
    this.$popup.EventBus.$off('hide', this.onHidePopup)
  }
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
<style>
.fade-enter-active,
.fade-leave-active{
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
</style>
