<template>
    <div class="form">
        <input type="text" v-model="category" placeholder="category"/>
        <button @click="onSave">Add Category</button>
    </div>
</template>
<script>
export default {
    name: 'AddCategoryForm',
    data(){
        return{
            category: '',
        }
    },
    computed: {

    },
    methods: {
        onSave(){
            this.$store.commit('setNewCategory', this.category)
        },
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
</style>