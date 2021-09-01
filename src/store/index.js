import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        paymentsListOnPage: [],
        categories: [],
        page: 1
    },
    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = payload
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoriesData(state, payload) {
            state.categories = payload
        },
        setNewCategory(state, payload) {
            state.categories.push(payload)
        },
        editDataPayment(state, payload) {
            const editedPayment = state.paymentsList.find(item => item.id == payload.id)
            editedPayment.date = payload.date
            editedPayment.value = payload.value
            editedPayment.category = payload.category
        },
        deletePayment(state, payload) {
            state.paymentsList = state.paymentsList.filter(item => item.id != payload)
        }
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategories: state => state.categories,
        getFullPaymentValueInCategory: state => cat => {
            const paymentsInCategory = state.paymentsList.filter(item => item.category == cat)
            return paymentsInCategory.reduce((res,cur) => res + cur.value, 0)
        },
    },
    actions: {
        fetchCategoryList({commit}){
            return new Promise((resolve) =>{
                setTimeout(() => {
                    const categories = ['Sport', 'Food', 'Education', 'Internet', 'Transport', 'Other']
                    resolve(categories)
                }, 1000)
            })
            .then(res => commit('setCategoriesData', res))
        },
        fetchData({commit}){
            if(this.state.paymentsList.length) return
            return new Promise((resolve) =>{
                setTimeout(() => {
                    const items = []
                    for (let i=0; i<20; i++){
                        items.push({
                            date: "05.08.2021",
                            category: "Sport",
                            value: i+1,
                            id: i+1
                        })
                    }
                    resolve(items)
                }, 2000)
            })
            .then(res => commit('setPaymentListData', res))
        },
        addData({commit}, payload){
            commit('addDataToPaymentList', payload)
        }
    }
})