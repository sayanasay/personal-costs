<template>
  <div id="app">
    <div :class="[$style.wrapper]">
      <header>
        <div :class="[$style.title]">My personal costs</div>
      </header>
      <div :class="[$style.content]">
        <button @click="showForm">
          Add New Cost
        </button>
      </div>
      <div :class="[$style.content]">
        <payments-display :list="paymentsList" :elsPerPage="paymentsPerPage"/>
      </div>
      <div :class="[$style.content]">
        <pagination :elsPerPage="paymentsPerPage" @goToPage="onGoToPage" :cur="curPage"/>
      </div>
      <!--<div :class="[$style.content]">
        Total: {{ getFPV }}
      </div>-->
      <div :class="[$style.content]" v-if="show">
        <add-payment-form @addNewPayment="addData"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import AddPaymentForm from './components/AddPaymentForm.vue';
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination
  },
  data(){
    return{
      //paymentsList: [],
      show: false,
      paymentsPerPage: 3,
      //curPage: 1,
    }
  },
  computed: {
    ...mapGetters({
      //paymentsList:'getPaymentsList',
    }),
    paymentsList() {
      return this.$store.getters.getPaymentsListOnPage(this.$store.state.page)
    },
    curPage() {
      return this.$store.state.page
    },
    /*getFPV(){
      return this.$store.getters.getFullPaymentValue
    }*/
  },
  methods:{
    ...mapMutations({
      loadData: 'setPaymentListData',
      addDataToStore: 'addDataToPaymentList',
      setPage: 'setPage' 
    }),
    ...mapActions({
      fetchListData: 'fetchData'
    }),
    addData(newPayment){
      this.addDataToStore(newPayment)
      console.log(newPayment)
    },
    fetchData(){
      return[
        {
          date: '28.03.2020',
          category: 'Food',
          value: 169,
        },
        {
          date: '24.03.2020',
          category: 'Transport',
          value: 360,
        },
        {
          date: '24.03.2020',
          category: 'Food',
          value: 532,
        },
      ]
    },
    showForm(){
      this.show = !this.show;
    },
    onGoToPage(page){
      //this.curPage = page
      this.setPage(page)
    }
  },
  created(){
    //this.paymentsList = this.fetchData()
    //this.$store.commit('setPaymentListData', this.fetchData())
    //this.loadData(this.fetchData())
    //this.$store.dispatch('fetchData')
    this.fetchListData()
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
.wrapper{
  display: block;
  height: 100%;
}
.title{
  font-size: 20px;
}
.content{
  padding-top: 30px;
}
button {
    background: #00a6a6;
    padding: 10px 14px;
    border: none;
    color: #fff;
    cursor: pointer;
}
</style>
