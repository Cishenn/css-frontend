// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import china from 'echarts/map/json/china.json'
import axios from 'axios'


// VUE 使用echarts
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false

// 引入中国地图
echarts.registerMap('china', china)

// axios配置
const instance = new axios.create({
    // 此处是后端的url
    baseURL: 'http://localhost:8080/ccs',
    timeout: '1000'
});
// axios 实例加载到VUE上
Vue.prototype.$axios = instance;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})