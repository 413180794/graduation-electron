// import thrift from 'thrift'
// import {nativeImage} from 'electron'

import date from 'silly-datetime'
import path from 'path'
import Vue from 'vue'
// import fs from 'fs'

const namespaced = true;
// images用于存放当前程序中所有的图像地址
// task*列表中存放当前程序中识别后的图像
const state = {
    images: [],
    image_percentage: {},
    click_index: 0, // 用户点击的图片的序号
    task1_result: [],
    task2_result: [],
    task3_result: [],
    task4_result: [],
    connected: false,

};
const getters = {
    click_image: function (state) {
        return 'file://' + state.images[state.click_index]
    },
    click_index: function (state) {
        return state.click_index;
    },
    percentage: function (state) {
        return state.image_percentage;
    },
    items: function (state) {
        // 这里考虑将一张图制作成以下几种图
        // 原图-缩略图（长宽乘以30%）-中型图（长宽乘以60%）
        return state.images.map(function (image) {
            return {
                src: 'file://' + image,
                filePath: image,
                date: date.format(new Date(), 'YYYY-MM-DD'),
                patientName: '张帆',
            }
        })
    },
    taskOneResultAll(state) {
        return state.task1_result.map(function (image) {
            return {
                src: 'file://' + image,
                filePath: image,
                caption: path.basename(image)
            }
        })
    },
    taskTwoResultAll(state) {
        return state.task2_result
    },
    taskThreeResultAll(state) {
        return state.task3_result
    },
    taskFourResultAll(state) {
        return state.task4_result
    },
    images(state) {
        return state.images
    },
    connected(state) {
        return state.connected
    }
};

// mutation只能实现同步变更state对象。如果需要实现异步变更，
// 那么 应该使用action
const mutations = {
    SET_CLICK_INDEX(state, index) {
        state.click_index = index;
    },
    SET_IMAGE_PERCENTAGE(state) {
        state.image_percentage = {}
    },
    UPDATE_IMAGE_PERCENTAGE(state, image_path) {

        let percentage = state.image_percentage[image_path];
        if (percentage === undefined) {
            Vue.set(state.image_percentage,image_path,25);
        } else if (percentage >= 100) {
            Vue.set(state.image_percentage,image_path,100);
        } else {
            Vue.set(state.image_percentage, image_path, percentage + 25);
            // state.image_percentage[image_path] = percentage + 25;
        }
        // console.log('UPDATE_IMAGE_PERCENTAGE->percentage',state.image_percentage);
    },
    SET_CONNECTION_STATE(state, connected) {
        // 设置connect的状态，false表示已经连接，true表示未连接
        state.connected = connected
    },
    SET_IMAGES(state, images) {
        //  重新设置图片数组
        state.images = images;
        // state.percentage = new Array(images.size()).fill(0);
        // console.log(state.percent)
    },
    CLEAR_IMAGES(state) {
        // 清空数组
        state.images.splice(0, state.images.length)
    },
    ADD_TASK1_RESULT(state, result) {
        state.task1_result.push(result)
    },
    SET_TASK1_RESULT(state, task1Result) {
        // 设置任务一识别结果
        state.task1_result = task1Result
    },
    SET_TASK2_RESULT(state, task2Result) {
        // 置任务二识别结果
        state.task2_result = task2Result
    },
    SET_TASK3_RESULT(state, task3Result) {
        state.task3_result = task3Result
    },
    SET_TASK4_RESULT(state, task4Result) {
        state.task4_result = task4Result
    },
    CLEAR_TASK1_RESULT(state) {
        state.task1_result.splice(0, state.task1_result.length)
    },
    CLEAR_TASK2_RESULT(state) {
        state.task2_result.splice(0, state.task2_result.length)
    },
    CLEAR_TASK3_RESULT(state) {
        state.task3_result.splice(0, state.task3_result.length)
    },
    CLEAR_TASK4_RESULT(state) {
        state.task4_result.splice(0, state.task4_result.length)
    }
};
// 直接返回 promise而不是使用回调函数
const actions = {
    set_click_index({commit}, index) {
        commit('SET_CLICK_INDEX', index);
    },
    set_image_percentage({commit}, percentage) {
        commit('SET_IMAGE_PERCENTAGE', percentage);
    },
    update_image_percentage({commit}, image_path) {
        commit('UPDATE_IMAGE_PERCENTAGE', image_path);
    },
    change_image_percentage({commit}, index, percentage) {
        commit('CHANGE_IMAGE_PERCENTAGE', index, percentage);
    },
    set_connection_state({commit}, connected) {
        commit('SET_CONNECTION_STATE', connected);
    },
    set_images({commit}, images) {
        return new Promise((resolve) => {
            commit('SET_IMAGES', images);
            resolve('图片数组设置成功');
        })
    },
    clear_images({commit}) {
        return new Promise((resolve) => {
            commit('CLEAR_IMAGES');
            resolve('图片数组清除成功');
        })
    },
    set_task1_result({commit}, taskOneResult) {
        commit('SET_TASK1_RESULT', taskOneResult);
    },
    add_task1_result({commit}, taskOneResult) {
        commit('ADD_TASK1_RESULT', taskOneResult);
    },
    clear_task1_result({commit}) {
        return new Promise((resolve) => {
            commit('CLEAR_TASK1_RESULT');
            resolve('任务一结果数组清除成功');
        })
    },
    clear_task2_result({commit}) {
        return new Promise((resolve) => {
            commit('CLEAR_TASK2_RESULT');
            resolve('任务二结果数组清除成功');
        })
    },
    clear_task3_result({commit}) {
        return new Promise((resolve) => {
            commit('CLEAR_TASK3_RESULT');
            resolve('任务三结果数组清除成功');
        })
    },
    clear_task4_result({commit}) {
        return new Promise((resolve) => {
            commit('CLEAR_TASK4_RESULT');
            resolve('任务四结果数组清除成功');
        })
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced
}
