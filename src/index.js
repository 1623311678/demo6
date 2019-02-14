import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import './flexible.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(ElementUI);
const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
 
  render: (h) => h(App)
}).$mount(root)
/*new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})*/