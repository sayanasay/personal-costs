<template>
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
        Total: {{ getFPV }}
      </div>
      <!--<div :class="[$style.content]">
        <add-category-form />
      </div>-->
      <div :class="[$style.content]" v-show="show">
        <add-payment-form @addNewPayment="addData"/>
      </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import AddPaymentForm from '../components/AddPaymentForm.vue';
import PaymentsDisplay from '../components/PaymentsDisplay.vue';
import Pagination from '../components/Pagination.vue';
//import AddCategoryForm from '../components/AddCategoryForm.vue';

export default {
  name: 'Dashboard',
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination,
    //AddCategoryForm,
  },
data(){
    return{
      page: 'dashboard',
      show: false,
      paymentsPerPage: 3,
      curPage: 1,
    }
  },
  computed: {
    ...mapGetters({
      paymentsList:'getPaymentsList',
    }),
    listOnPage() {
      const {paymentsPerPage, curPage} = this
      return this.paymentsList.slice(paymentsPerPage*(curPage-1), paymentsPerPage*curPage)
    },
    getFPV(){
      return this.$store.getters.getFullPaymentValue
    },
  },
  methods:{
    ...mapMutations({
      loadData: 'setPaymentListData',
      addDataToStore: 'addDataToPaymentList',
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
      this.curPage = page
    },
    /* setPage(){
      this.page = location.pathname.slice(1)
    }, */
  },
  async created(){
    //this.paymentsList = this.fetchData()
    //this.$store.commit('setPaymentListData', this.fetchData())
    //this.loadData(this.fetchData())
    //this.$store.dispatch('fetchData')
    await this.fetchListData()
    if(this.$route?.params?.page){
      this.onGoToPage(this.$route.params.page)
    }
    if(this.$route?.params?.category){
      this.show = true
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
  beforeUpdate(){
    this.paymentsList.forEach((el, id) => { el.id = id+1 })
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
