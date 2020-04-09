<template>
    <div class="layout-sider" :style="layout_sider_style">
        <!--        TODO 添加@mousedown，实现移动功能-->
        <div class="s-resize"></div>
        <div class="predict-list-manager clearfix">
            <div class="wrapper-predict-list ct_pneumonia" style="height: 70vh;">
                <div class="tx-pneumonia__base">
                    <div class="tx-pneumonia__header"><img src="../assets/reports.svg"><span>皮肤病识别结果报告</span></div>
                    <div class="tx-pneumonia__base__info">
                        <v-chart :options="taskThreeOptions" theme="dark" :autoresize="true"/>
                    </div>
                </div>
                <div class="tx-pneumonia__analysis">
                    <div class="tx-pneumonia__header"><img src="../assets/reports.svg"><span>病灶良性恶性识别结果报告</span>
                        <div class="tx-pneumonia__header__btn">
                            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 18"
                                 style="fill: currentcolor; vertical-align: middle; cursor: pointer; width: 1.2rem; height: 1.2rem;">
                                <g>
                                    <g>
                                        <g id="Group-17">
                                            <g id="Group-13">
                                                <rect id="Rectangle" x="3.15" y="9.62" width="3.77" height="4.85"
                                                      rx="0.5" ry="0.5"></rect>
                                                <rect id="Rectangle-Copy-7" x="8" y="2.08" width="3.77" height="12.39"
                                                      rx="0.5" ry="0.5"></rect>
                                                <rect id="Rectangle-Copy-8" x="12.85" y="6.39" width="3.77"
                                                      height="8.08" rx="0.5" ry="0.5"></rect>
                                                <path d="M18.59,17.24H1a.75.75,0,0,1-.75-.75V1A.76.76,0,0,1,1,.25.76.76,0,0,1,1.75,1V15.74H18.59a.75.75,0,1,1,0,1.5Z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            密度直方图
                        </div>
                        <v-chart :options="taskFourOptions" theme="dark" :autoresize="true"/>
                    </div>
                </div>
            </div>
            <div class="report-wrap" style="position: relative; flex: 1 1 0%;">
                <div class="report-wrap-div" style="top: 0px;">
                    <div class="v-vertical"></div>
                    <div class="wrapper-report-textarea-lung">
                        <div class="footer-header">
                            <div class="reportViewHeader" style="display: flex; width: 100%; align-items: center;">
                                <div style="padding: 0px 16px;">
                                    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 12.58 15.23"
                                         style="fill: currentcolor; vertical-align: middle; cursor: default; width: 1.1rem; height: 1.1rem; color: rgb(160, 166, 180); margin-right: 6px;">
                                        <g>
                                            <g>
                                                <polygon class="cls-1"
                                                         points="9.57 12.22 9.57 15.22 12.57 12.22 9.57 12.22"></polygon>
                                                <path class="cls-1"
                                                      d="M8.57,11.22h4V1a1,1,0,0,0-1-1H1A1,1,0,0,0,0,1V14.22a1,1,0,0,0,1,1H8.57ZM1.32,3H6V4.3H1.32Zm0,2.64h9.93V7H1.32Zm0,2.65h9.93V9.59H1.32Zm0,4V10.92H4v1.32Z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span style="font-size: 15px;">诊断报告</span></div>
                                <div style="display: flex; justify-content: flex-end; flex: 1 1 auto;">
                                    <div class="graphic-text-Button" style="text-align: center; display: inline-block;">
                                        <div style="color: rgb(160, 167, 180); cursor: pointer;">
                                            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 14 14"
                                                 style="fill: currentcolor; vertical-align: middle; cursor: pointer; width: 1.1rem; height: 1.1rem;">
                                                <g>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <path d="M11.4382333,1.27096668 L11.4382333,1.8189894e-12 L1.27073332,1.8189894e-12 C0.572016662,1.8189894e-12 0,0.5719 0,1.27108334 L0,11.4384667 L1.27096666,11.4384667 L1.27096666,1.27096668 L11.4382333,1.27096668 Z M13.98005,12.7092 L13.98005,3.81278334 C13.98005,3.11371668 13.40815,2.54181668 12.7090833,2.54181668 L3.81266666,2.54181668 C3.1136,2.54181668 2.5417,3.11371668 2.5417,3.81278334 L2.5417,12.7092 C2.5417,13.4082667 3.1136,13.9801667 3.81266666,13.9801667 L12.7090833,13.9801667 C13.40815,13.9801667 13.98005,13.4082667 13.98005,12.7092 Z M12.7090833,12.7092 L3.81266666,12.7092 L3.81266666,3.81278334 L12.7090833,3.81278334 L12.7090833,12.7092 L12.7090833,12.7092 Z"
                                                              id="Shape" fill="#A0A7B4" fill-rule="nonzero"
                                                              transform="translate(6.990025, 6.990083) scale(-1, 1) translate(-6.990025, -6.990083) "></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-content"><label>
