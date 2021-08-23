<template>
  <div class="wrapper">
    <div class="header">
      {{ modalSettings.header }}
    </div>
    <div class="content">
      <component :is="modalSettings.name" :id="modalSettings.id"/>
    </div>
    <div class="footer">
      <button @click="onClose">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindowAddPaymentForm',
  components: {
    AddPaymentForm: () => import('./AddPaymentForm.vue'),
    Auth: () => import('./Auth.vue'),
    AddCategoryForm: () => import('./AddCategoryForm.vue'),
    EditPaymentForm: () => import('./EditPaymentForm.vue'),
  },
  props: {
    modalSettings: {
      type: Object,
    }
  },
  methods: {
    onClose() {
      this.$modal.hide()
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 20px;
  position: absolute;
  top: 20%;
  background: #efefef;
}
</style>