<template>
    <div class="layout-viewport">
        <div>
            <div style="display: flex; flex-flow: row nowrap;position:absolute;left:0;top:0;right:0;bottom:0;">
                <div style="position:absolute;left: 0;top:0;width:100%;height: 100%">
                    <div class="drop-container">
                        <div style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;border: 1px solid rgb(0,0,0);">
                            <div class="imageViewerViewport"
                                 style="position: absolute; left: 0;top:0;right: 0; bottom: 0;" ref="canvasViewer">
                            </div>
                            <canvas id=canvas width=5000 height=5000></canvas>
                            <div class="viewport-overlay"
                                 style="color: rgb(175, 178, 196);font-size: 0.95em;height: 100px;">
                                <div style="position: absolute; top: 1em; left: 1em;">
                                    <p>Developed by Zhangfan</p>
                                    <p style="color: rgb(107, 234, 230);">病人姓名: {{ patientName }}</p>
                                </div>
                                <div style="position: absolute; top: 1em; right: 1em; text-align: right;"><p></p>
                                    <p style="color: rgb(107, 234, 230);">{{ dateNow }}</p>
                                    <p>{{ timeNow }}</p></div>
                                <div style="position: absolute; bottom: 1em; left: 1em;">
                                    <p>Lossless / Uncompressed</p>
                                    <p>WW {{ ww}} WC {{wc}}</p>
                                </div>
                                <div style="position: absolute; bottom: 1em; right: 1em; text-align: right;"><p>Zoom:
                                    {{ scale }}%</p>
                                    <p>模糊等级：2</p>
                                    <p>光照不均等级:3</p>
                                    <p>毛发遮挡等级:0</p>
                                </div>
                                <div style="position: absolute; left: 50%; top: 1em; text-align: center; color: rgb(107, 234, 230);">
                                    A
                                </div>
                                <div style="position: absolute; left: 1em; top: 50%; text-align: center; color: rgb(107, 234, 230);">
                                    R
                                </div>
                                <div style="position: absolute; left: 50%; bottom: 1em; text-align: center; color: rgb(107, 234, 230);">
                                    P
                                </div>
                                <div style="position: absolute; right: 2.5em; top: 50%; text-align: center; color: rgb(107, 234, 230);">
                                    L
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cornerstone from 'cornerstone-core';
    import cornerstoneMath from 'cornerstone-math';
    import cornerstoneTools from 'cornerstone-tools';
    import cornerstoneWebImageLoader from 'cornerstone-web-image-loader'
    import Hammer from 'hammerjs';
    import eventBus from "../../main/eventBus";
    import date from 'silly-datetime'
    import focusSegTool from "../../../static/selfCornerstoneTool/focusSegTool";
    import focusAttrTool from "../../../static/selfCornerstoneTool/focusAttrTool";
    import fs from 'fs'

    const scrollToIndex = cornerstoneTools.import('util/scrollToIndex');

    export default {
        name: 'LayoutViewport',
        data() {
            return {
                element: null,
                scale: 0,
                imageViewPortMap: {},
                items: this.$store.getters['ThriftClient/items'],
                patientName: "",
                dateNow: date.format(new Date(), 'YYYY-MM-DD'),
                timeNow: date.format(new Date(), 'HH:mm:ss'),
                ww: 0,
                wc: 0,
                flag: true, // TODO delete,
                img: null,
                focusAttrToolState: true, // 是否显示分割结果标志，true表示显示，false表示不显示
                focusSegToolState: true
            }
        },
        mounted() {
            this.element = this.$refs.canvasViewer;
            this._initCornerstone();


        },
        methods: {
            _initCornerstone() {
                cornerstoneTools.external.cornerstone = cornerstone;
                cornerstoneTools.external.Hammer = Hammer;
                cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
                cornerstoneWebImageLoader.external.cornerstoneMath = cornerstoneMath;
                cornerstoneWebImageLoader.external.cornerstone = cornerstone;
                // cornerstone.registerImageLoader('file', cornerstoneWebImageLoader.loadImage);
                cornerstone.registerImageLoader('file', cornerstoneWebImageLoader.loadImage);
                cornerstoneTools.init({mouseEnabled: true, showSVGCursors: true});
                cornerstone.enable(this.element);
                cornerstoneTools.setElementToolStateManager(this.element, cornerstoneTools.newImageIdSpecificToolStateManager());
                cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
                // 放大缩小
                cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
                    configuration: {
                        invert: false,
                        preventZoomOutsideImage: false,
                        minScale: .05,
                        maxScale: 20.0,
                    }
                });
                cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool, {
                    configuration: {
                        invert: false,
                        preventZoomOutsideImage: false,
                        minScale: .05,
                        maxScale: 20.0,
                    }
                });
                // 移动
                cornerstoneTools.addTool(cornerstoneTools.PanTool);
                // 放大镜
                cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
                // 旋转工具
                cornerstoneTools.addTool(cornerstoneTools.RotateTool);
                // 角度工具
                cornerstoneTools.addTool(cornerstoneTools.CobbAngleTool);
                // 箭头注解工具
                cornerstoneTools.addTool(cornerstoneTools.ArrowAnnotateTool);
                // 双向测量工具
                cornerstoneTools.addTool(cornerstoneTools.BidirectionalTool);
                // 椭圆工具
                cornerstoneTools.addTool(cornerstoneTools.EllipticalRoiTool);
                // 矩形工具
                cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
                // 自助画图工具
                cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
                // 长度测量工具
                cornerstoneTools.addTool(cornerstoneTools.LengthTool);
                // 文字标注工具
                cornerstoneTools.addTool(cornerstoneTools.TextMarkerTool, {
                    markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
                    current: 'F5',
                    ascending: true,
                    loop: true,
                });
                // cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
                cornerstoneTools.addTool(cornerstoneTools.EraserTool);
                // cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);

                cornerstoneTools.addTool(focusSegTool);
                cornerstoneTools.addTool(focusAttrTool);
                // viewPort.invert = !viewPort.invert; setViewPort(e,vi)
                // cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
                cornerstoneTools.setToolEnabledForElement(this.element, 'FocusSeg', {});
                cornerstoneTools.setToolEnabledForElement(this.element, 'FocusAttr', {});
                cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', {mouseButtonMask: 1});
                cornerstoneTools.setToolActiveForElement(this.element, 'ZoomMouseWheel', {mouseButtonMask: 4});
                cornerstoneTools.setToolActiveForElement(this.element, 'Pan', {mouseButtonMask: 2});
                this.element.addEventListener('cornerstonenewimage', (event) => {

                });
                this.element.addEventListener('cornerstoneimagerendered', (event) => {
                    // console.log(event);
                    let viewport = event.detail.viewport;
                    this.scale = Math.round(viewport.scale * 100);
                    this.ww = Math.round(viewport.voi.windowWidth);
                    this.wc = Math.round(viewport.voi.windowCenter);
                });
                // 初始化图像
                if (this.items.length <= 0) {
                    return;
                }
                this.patientName = this.items[0].patientName;
                const imageIds = this.items.map(item => item.src);
                // const stack = {
                //     currentImageIdIndex: 0,
                //     imageIds
                // };
                cornerstone.loadImage(imageIds[0]).then((image) => {
                    let viewport = cornerstone.getDefaultViewportForImage(this.element,image);
                    cornerstone.displayImage(this.element, image,viewport);
                    cornerstone.fitToWindow(this.element);
                    // cornerstoneTools.addStackStateManager(this.element, ['stack']);
                    // cornerstoneTools.addToolState(this.element, 'stack', stack);
                });
            },//
            displayImageChange(cornerstone,file_path,element){
                // cornerstone切换图片 imagePath = file:// + 路径
                cornerstone.loadAndCacheImage('file://'+file_path).then((image) => {
                    let viewport = cornerstone.getDefaultViewportForImage(element,image);
                    cornerstone.displayImage(element, image,viewport);
                    cornerstone.fitToWindow(element);
                    // cornerstoneTools.addStackStateManager(this.element, ['stack']);
                    // cornerstoneTools.addToolState(this.element, 'stack', stack);
                });
                cornerstoneTools.setToolOptionsForElement(this.element, 'FocusSeg', {
                    image_path: file_path,
                    json_path: this.$root.task1_result_json_path
                });
                cornerstoneTools.setToolOptionsForElement(this.element, 'FocusAttr', {
                    image_path: file_path,
                    json_path: this.$root.task2_result_json_path
                });
                eventBus.$emit('taskThreeResultUpdate',file_path);
                eventBus.$emit('taskFourResultUpdate',file_path);
            }
        },
        computed: {
            task1_json_path() {
                return this.$root.task1_result_json_path;
            },
            task2_json_path(){
                return this.$root.task2_result_json_path;
            }
        },
        watch: {
            // 监听当前激活的图片
            '$store.state.ThriftClient.click_index': function (index) {
                const items = this.$store.getters['ThriftClient/items'];
                this.patientName = items[index].patientName;
                // scrollToIndex(this.element, index);
                this.displayImageChange(cornerstone,items[index].filePath,this.element);
            },
            task1_json_path(json_path) {
                cornerstoneTools.setToolOptionsForElement(this.element, 'FocusSeg', {
                    json_path: json_path
                })
            },
            task2_json_path(json_path) {
                cornerstoneTools.setToolOptionsForElement(this.element, 'FocusAttr', {
                    json_path: json_path
                })
            }
        },
        created() {
            setInterval(() => {
                this.dateNow = date.format(new Date(), 'YYYY-MM-DD');
                this.timeNow = date.format(new Date(), 'HH:mm:ss');
            }, 1000);
            eventBus.$on('zoomToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', {mouseButtonMask: 1});
            });
            eventBus.$on('wwwcToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', {mouseButtonMask: 1});
            });
            eventBus.$on('panToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'Pan', {mouseButtonMask: 1})
            });
            eventBus.$on('lengthToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, "Length", {mouseButtonMask: 1})
            });
            eventBus.$on('angleToolClick', () => {
                // cornerstoneTools.setToolActiveForElement(this.element, 'Angle', {mouseButtonMask: 1})
                cornerstoneTools.setToolActiveForElement(this.element, 'CobbAngle', {mouseButtonMask: 1})
            });
            eventBus.$on('magnifierToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'Magnify', {mouseButtonMask: 1})
            });
            eventBus.$on('freeHandRoiToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'FreehandRoi', {mouseButtonMask: 1})
            });
            eventBus.$on('eraserToolClick', () => {
                // 橡皮擦
                cornerstoneTools.setToolActiveForElement(this.element, 'Eraser', {mouseButtonMask: 1})
            });
            eventBus.$on('invertColorToolClick', () => {
                // 反色
                let viewPort = cornerstone.getViewport(this.element);
                viewPort.invert = !viewPort.invert;
                cornerstone.setViewport(this.element, viewPort);
            });
            eventBus.$on('rotateToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'Rotate', {mouseButtonMask: 1})
            });
            eventBus.$on('focusSegToolClick', () => {
                if (this.focusSegToolState) {
                    // 关闭
                    cornerstoneTools.setToolDisabledForElement(this.element, 'FocusSeg', {});
                } else {
                    cornerstoneTools.setToolEnabledForElement(this.element, 'FocusSeg', {});
                }
                this.focusSegToolState = !this.focusSegToolState;
            });
            eventBus.$on('focusAttrToolClick', () => {
                if (this.focusAttrToolState) {
                    // 关闭
                    cornerstoneTools.setToolDisabledForElement(this.element, 'FocusAttr', {});
                } else {
                    cornerstoneTools.setToolEnabledForElement(this.element, 'FocusAttr', {});
                }
                this.focusAttrToolState = !this.focusAttrToolState;
            });
            eventBus.$on('resumeClick', () => {
                cornerstone.reset(this.element)
            });
            eventBus.$on('hFlipClick', () => {
                let viewPort = cornerstone.getViewport(this.element);
                viewPort.hflip = !viewPort.hflip;
                cornerstone.setViewport(this.element, viewPort);
            });
            eventBus.$on('ellipticalRoiToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'EllipticalRoi', {mouseButtonMask: 1})
            });
            eventBus.$on('rectangleRoiToolClick', () => {
                cornerstoneTools.setToolActiveForElement(this.element, 'RectangleRoi', {mouseButtonMask: 1})
            });
            eventBus.$on('itemsChange', (items) => {
                console.log("item", items);
                if (items.length <= 0) {
                    return;
                }
                this.displayImageChange(cornerstone,items[0].filePath,this.element);
            });
            eventBus.$on('taskOneResultUpdate', () => {
                // cornerstoneTools.setToolEnabled(this.element, 'FocusSeg', {})
                cornerstone.draw(this.element)
            });
            eventBus.$on('taskTwoResultUpdate', () => {
                // cornerstoneTools.setToolEnabled(this.element, 'FocusAttr', {})
                cornerstone.draw(this.element)
            });

        },
        destroyed() {
            eventBus.$off('zoomToolClick');
            eventBus.$off('wwwcToolClick');
            eventBus.$off('panToolClick');
            eventBus.$off('lengthToolClick');
            eventBus.$off('angleToolClick');
            eventBus.$off('magnifierToolClick');
            eventBus.$off('freeHandRoiToolClick');
            eventBus.$off('eraserToolClick');
            eventBus.$off('invertColorToolClick');
            eventBus.$off('rotateToolClick');
            eventBus.$off('focusSegToolClick');
            eventBus.$off('focusAttrToolClick');
            eventBus.$off('resumeClick');
            eventBus.$off('hFlipClick');
            eventBus.$off('arrowAnnotateToolClick');
            eventBus.$off('bidirectionalToolClick');
            eventBus.$off('ellipticalRoiToolClick');
            eventBus.$off('rectangleRoiToolClick');
            eventBus.$off('rectangleRoiToolClick');
            eventBus.$off('itemsChange');
            eventBus.$off('taskOneResultUpdate');
            eventBus.$off('taskTwoResultUpdate');

        }

    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .layout-viewport {
        flex: 1 1;
        align-self: stretch;
        position: relative;
    }

</style>
