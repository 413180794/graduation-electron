<template>
    <div>
        <div class="study-group">
            <div class="study-group-info">
                <div class="info-left">
                    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 18 18"
                         style="fill: currentcolor; vertical-align: middle; cursor: default; width: 1.1rem; height: 1.1rem;">
                        <g>
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="前后片对比备份-74" transform="translate(-70.000000, -68.000000)" fill="#1E2024"
                                   stroke="#A0A7B4" stroke-width="1.02857143">
                                    <g id="编组-11" transform="translate(58.000000, 51.000000)">
                                        <g id="编组-8">
                                            <g id="Group-17" transform="translate(12.000000, 17.000000)">
                                                <rect id="Rectangle-Copy-7" x="6.51428571" y="6.51428571"
                                                      width="10.9714286"
                                                      height="10.9714286" rx="1.28571429"></rect>
                                                <rect id="Rectangle-Copy-3" x="3.51428571" y="3.51428571"
                                                      width="10.9714286"
                                                      height="10.9714286" rx="1.28571429"></rect>
                                                <rect id="Rectangle" x="0.514285714" y="0.514285714" width="10.9714286"
                                                      height="10.9714286" rx="1.28571429"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div class="study-group-desc">
                        <el-tooltip effect="dark" :content="date" placement="top">
                            <p class="overflow-text">{{ date }}</p>
                        </el-tooltip>
                        <p><span style="color: rgb(160, 167, 180); padding-right: 4px;">姓名:</span>{{ patientName }}</p>
                    </div>
                </div>
                <div class="info-right">
                    <el-tooltip effect="dark" content="缩略图" placement="right">
                        <div class="study-group-arrow" @click="onArrowClicked">
                            <svg ref="rightArrow" preserveAspectRatio="xMidYMid meet" viewBox="0 0 7 10"
                                 style="fill: currentcolor; vertical-align: middle; cursor: pointer; width: 0.8rem; height: 0.8rem;">
                                <g>
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="前后片对比备份-49" transform="translate(-244.000000, -451.000000)"
                                           stroke="#A0A7B4"
                                           stroke-width="1.5">
                                            <g id="编组-5" transform="translate(58.000000, 427.000000)">
                                                <g id="编组-8备份-3" transform="translate(0.000000, 2.000000)">
                                                    <g id="Group-46备份-2"
                                                       transform="translate(188.000000, 27.000000) scale(1, -1) translate(-188.000000, -27.000000) translate(180.000000, 19.000000)">
                                                        <polyline id="Rectangle-3"
                                                                  transform="translate(7.000000, 8.000000) scale(1, -1) rotate(225.000000) translate(-7.000000, -8.000000) "
                                                                  points="10 11 4 11 4 5"></polyline>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <svg ref="downArrow" preserveAspectRatio="xMidYMid meet"
                                 viewBox="0 0 10 7"
                                 style="display: none; fill: currentcolor; vertical-align: middle; cursor: pointer; width: 0.8rem; height: 16px;">
                                <g>
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="前后片对比备份-49" transform="translate(-241.000000, -453.000000)"
                                           stroke="#A0A7B4"
                                           stroke-width="1.5">
                                            <g id="编组-5" transform="translate(58.000000, 427.000000)">
                                                <g id="编组-8备份-3" transform="translate(0.000000, 2.000000)">
                                                    <g id="Group-46备份-2"
                                                       transform="translate(188.000000, 27.000000) scale(1, -1) translate(-188.000000, -27.000000) translate(180.000000, 19.000000)">
                                                        <polyline id="Rectangle-3"
                                                                  transform="translate(8.042641, 9.942640) scale(1, -1) rotate(-45.000000) translate(-8.042641, -9.942640) "
                                                                  points="11.0426407 12.9426403 5.04264069 12.9426403 5.04264069 6.94264031"></polyline>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div :style="thumbnailStyle">
            <div class="thumbnail-entry-container thumbnail-entry-container-focused">
                <div class="drag-container" draggable="true">
                    <div class="image-thumbnail">
                        <div class="image-thumbnail-div">
                            <el-image
                                    :src="imgPath"
                                    draggable="false" alt="thumbnail"/>
                        </div>
                        <div class="state-description">
                            <div style="display: flex; align-items: center">
                                <img src="../assets/recState.svg" alt="识别状态"/>
                                <span><span style="color: rgb(63, 135, 245);">{{ isFinished }}</span></span>
                            </div>
                            <el-tooltip effect="dark" content="开始识别" placement="top">
                                <img style="" src="../assets/recognize.svg" alt="开始识别" @click="startRecognize"/>
                            </el-tooltip>
                        </div>
                        <el-tooltip effect="dark" :content="isFinished" placement="top">
                            <el-progress :stroke-width="5" :show-text="false"
                                         :percentage="percentage"></el-progress>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import eventBus from "../../main/eventBus";

    export default {
        name: 'Thumbnail',
        data() {
            return {
                thumbnailState: false, // 缩略图区域状态,false表示不展开,true表示展开,
                percentage: 0,
                isFinished: '未识别',
                image_path: '',
            }
        },
        props: {
            date: String,
            imgPath: String,
            patientName: String,
            image_index: Number
        },
        methods: {
            onArrowClicked(event) {
                //  点击箭头，改变箭头的样式．显示出缩略图
                if (this.thumbnailState === true) {
                    // 如果当前状态是true,表示要由展开状态关闭
                    this.$refs.rightArrow.style.display = '';
                    this.$refs.downArrow.style.display = 'none';
                } else if (this.thumbnailState === false) {
                    // 由关闭状态展开
                    this.$refs.rightArrow.style.display = 'none';
                    this.$refs.downArrow.style.display = '';
                }
                this.thumbnailState = !this.thumbnailState;
            },
            startRecognize(event) {
                //  开始识别，依次对该图片进行识别，识别出一张图，进度条增加２５％，直到为１００％
                // if (this.percentage === 100) {
                //     alert('识别已完成');
                //     return ;
                // }
                console.log("START_RECOGNIZE---->", this.image_path);
                this.$root.taskOneOperate([this.image_path,], (err, res) => {
                    // 任务一识别完成，需要到json文件中找结果
                    if (err) {
                        alert('任务一识别失败,错误原因：' + err);
                        return false;
                    } else {
                        if (res) {
                            // 任务一完成了
                            console.log('任务一完成');
                            this.$store.dispatch('ThriftClient/update_image_percentage', this.image_path);
                            // 通知主界面去找数据
                            eventBus.$emit('taskOneResultUpdate')
                        }
                    }
                });
                this.$root.taskTwoOperate([this.image_path,], (err, res) => {
                    // 任务二识别完成
                    if (err) {
                        alert('任务一识别失败,错误原因：' + err);
                        return false;
                    } else {
                        if (res) {
                            // 任务一完成了
                            this.$store.dispatch('ThriftClient/update_image_percentage', this.image_path);
                            // 通知主界面去找数据
                            eventBus.$emit('taskOneResultUpdate')
                        }
                    }
                });
                this.$root.taskThreeOperate([this.image_path,], (err, res) => {
                    // 任务二识别完成
                    if (err) {
                        alert('任务三识别失败,错误原因：' + err);
                        return false;
                    } else {
                        if (res) {
                            // 任务一完成了
                            this.$store.dispatch('ThriftClient/update_image_percentage', this.image_path);
                            // 通知主界面去找数据
                            eventBus.$emit('taskThreeResultUpdate',this.image_path)
                        }
                    }
                });
                this.$root.taskFourOperate([this.image_path,], (err, res) => {
                    // 任务二识别完成
                    if (err) {
                        alert('任务一识别失败,错误原因：' + err);
                        return false;
                    } else {
                        if (res) {
                            // 任务一完成了
                            this.$store.dispatch('ThriftClient/update_image_percentage', this.image_path);
                            // 通知主界面去找数据
                            eventBus.$emit('taskFourResultUpdate',this.image_path)
                        }
                    }
                });
            }
        },
        computed: {
            thumbnailStyle: function () {
                if (this.thumbnailState === true) {
                    return {
                        display: 'block'
                    }
                } else if (this.thumbnailState === false) {
                    return {
                        display: 'none'
                    }
                }
            },
            img_percentage:function(){
                return this.$store.getters['ThriftClient/percentage'][this.image_path];
            }
        },
        watch: {
            img_percentage(percentage){
                this.percentage = percentage;
                console.log('WATCH->image_percentage', this.percentage, this.image_path);
                if (this.percentage === 100) {
                    this.isFinished = '已识别';
                } else {
                    this.isFinished = '未识别';
                }
            }
            // '$store.state.ThriftClient.image_percentage': {
            //     deep: true,
            //     handler: function (percentages) {
            //         this.percentage = percentages[this.image_path];
            //         // console.log('WATCH->image_percentage', this.percentage, this.image_path);
            //         if (this.percentage === 100) {
            //             this.isFinished = '已识别'
            //         } else {
            //             this.isFinished = '未识别'
            //         }
            //
            //     }
            // }
        },
        created() {
            //
            console.log('created!!');
            this.image_path = this.imgPath.slice(7);
            console.log(this.image_path)
            let percentage_list = this.$store.getters['ThriftClient/percentage'];
            this.percentage = percentage_list[this.image_path];
            if (this.percentage === 100) {
                this.isFinished = '已识别'
            } else {
                this.isFinished = '未识别'
            }
        }
    }