<textarea placeholder="在此填写诊断报告"
          class="ant-input footer-content-textarea report-textarea">

</textarea>
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import eventBus from "../../main/eventBus";
    import ECharts from "vue-echarts";
    import echarts from 'echarts';
    import fs from 'fs';
    export default {
        name: 'LayoutSider',
        data() {
            return {
                layout_sider_style: 'width: 480px;',
                taskThreeOptions: {
                    title: {
                        x: 'center',
                        text: '病灶诊断预测结果',
                        subtext: '',
                        link: '',
                    },
                    dataZoom: {// 这个dataZoom组件，若未设置xAxisIndex或yAxisIndex，则默认控制x轴。
                        show: false,
                        type: 'inside'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'pie']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        y: 80,
                        y2: 60
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['基地细胞癌', '上皮内癌', '良性角化病', '皮肤纤维瘤', '血管病变', '黑素细胞痣', '黑色素瘤']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '概率预测',
                            type: 'bar',
                            data: [0,0,0,0,0,0,0],
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        // build a color map as your need.
                                        let colorList = [
                                            '#C1232B', '#B5C334'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{b}\n{c}'
                                    }
                                }
                            },
                            markPoint: {
                                tooltip: {
                                    trigger: 'item',
                                    backgroundColor: 'rgba(0,0,0,0)'
                                },
                                data: [
                                    {xAxis: 0, y: 1, name: '基地细胞癌'},
                                    {xAxis: 1, y: 1, name: '上皮内癌'},
                                    {xAxis: 2, y: 1, name: '良性角化病'},
                                    {xAxis: 3, y: 1, name: '皮肤纤维瘤'},
                                    {xAxis: 4, y: 1, name: '血管病变'},
                                    {xAxis: 5, y: 1, name: '黑素细胞痣'},
                                    {xAxis: 6, y: 1, name: '黑色素瘤'}
                                ]
                            }
                        }
                    ]
                },
                taskFourOptions: {
                    title: {
                        x: 'center',
                        text: '病灶良性恶性预测结果',
                        subtext: '',
                        link: ''
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    grid: {
                        borderWidth: 0,
                        y: 80,
                        y2: 60
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['良性肿瘤', '恶性肿瘤']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '概率预测',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        // build a color map as your need.
                                        let colorList = [
                                            '#C1232B', '#B5C334'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{b}\n{c}'
                                    }
                                }
                            },
                            data: [0,0],
                            markPoint: {
                                tooltip: {
                                    trigger: 'item',
                                    backgroundColor: 'rgba(0,0,0,0)'
                                },
                                data: [
                                    {xAxis: 0, y: 1, name: '良性肿瘤'},
                                    {xAxis: 1, y: 1, name: '恶性肿瘤'}
                                ]
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            // resize_down(event) {
            //     console.log(event);
            //     let div = event.target;
            //     let disX = event.clientX - div.offsetLeft;
            //     console.log(disX);
            //     document.onmousemove = (e) => {
            //         let left = e.clientX - disX;
            //         // 鼠标向右 left是正值+  鼠标向左 left是负值-
            //         console.log(left);
            //         let sider_width = this.layout_sider_style.replace(/[^0-9]/ig, "");
            //         console.log(sider_width)
            //         let new_sider_width = - left
            //         if (new_sider_width >= 480){
            //             new_sider_width = 480;
            //         } else if (new_sider_width <= 0){
            //             new_sider_width = 0;
            //         }
            //         this.layout_sider_style = 'width: ' + new_sider_width + 'px';
            //         console.log(this.layout_sider_style)
            //     };
            //     document.onmouseup = (e) => {
            //         document.onmousemove = null;
            //         document.onmouseup = null;
            //     }
            // }
        },
        created() {
            eventBus.$on('openOrCloseSiderClick', () => {
                // 开或者关
                if (this.layout_sider_style !== 'width: 0') {
                    this.layout_sider_style = 'width: 0';
                } else {
                    this.layout_sider_style = 'width: 480px';
                }
            });
            eventBus.$on('taskThreeResultUpdate', (image_path) => {

                fs.readFile(this.$root.task3_result_json_path, (err, data) => {
                    if (err) {
                        return console.error(err);
                    }
                    const result_dict = JSON.parse(data.toString());
                    console.log(result_dict[image_path]);
                    let taskThreeSeriesData = result_dict[image_path];
                    if (taskThreeSeriesData === undefined) {
                        taskThreeSeriesData = [0, 0, 0, 0, 0, 0, 0];
                    }
                    this.taskThreeOptions.series[0].data = taskThreeSeriesData;
                });
            });
            eventBus.$on('taskFourResultUpdate', (image_path) => {
                fs.readFile(this.$root.task4_result_json_path, (err, data) => {
                    if (err) {
                        return console.error(err);
                    }
                    const result_dict = JSON.parse(data.toString());
                    console.log(result_dict[image_path]);
                    let taskFourSeriesData = result_dict[image_path];
                    if (taskFourSeriesData === undefined) {
                        taskFourSeriesData = [0, 0, 0, 0, 0, 0, 0];
                    }
                    this.taskFourOptions.series[0].data = taskFourSeriesData;

                });
            });
        },
        components: {
            'v-chart': ECharts,
            echarts
        },
        destroyed() {
            eventBus.$off('taskThreeResultUpdate');
            eventBus.$off('taskFourResultUpdate');
        }
    }
