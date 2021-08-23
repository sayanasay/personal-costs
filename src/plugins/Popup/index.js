export default {
  install(Vue) {
    if(this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$popup = {
      EventBus: new Vue(),
      show(setting) {
        this.EventBus.$emit('show', {...setting})
      },
      hide() {
        this.EventBus.$emit('hide')
      },
    };
  }
};