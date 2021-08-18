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
        setPaymentListData(state, payload){
            state.paymentsList = payload
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoriesData(state, payload){
            state.categories = payload
        },
        setPage(state, payload){
            state.page = payload
        },
        setNewCategory(state, payload) {
            state.categories.push(payload)
        },
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategories: state => state.categories,
        getPaymentsListOnPage: (state, getters) => (page) => {
            return getters.getPaymentsList[`page${page}`]
        },
        getPageNumbers: state => Object.keys(state.paymentsList).length
    },
    actions: {
        fetchCategoryList({commit}){
            return new Promise((resolve) =>{
                setTimeout(() => {
                    const categories = ['Sport', 'Food', 'Education', 'Internet', 'Other']
                    resolve(categories)
                }, 2000)
            })
            .then(res => commit('setCategoriesData', res))
        },
        /*fetchData({commit}){
            if(this.state.paymentsList.length) return
            return new Promise((resolve) =>{
                setTimeout(() => {
                    const items = []
                    for (let i=0; i<20; i++){
                        items.push({
                            date: "05.08.2021",
                            category: "Sport",
                            value: i
                        })
                    }
                    resolve(items)
                }, 2000)
            })
            .then(res => commit('setPaymentListData', res))
        }*/
        fetchData({commit}){
            if(this.state.paymentsList.length) return
            return new Promise((resolve) =>{
                setTimeout(() => {
                    resolve({
                        "page1": [
                            { "id": 1, "date": "20.03.2020", "category": "Food", "value": 169 },
                            { "id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50 },
                            { "id": 3, "date": "22.03.2020", "category": "Sport", "value": 450 }
                          ],
                          "page2": [
                            { "id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969 },
                            { "id": 5, "date": "24.03.2020", "category": "Education", "value": 1500 },
                            { "id": 6, "date": "25.03.2020", "category": "Food", "value": 200 }
                          ],
                          "page3": [
                            { "id": 7, "date": "26.03.2020", "category": "Entertaiment", "value": 969 },
                            { "id": 8, "date": "27.03.2020", "category": "Education", "value": 1500 },
                            { "id": 9, "date": "28.03.2020", "category": "Food", "value": 200 }
                          ],
                          "page4": [
                            { "id": 10, "date": "29.03.2020", "category": "Entertaiment", "value": 969 },
                            { "id": 11, "date": "30.03.2020", "category": "Education", "value": 1500 },
                            { "id": 12, "date": "31.03.2020", "category": "Food", "value": 200 }
                          ],
                        })
                }, 1000)
            })            
            .then(res => commit('setPaymentListData', res),)
        }
    }
})