</script>

<style scoped>

    .layout-sider {
        background: #303035;
        max-width: 480px;
        position: relative;
        border-left: 1px solid #1b1a1c;
        color: #fff;
    }

    .tx-pneumonia__header__btn {
        position: absolute;
        right: 0;
        cursor: pointer;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        margin: 8px 14px 8px 8px;
        font-size: 12px;
        color: #fff;
        background: -webkit-gradient(linear, left top, right top, from(#00adff), to(#0251f6));
        background: linear-gradient(90deg, #00adff, #0251f6);
        border-radius: 4px;
    }

    .s-resize {
        width: 10px;
        height: 100%;
        background: red;
        position: absolute;
        top: 0;
        left: -4px;
        z-index: 99;
        cursor: col-resize;
        overflow: hidden;
        opacity: 0;
    }

    .predict-list-manager {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        position: absolute;
        width: 100%;
        height: 100% !important;
    }

    .clearfix {
        zoom: 1;
    }

    .wrapper-predict-list.ct_pneumonia {
        overflow-y: auto !important;
        display: flex;
        flex-direction: column;
        min-width: 479px;
    }

    .v-vertical {
        width: 100%;
        height: 10px;
        position: absolute;
        top: 0;
        cursor: row-resize;
        overflow: hidden;
        z-index: 999;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .report-wrap-div {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
    }

    .wrapper-predict-list {
        position: relative;
        right: 0;
        width: 100%;
        background: #27272b !important;
    }

    .tx-pneumonia__base {
        font-size: 16px;
        padding-bottom: 20px;
        background-color: #303035;
    }

    .tx-pneumonia__header {
        position: relative;
        height: 38px;
        line-height: 36px;
        background-color: #1e2024;
        font-size: 14px;
    }

    .tx-pneumonia__analysis {
        flex: 1 1;
    }

    .report-wrap-div {
        position: absolute;
        left: 0;
        top: 0 !important;
        right: 0;
        bottom: 0;
        border-left: 1px solid #1b1a1c;
    }

    .v-vertical {
        width: 100%;
        height: 10px;
        position: absolute;
        top: 0;
        cursor: row-resize;
        overflow: hidden;
        z-index: 999;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .wrapper-report-textarea-lung {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .wrapper-report-textarea-lung .footer-header {
        display: flex;
    }

    .wrapper-report-textarea-lung .footer-header {
        border-top: 1px solid #1b1a1c;
        background-color: #1e2024;
        padding: 5px 0;
        height: 38px;
        line-height: 36px;
    }

    .wrapper-report-textarea-lung .footer-content {
        position: absolute;
        top: 44px;
        bottom: 50px;
        left: 0;
        right: 0;
    }

    .wrapper-report-textarea-lung .footer-content-textarea {
        flex: 1 1;
        height: 100%;
        background-color: #303035;
        color: #eee;
        border: none;
        outline: none;
    }

    textarea.ant-input {
        max-width: 100%;
        height: auto;
        vertical-align: bottom;
        -webkit-transition: all .3s, height 0s;
        transition: all .3s, height 0s;
        min-height: 32px;
    }

    .report-textarea {
        resize: none;
    }

    .ant-input {
        font-family: "Monospaced Number", Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        margin: 0;
        list-style: none;
        position: relative;
        display: inline-block;
        padding: 4px 11px;
        width: 100%;
        height: 32px;
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        -webkit-transition: all .3s;
        transition: all .3s;
    }

    textarea {
        overflow: auto;
        resize: vertical;
    }

    textarea {
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        color: initial;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        -webkit-appearance: textarea;
        background-color: white;
        -webkit-rtl-ordering: logical;
        flex-direction: column;
        resize: auto;
        cursor: text;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        margin: 0em;
        font: 400 13.3333px Arial;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(169, 169, 169);
        border-image: initial;
        padding: 2px;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .echarts {
        width: 480px;
        height: 300px;
    }

    .tx-pneumonia__header img {
        width: 16px;
        height: 16px;
        margin-left: 16px;
        margin-right: 10px;
    }

    img {
        vertical-align: middle;
        border-style: none;
    }

</style>
