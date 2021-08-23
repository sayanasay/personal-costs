<template>
    <table class="list">
        <tr class="item">
            <td>#</td>
            <td>Date</td>
            <td>Category</td>
            <td>Value</td>
            <td>Edit</td>
        </tr>
        <tr class="item" v-for="(item, idx) in list" :key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.value }}</td>
            <td class="edit" @click.stop="showPopupWindow(idx, item.id)" ref="clickPoint">...</td>
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
    },
    methods: {
        showPopupWindow(idx, id) {
            const left = this.$refs.clickPoint[idx].getBoundingClientRect().left
            const bottom = this.$refs.clickPoint[idx].getBoundingClientRect().bottom
            this.$popup.show({paymentId: id, bottomPosition: bottom, leftPosition: left})
        }
    }
}
</script>

<style scoped>
    td {
        border: 1px solid;
        padding: 8px;
    }
    .edit{
        cursor: pointer;
    }
    .edit:hover{
        background:#9adbdb;
    }
</style>
