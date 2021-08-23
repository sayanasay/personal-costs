<template>
  <div>About
      <br/>
      <button @click="showAuthFormFn">auth</button>
  </div>
</template>
<script>
export default {
  name: "About",
  methods: {
    showAuthFormFn() {
        this.$modal.show('auth', {header: 'Auth'})
    },
  },
};
</script>
