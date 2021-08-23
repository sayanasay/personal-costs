<template>
  <div class="popup" :style="cssPosition">
    <button @click="showEditFormFn">Edit</button>
    <button @click="deletePayment">Delete</button>
  </div>
</template>

<script>

export default {
  name: 'PopupWindow',
  components: {
    
  },
  props: {
    popupSettings: {
      type: Object,
    },
  },
  computed: {
    cssPosition() {
      return{ 
        '--top': (this.popupSettings.bottomPosition) + "px", 
        '--left': (this.popupSettings.leftPosition - 60) + 'px',
      }
    }
  },
  methods: {
    showEditFormFn(){
      this.$modal.show('EditPaymentForm', {header: 'Edit Payment', id: this.popupSettings.paymentId-1})
      this.$popup.hide()
    },
    deletePayment(){
      this.$store.commit('deletePayment', this.popupSettings.paymentId-1)
      this.$popup.hide()
    }
  },
};
</script>

<style lang="scss" scoped>
.popup{
  padding: 10px;
  position: absolute;
  background: #efefef;
  top: var(--top);
  left: var(--left);
}
</style>