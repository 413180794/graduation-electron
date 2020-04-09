<template>
    <div class="layout-tool-list">
        <div style="position: absolute;display: flex;height: 100%;width:100%;flex-direction: column;padding-top: 1em;">
            <div style="visibility: hidden;">
                <el-tooltip effect="dark" content="向上" placement="right">
                    <div style="height: 2rem; text-align: center;line-height: 2rem; cursor: pointer; box-sizing: border-box">
                        <img src="../assets/up.svg" alt="import" class="up-down-icon"/>
                    </div>
                </el-tooltip>
            </div>

            <div style="flex: 1 1 0;overflow-y: scroll">
                <el-tooltip effect="dark" content="缩放" placement="right">
                    <div class="tool-div" @click="zoomToolClick" :style="toolDivStyle['zoomTool']">
                        <img src="../assets/zoom.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="窗宽/窗位" placement="right">
                    <div class="tool-div" @click="wwwcToolClick" :style="toolDivStyle['wwwcTool']">
                        <img src="../assets/wwwc.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="移动" placement="right">
                    <div class="tool-div" @click="panToolClick" :style="toolDivStyle['panTool']">
                        <img src="../assets/pan.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
<!--                <el-tooltip effect="dark" content="长度测量" placement="right">-->
<!--                    <div class="tool-div" @click="lengthToolClick" :style="toolDivStyle['lengthTool']">-->
<!--                        <img src="../assets/length.svg" alt="" class="tool-icon"/>-->
<!--                    </div>-->
<!--                </el-tooltip>-->
<!--                <el-tooltip effect="dark" content="角度测量" placement="right">-->
<!--                    <div class="tool-div" @click="angleToolClick" :style="toolDivStyle['angleTool']">-->
<!--                        <img src="../assets/angle.svg" alt="" class="tool-icon"/>-->
<!--                    </div>-->
<!--                </el-tooltip>-->
                <el-tooltip effect="dark" content="放大镜" placement="right">
                    <div class="tool-div" @click="magnifierToolClick" :style="toolDivStyle['magnifierTool']">
                        <img src="../assets/magnifier.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="椭圆工具" placement="right">
                    <div class="tool-div" @click="ellipticalRoiToolClick" :style="toolDivStyle['ellipticalRoi']">
                        <img src="../assets/elliptical.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="矩形工具" placement="right">
                    <div class="tool-div" @click="rectangleRoiToolClick" :style="toolDivStyle['rectangleRoi']">
                        <img src="../assets/rectangle.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="画笔模式" placement="right">
                    <div class="tool-div" @click="freeHandRoiToolClick" :style="toolDivStyle['freeHandRoiTool']">
                        <img src="../assets/freeHandRoi.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="橡皮擦" placement="right">
                    <div class="tool-div" @click="eraserToolClick" :style="toolDivStyle['eraserTool']">
                        <img src="../assets/eraser.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="旋转工具" placement="right">
                    <div class="tool-div" @click="rotateToolClick" :style="toolDivStyle['rotateToolClick']">
                        <img src="../assets/rotate.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="反色" placement="right">
                    <div class="tool-div"
                         @click="invertColorToolClick">
                        <img src="../assets/invert_color.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="毛发去除" placement="right">
                    <div class="tool-div" @click="focusSegToolClick">
                        <img src="../assets/visible.svg" alt="显示" class="tool-icon" style="display: none"/>
                        <img src="../assets/hidden.svg" alt="隐藏" class="tool-icon" style="display: inline-block"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="隐藏病灶分割结果" placement="right">
                    <div class="tool-div" @click="focusSegToolClick">
                        <img src="../assets/visible.svg" alt="显示" class="tool-icon" style="display: none"/>
                        <img src="../assets/hidden.svg" alt="隐藏" class="tool-icon" style="display: inline-block"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="隐藏病灶属性染色结果" placement="right">
                    <div class="tool-div" @click="focusAttrToolClick">
                        <img src="../assets/visible.svg" alt="显示" class="tool-icon" style="display: none"/>
                        <img src="../assets/hidden.svg" alt="隐藏" class="tool-icon" style="display: inline-block"/>
                    </div>
                </el-tooltip>

                <el-tooltip effect="dark" content="恢复设置" placement="right">
                    <div class="tool-div" @click="resumeClick">
                        <img src="../assets/resume.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="水平镜像翻转" placement="right">
                    <div class="tool-div" @click="hFlipClick">
                        <img src="../assets/filp_horizontal.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
            </div>
            <div style="visibility: hidden;">
                <el-tooltip effect="dark" content="向下" placement="right">
                    <div style="height: 2rem; text-align: center;line-height: 2rem; cursor: pointer; box-sizing: border-box">
                        <img src="../assets/down.svg" alt="import" class="up-down-icon"/>
                    </div>
                </el-tooltip>
            </div>
            <div style="display: flex;box-sizing: border-box;justify-content: flex-end;flex-direction: column;margin: 0 0 1em;border-top: 1px solid rgb(27,26,28);">
                <el-tooltip effect="dark" content="图片选择区域" placement="right">
                    <div class="tool-div" id="pic_area"
                         @click="openOrClosePicAreaClick">
                        <img src="../assets/picture.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="数据侧边栏" placement="right">
                    <div class="tool-div" id="open_sider"
                         @click="openOrCloseSiderClick">
                        <img src="../assets/open_sider.svg" alt="" class="tool-icon"/>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import eventBus from "../../main/eventBus";

    export default {
        name: 'LayoutToolList',
        data() {
            return {
                // 当前激活的工具
                activatedSingleTool: 'zoom',
                focusImgVisibleStyle: {
                    display: 'none'
                },
                focusImgHiddenStyle: {
                    display: 'inline-block'
                },
                toolDivStyle: {}
            }
        },
        mounted() {
        },
        computed: {},
        methods: {
            zoomToolClick(event) {
                this.toolDivStyle = {
                    'zoomTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('zoomToolClick')
            },
            wwwcToolClick(event) {
                this.toolDivStyle = {
                    'wwwcTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('wwwcToolClick')
            },
            panToolClick(event) {
                this.toolDivStyle = {
                    'panTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('panToolClick')
            },
            lengthToolClick(event) {
                this.toolDivStyle = {
                    'lengthTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('lengthToolClick')
            },
            angleToolClick(event) {
                this.toolDivStyle = {
                    'angleTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('angleToolClick')
            },
            magnifierToolClick(event) {
                this.toolDivStyle = {
                    'magnifierTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('magnifierToolClick')
            },
            freeHandRoiToolClick(event) {
                this.toolDivStyle = {
                    'freeHandRoiTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('freeHandRoiToolClick')
            },
            eraserToolClick() {
                this.toolDivStyle = {
                    'eraserTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('eraserToolClick')
            },
            rotateToolClick() {
                this.toolDivStyle = {
                    'rotateTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('rotateToolClick')
            },
            ellipticalRoiToolClick(){
                this.toolDivStyle = {
                    'ellipticalRoiTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('ellipticalRoiToolClick')
            },
            rectangleRoiToolClick(){
                this.toolDivStyle = {
                    'rectangleRoiTool': {
                        backgroundColor: 'rgb(32,32,39)'
                    }
                };
                eventBus.$emit('rectangleRoiToolClick')
            },
            invertColorToolClick(event) {
                eventBus.$emit('invertColorToolClick')
            },
            focusSegToolClick(event) {
                eventBus.$emit('focusSegToolClick')
            },
            focusAttrToolClick(event) {
                eventBus.$emit('focusAttrToolClick')
            },
            resumeClick(event) {
                eventBus.$emit('resumeClick')
            },
            hFlipClick(event) {
                eventBus.$emit('hFlipClick')
            },
            openOrClosePicAreaClick() {
                eventBus.$emit('openOrClosePicAreaClick')
            },
            openOrCloseSiderClick() {
                eventBus.$emit('openOrCloseSiderClick')
            }
        }
    }
</script>

<style scoped>
    .layout-tool-list {
        position: relative;
        width: 64px;
        background: #303035;
        z-index: 2;
        border-top: 1px solid #000;
    }

    .up-down-icon {
        fill: currentcolor;
        vertical-align: middle;
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        opacity: 1;
    }

    .tool-div {
        width: 100%;
        height: 40px;
        border: none;
        /*color: rgb(255, 255, 255);*/
        color: rgb(177, 179, 198);
        /*background: rgb(32, 32, 39);*/
        display: inline-block;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        padding: 0 20px;
        font-size: 14px;
        margin: 0.5em 0px;
        box-sizing: border-box;
    }

    .tool-div:active {
        background-color: rgb(32, 32, 39);
    }

    .tool-icon {
        fill: currentColor;
        vertical-align: middle;
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
    }


    ::-webkit-scrollbar {
        display: none;
    }

    ::selection {
        background: #1890ff;
        color: #fff;
    }
</style>
