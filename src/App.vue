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
        <payments-display :list="listOnPage" :elsPerPage="paymentsPerPage"/>
      </div>
      <div :class="[$style.content]">
        <pagination :elsPerPage="paymentsPerPage" :allEls="paymentsList.length" @goToPage="onGoToPage" :cur="curPage"/>
      </div>
      <div :class="[$style.content]">
        Total: {{ totalValue }}
      </div>
      <div :class="[$style.content]" v-if="show">
        <add-payment-form @addNewPayment="addData"/>
      </div>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from './components/AddPaymentForm.vue';
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import Pagination from './components/Pagination.vue'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination
  },
  data(){
    return{
      paymentsList: [],
      show: false,
      paymentsPerPage: 3,
      curPage: 1,
    }
  },
  computed: {
    totalValue(){
      return this.paymentsList.reduce((acc, cur) => acc + cur.value, 0)
    },
    listOnPage() {
      const {paymentsPerPage, curPage} = this
      return this.paymentsList.slice(paymentsPerPage*(curPage-1), paymentsPerPage*curPage)
    }
  },
  methods:{
    addData(newPayment){
      this.paymentsList.push(newPayment)
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
      this.curPage = page
    }
  },
  created(){
    this.paymentsList = this.fetchData()
    this.paymentsList.forEach((el, id) => { el.id = id+1 })
  },
  beforeUpdate(){
    this.paymentsList.forEach((el, id) => { el.id = id+1 })
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
