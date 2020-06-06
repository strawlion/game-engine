import Vue from 'vue'
import App from './components/App.vue'

Vue.config.productionTip = false

const appContainer = document.createElement('div');
appContainer.id = 'app';
document.body.append(appContainer);

new Vue({
  render: h => h(App),
}).$mount(appContainer)
