<template>
    <div class="form">
        <input type="text" v-model="date" placeholder="date"/>
        <input type="number" v-model.number="value" placeholder="value"/>
        <select v-model="category" v-if="options">
            <option v-for="option in options" :value="option" :key="option">
                {{ option }}
            </option>
        </select>
        <button @click="onSave" :disabled="isDisabled" :class="{'disable-btn': isDisabled}">Edit</button>
    </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    name: 'AddPaymentForm',
    props: {
        id: {
            type: Number,
        },
    },
    data(){
        return{
            date: this.$store.state.paymentsList[this.id].date,
            value: this.$store.state.paymentsList[this.id].value,
            category: this.$store.state.paymentsList[this.id].category
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
            //return this.$store.state.categories
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
            const { id, value, category } = this
            const data = {
                id,
                date: this.date || this.getCurrentDate,
                value,
                category
            }
            console.log('emit: editNewPayment', data)
            this.$store.commit('editDataPayment', data)
            this.$modal.hide()
        },
    },
    created(){
        this.fetchCategoryList()
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