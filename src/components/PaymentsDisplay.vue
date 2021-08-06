<template>
    <table class="list">
        <tr class="item">
            <td>#</td>
            <td>Date</td>
            <td>Category</td>
            <td>Value</td>
        </tr>
        <tr class="item" v-for="(item, idx) in list" :key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
        </tr>
    </table>
</template>
<script>
export default {
    name: 'PaymentsDisplay',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        elsPerPage: {
            type: Number,
            default: () => 3
        }
    }
}
</script>

<style scoped>
    td {
        border: 1px solid;
        padding: 8px;
    }
</style>
