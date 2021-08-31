<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <div class="text-h5 text-sm-h4 pb-4">My personal costs</div>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="teal lighten-1" dark v-on="on">
              Add new cost <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <add-payment-form @close="dialog = false" />
          </v-card>
        </v-dialog>

        <div :class="[$style.wrapper]">
          <div :class="[$style.content]">
            <payments-display />
          </div>
          <div :class="[$style.content]">Total: {{ getFPV }}</div>
          <!--<div :class="[$style.content]">
        <add-category-form />
      </div>-->
          <!-- <div :class="[$style.content]" v-show="show">
        <add-payment-form @addNewPayment="addData" />
      </div> 
          <div :class="[$style.content]">
            <button @click="showCategoryFormFn">Add category</button>
            <button @click="showPaymentFormFn">Add payment</button>
          </div>-->
        </div>
      </v-col>
      <v-col cols="6" sm="4" md="6">
        <div class="text-h6 text-sm-h5 pb-4">Chart</div>
        <chart v-if="loaded" :chart-data="chartData" :options="chartOptions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Chart from "../components/Chart.vue";
//import AddCategoryForm from '../components/AddCategoryForm.vue';

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    //AddCategoryForm,
    AddPaymentForm,
    Chart,
  },
  data() {
    return {
      dialog: false,
      page: "dashboard",
      paymentsPerPage: 3,
      curPage: 1,
      showPaymentForm: false,
      modalSettings: {},
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#f87979", "#3498DB", "#FF7F50", "#40E0D0", "#CCCCFF", "#DE3163", "#9FE2BF"],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    getFPVInCategories() {
      this.setChartData();
    }
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
    }),
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
    getFPVInCategories() {
      return this.getCategories.map((item) =>
        this.$store.getters.getFullPaymentValueInCategory(item)
      );
    },
  },
  methods: {
    ...mapMutations({
      loadData: "setPaymentListData",
    }),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    showPaymentFormFn() {
      this.$modal.show("addPaymentForm", { header: "Add Payment Form" });
    },
    showCategoryFormFn() {
      this.$modal.show("addCategoryForm", { header: "Add new category" });
    },
    setChartData() {
      this.chartData.labels = this.getCategories;
      this.chartData.datasets[0].data = this.getFPVInCategories;
    },
  },
  async mounted() {
    this.loaded = false
    try {
      await this.fetchListData();
      this.setChartData();
      this.loaded = true;
    }
    catch (e) {
      console.log(e)
    }
  },
  beforeUpdate() {
    this.paymentsList.forEach((el, id) => {
      el.id = id + 1;
    });
  },
};
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
.wrapper {
  display: block;
  height: 100%;
}

.content {
  padding-top: 30px;
}
</style>
