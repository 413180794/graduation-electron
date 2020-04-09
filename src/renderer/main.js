import Vue from 'vue'

import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.use(ElementUI);

import thrift from 'thrift'

const predictService = require('../../static/thrift_js/predictService');
const connection = thrift.createConnection('127.0.0.1', 8088);


new Vue({
    components: {App},
    store,
    template: '<App/>',
    data() {
        return {
            client: null,
            task1_result_json_path: '',
            task2_result_json_path: '',
            task3_result_json_path: '',
            task4_result_json_path: '',
        }
    },
    created: function () {
        connection.on('error', (msg) => {
            this.$store.dispatch('ThriftClient/set_connection_state', false) // 重置链接
        });
        connection.on('connect', () => {
            console.log('连接RPC成功');
            this.client = thrift.createClient(predictService, connection);
            this.$store.dispatch('ThriftClient/set_connection_state', true);
            this.client.get_task1_result_json_path((err, path) => {
                this.task1_result_json_path = path;
            });
            this.client.get_task2_result_json_path((err, path) => {
                this.task2_result_json_path = path;
            });
            this.client.get_task3_result_json_path((err, path) => {
                this.task3_result_json_path = path;
            });
            this.client.get_task4_result_json_path((err, path) => {
                this.task4_result_json_path = path;
            });
        });
        connection.on('close', () => {
            alert('连接关闭');
            this.$store.dispatch('ThriftClient/set_connection_state', false);// 重置链接
        });
    },
    methods: {
        taskOneOperate(images, callback) {
            console.log("images->MAIN",images);
            if (this.client === null) {
                alert('错误,请联系维修人员.错误类型:RPC未连接')
                return false;
            } else {
                this.client.seg_predict_images_task1(images, callback);
            }
        },
        taskTwoOperate(images, callback) {
            // 任务二操作
            if (this.client === null) {
                alert('错误,请联系维修人员.错误类型:RPC未连接')
            } else {
                this.client.seg_predict_images_task2(images, callback)
            }
        },

        taskThreeOperate(images, callback) {
            // 任务三操作
            if (this.client === null) {
                alert('错误,联系维修人员.错误类型:RPC未连接.');
            } else {
              this.client.cls_predict_images_task3(images, callback);
            }
        },

        taskFourOperate(images, callback) {
            // 任务四操作
            if (this.client === null) {
                alert('错误,联系维修人员.错误类型:RPC为联系')
            } else {
                this.client.cls_predict_images_task4(images, callback);
            }
        }
    },
}).$mount('#app');
