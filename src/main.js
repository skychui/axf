// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Store from './store'

//使用mint-ui
import { Swipe, SwipeItem,Indicator} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.prototype.loading = Indicator

//引入HTTP库
import axios from 'axios'
Vue.prototype.$http = axios



//引入初始化JS文件
import "@/styles/reset.js"
//引入通用css
import "@/styles/index.less";

//引入路由
import router from "./router";

//引入Vuex
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