</script>

<style scoped>
    *, :after, :before {
        box-sizing: border-box;
    }

    .study-group {
        border-top: 2px solid #2a2b2f;
        border-bottom: 1px solid #000;
    }

    .study-group-info {
        display: flex;
        justify-content: space-between;;
        align-items: center;
        height: 50px;
        padding: 6px 12px;
        /*background: #1e2023;*/
    }

    .study-group-desc {
        display: inline-block;
        margin: 0 10px;
        vertical-align: middle;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    .study-group-arrow {
        display: inline-block;
        padding: 0 3px;
        margin-left: 8px;
        background: #2a2b2f;
        color: #a0a7b4;
        cursor: pointer;
    }

    .overflow-text {
        /*width: 68px;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        white-space: nowrap;
    }

    p {
        margin: 0;
        padding: 0;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        color: #FFFFFF;
    }

    .thumbnail-entry-container-focused {
        border: 2px solid #3f83f5;
    }

    .thumbnail-entry-container {
        border: 2px solid #4b4d54;
        margin: 10px;
        background: #1e2023;
        border-radius: 2px;
        /*cursor: pointer;*/
        /*width: 175px;*/
    }

    .thumbnail-entry-container .image-thumbnail-div {
        /*width: 144px;*/
        /*height: 110px;*/
        background: #000;
        margin: 5px auto 0;
    }

    .thumbnail-entry-container .image-thumbnail-div {
        /*width: 124px;*/
        /*height: 110px;*/
        background: #000;
        margin: 5px auto 0;
    }

    .state-description {
        display: flex;
        font-size: 13px;
        padding-top: 2px;
        align-items: center;
        justify-content: space-between;
        /*align-content: space-between;*/
    }

    .state-description img {
        fill: currentColor;
        cursor: pointer;
        width: 1rem;
        height: 1rem;
        margin-left: 10px;
        margin-right: 10px;
    }


</style>
