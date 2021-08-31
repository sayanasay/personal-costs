<template>
    <v-card class="text-left pa-8">
        <v-text-field v-model="date" label="date" />
        <v-text-field v-model.number="value" label="value" />
        <v-select v-model="category" label="category" :items="options" />
        <v-btn @click="onSave" :disabled="isDisabled" :class="{'disable-btn': isDisabled}">Add</v-btn>
        <!--<input type="text" v-model="date" placeholder="date"/>
        <input type="number" v-model.number="value" placeholder="value"/>
        <select v-model="category" v-if="options">
            <option v-for="option in options" :value="option" :key="option">
                {{ option }}
            </option>
        </select> 
        <button @click="onSave" :disabled="isDisabled" :class="{'disable-btn': isDisabled}">Add</button> -->
    </v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'AddPaymentForm',
    data(){
        return{
            value: '',
            category: '',
            date: '',
        }
    },
    computed: {
        getCurrentDate(){
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        },
        options(){
            return this.$store.getters.getCategories
        },
        categoryList(){
            return this.options.map(category => category.toLowerCase())
        },
        isDisabled(){
            return !(this.value && this.category)
        },
    },
    methods: {
        ...mapActions([
            'fetchCategoryList'
        ]),
        onSave(){
            const { value, category } = this
            const data = {
                id: this.$store.state.paymentsList.length,
                date: this.date || this.getCurrentDate,
                value,
                category
            }
            console.log('emit: addNewPayment',data)
            //this.$emit('addNewPayment', data)
            this.$store.commit('addDataToPaymentList', data)
            // this.$modal.hide()
            this.$emit('close')
        },
    },
    async created(){
        await this.fetchCategoryList()
        if(this.$route?.params?.category){
            const id = this.categoryList.indexOf(this.$route.params.category.toLowerCase())
            if (id !== -1) this.category = this.options[id]
            else console.log('нет такой категории')
            this.date = this.getCurrentDate
            this.value = +this.$route.query.value
        }
    },
}
</script>
<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    input {
        border: 1px solid #b8b8b8;
        margin-bottom: 10px;
        padding: 8px;
    }
    .disable-btn {
        background: #9adbdb;
        cursor: default;
    }
</style>