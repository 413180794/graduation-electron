<template>
    <div class="layout-viewer">
        <layout-tool-list></layout-tool-list>
        <layout-multi></layout-multi>
        <layout-viewport></layout-viewport>
    </div>
</template>

<script>
    import LayoutToolList from './LayoutToolList'
    import LayoutMulti from './LayoutMulti'
    import LayoutViewport from './LayoutViewport'
    import Vue from 'vue'
    export default {
        name: 'LayoutViewer',
        data() {
            return {
            }
        },
        components: {
            LayoutToolList,
            LayoutMulti,
            LayoutViewport
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .layout-viewer {
        display: flex;
        flex-direction: row;
        flex: 1 1;
        min-height: 0;
        background: #000;
    }


</style>
