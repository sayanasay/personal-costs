<template>
  <v-container>
    <v-row>
      <template>
        <v-data-table
          :headers="headers"
          :items="payments"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Edit Payment</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="4" >
                          <v-text-field
                            v-model="editedItem.date"
                            label="Date"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" >
                          <v-select
                            v-model="editedItem.category"
                            label="Category"
                            :items="options"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" >
                          <v-text-field
                            v-model.number="editedItem.value"
                            label="Value"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal lighten-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="teal lighten-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    Are you sure you want to delete this payment?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal lighten-1" text @click="closeDelete"
                      >Cancel
                    </v-btn>
                    <v-btn
                      color="teal lighten-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      OK
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "PaymentsDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    elsPerPage: {
      type: Number,
      default: () => 3,
    },
  },
  data() {
    return {
      headers: [
        { text: "#", value: "id" },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Value", value: "value" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        date: "",
        category: "",
        value: 0,
      },
      defaultItem: {
        date: "",
        category: "",
        value: 0,
      },
    };
  },
  computed: {
    payments() {
      return this.$store.getters.getPaymentsList;
    },
    options() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    ...mapActions(["fetchCategoryList"]),

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.commit("deletePayment", this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    save() {
      this.$store.commit("editDataPayment", this.editedItem);
      this.close();
    },
  },
  created() {
    this.fetchCategoryList();
  },
};
</script>

<style scoped>
td {
  border: 1px solid;
  padding: 8px;
}
.edit {
  cursor: pointer;
}
.edit:hover {
  background: #9adbdb;
}
</style>
