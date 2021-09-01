<template>
    <v-card class="text-left pa-8">
        <v-text-field v-model="category" label="category" />
        <v-btn @click="onSave">Add Category</v-btn>
    </v-card>
</template>
<script>
export default {
    name: 'AddCategoryForm',
    data(){
        return{
            category: '',
        }
    },
    methods: {
        onSave(){
            this.$store.commit('setNewCategory', this.category)
            this.$emit('close')
        },
    },
}
</script>
<style scoped>

</style>