<template>
    <div id="main-page">
        <div style="width:100vw;height:100%;display: flex;flex-wrap: nowrap;overflow: hidden;flex-direction: column!important;flex: 1 1;">
            <layout-header></layout-header>
            <div style="position: relative; flex:1 1 0%;">
                <!--layout-content为软件中的主要内容部分-->
                <div class="layout-content">
                    <layout-viewer></layout-viewer>
                    <layout-sider></layout-sider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LayoutHeader from './LayoutHeader'
    import LayoutViewer from './LayoutViewer'
    import LayoutSider from './LayoutSider'

    import {ipcRenderer} from 'electron'
    import eventBus from "../../main/eventBus";

    const predictService = require('../../../static/thrift_js/predictService');
    export default {
        name: 'main-page',
        components: {
            LayoutViewer,
            LayoutSider,
            LayoutHeader
        },
        data() {
            return {
            }
        },
        created() {
            // this.startConnect()
            ipcRenderer.on('resizeEvent', (event, sizeData) => {
                this.windowHeight = sizeData.windowHeight;
                this.windowWidth = sizeData.windowWidth;
            });
            ipcRenderer.on('getFilesBySelect-reply', (event, files) => {
                console.log('files' + files);
                // this.$store.dispatch('ThriftClient/set_image_percentage');
                // console.log('percentage',this.$store.getters['ThriftClient/percentage'])
                this.$store.dispatch('ThriftClient/set_images', files);
            });
            ipcRenderer.on('getFilesByDirectory-reply', (event, files) => {
                console.log(files);
                this.$store.dispatch('ThriftClient/set_images', files);
            });
        },
        methods: {

        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    #main-page {
        margin: 0;
        height: 100%;
        min-width: 800px;
        min-height: 800px;
    }

    .layout-content {
        display: flex;
        flex-direction: row;
        flex: 1 1;
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
</style>
