<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div>
          <p>Приложение для учета расходов</p>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="mr-4" color="teal lighten-1" dark v-on="on">
                Auth
              </v-btn>
            </template>
            <v-card class="text-left pa-8">
              <v-text-field v-model="login" label="login" />
              <v-text-field v-model="password" label="password" />
              <v-btn @click="LogIn">Log in</v-btn>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      dialog: false,
      login: "",
      password: "",
    };
  },
  methods: {
    LogIn() {
      console.log(this.login);
    },
  },
};
</script>
