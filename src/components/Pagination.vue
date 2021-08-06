<template>
    <div>
        <span class="page" @click="choosePage(cur-1)">-</span>
        <span class="page" :class="{active:cur===page}" v-for="(page) in pages"
        :key="page"
        @click="choosePage(page)"
        >
            {{ page }}
        </span>
        <span class="page" @click="choosePage(cur+1)">+</span>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: {
        elsPerPage: Number,
        allEls: {
            type: Number,
            default: () => 3
        },
        cur: Number,
    },
    computed: {
        pages() {
            return Math.ceil(this.allEls/this.elsPerPage)
        }
    },
    methods: {
        choosePage(page) {
            if (page<1 || page>this.pages)
                return
                this.$emit('goToPage', page)
        }
    }
}
</script>
<style scoped>
    .page{
        font-size: 18px;
        cursor: pointer;
        padding: 8px;
        font-weight: 600;
    }
    .active{
        color:#00a6a6;;
    }
</style>