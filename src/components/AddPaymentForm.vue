<template>
    <div class="form">
        <input type="text" v-model="date" placeholder="date"/>
        <input type="number" v-model.number="value" placeholder="value"/>
        <input type="text" v-model="category" placeholder="category"/>
        <button @click="onSave">Add</button>
    </div>
</template>
<script>
export default {
    name: 'AddPaymentForm',
    data(){
        return{
            value: '',
            category: '',
            date: ''
        }
    },
    computed: {
        getCurrentDate(){
            const today = new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        }
    },
    methods: {
        onSave(){
            const { value, category } = this
            const data = {
                date: this.date || this.getCurrentDate,
                value,
                category
            }
            console.log('emit: addNewPayment',data)
            this.$emit('addNewPayment', data)
        }
    }
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
</style>