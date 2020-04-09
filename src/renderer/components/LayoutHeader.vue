<template>
    <div class="layout-header">
        <div class="header-content">
            <div class="header-content-left">
                <div>
                    <div>
                        <img class="header-logo" src="../assets/logo.png" alt="BUPT_LOGO"/>
                    </div>
                </div>
                <div class="header-result">
                    <div class="header-predict-result"
                         style="border-bottom:2px solid rgb(63,135,245);background:rgb(32,32,39);">
                        <span>可疑黑色素瘤</span>
                        <img src="../assets/warn.svg" class="danger-warn" alt="warn"/>
                    </div>
                    <div class="header-predict-result"
                         style="border-bottom:2px solid rgb(63,135,245);background:rgb(32,32,39);">
                        <span>可疑恶性肿瘤</span>
                        <img src="../assets/tumor.svg" class="danger-warn" alt="tumor"/>
                    </div>

                </div>
                <div class="header-icons">
                    <div>
                        <div class="header-left-icon" @click="importPic"
                             style="background:rgb(39,39,43);border-bottom: 2px solid rgb(39,39,43);">
                            <el-tooltip class="item" effect="dark" content="导入图片" placement="bottom">
                                <img src="../assets/import.svg" alt="import" class="header-icon"/>
                            </el-tooltip>
                        </div>
                    </div>
                    <div>
                        <div class="header-left-icon" @click="openUserGuide"
                             style="background:rgb(39,39,43);border-bottom: 2px solid rgb(39,39,43);">
                            <el-tooltip class="item" effect="dark" content="用户操作指南" placement="bottom">
                                <img src="../assets/guide.svg" alt="import" class="header-icon"/>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-content-right">
                <div style="margin-right: 30px;">
                    <el-input v-model="search_input" placeholder="图片名称" prefix-icon="el-icon-search"
                              clearable></el-input>
                </div>
                <div class="tool-button-group">
                    <!--打开关闭工具栏-->
                    <div class="tool-button" @click="openOrCloseTools">
                        <el-tooltip class="item" effect="dark" content="工具栏" placement="bottom">
                            <img src="../assets/tools.svg" alt="import" class="header-icon"/>
                        </el-tooltip>
                    </div>
                    <!--打开关闭软件-->
                    <div class="tool-button" @click="shutDown">
                        <el-tooltip class="item" effect="dark" content="关闭软件" placement="bottom">
                            <img src="../assets/close.svg" alt="import" class="header-icon"/>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {remote, ipcRenderer} from 'electron'

  export default {
    name: 'Header',
    data () {
      return {
        search_input: ''
      }
    },
    methods: {
      importPic () {
        // 导入图片 配合图片选择区域完成该功能
        ipcRenderer.send('getFilesBySelect')
      },
      openUserGuide () {
        // 打开用户手册
      },
      openOrCloseTools () {
        // 打开或关闭
      },
      shutDown () {
        // 关闭软件
        remote.getCurrentWindow().close()
      }
    }
  }
</script>

<style scoped>
    .layout-header {
        width: 100%;
        height: 50px;
        background: #27272b;
        -webkit-app-region: drag;
        display: block;
        user-select: none;
    }

    .header-content {
        position: relative;
        display: flex;
        flex-direction: row;
        flex: 1 1;
    }

    *, :after, :before {
        box-sizing: border-box;
    }

    .header-content-left {
        padding-right: 0;
    }

    .header-content .header-content-left {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        flex: 1 1;
        justify-content: space-between;
        flex-grow: 2;
        padding: 0 20px;
    }

    .header-content .header-content-right {
        justify-content: flex-start;
        height: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        flex: 1 1;
        flex-grow: 1;
        padding: 0 20px;
        background: #27272b;
        min-width: 400px;
    }

    .header-content .header-content-left .header-logo {
        width: 9em;
        display: inline-block;
        margin: 8px 0;
    }

    img {
        vertical-align: middle;
        border-style: none;
    }

    .header-content .header-content-left > div {
        white-space: nowrap;
    }

    .header-content .header-content-left .header-predict-result {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
    }

    .header-content .header-content-left .danger-warn {
        width: 22px;
        height: 22px;
        margin-left: 6px;
        margin-top: -2px;
    }

    .header-icons {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .header-left-icon {
        padding: 0 1em;
        height: 49px;
        line-height: 49px;
        -webkit-app-region: no-drag;
    }

    .header-icon {
        fill: currentColor;
        vertical-align: middle;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        color: rgb(160, 167, 180);
    }

    .header-content-right {
        height: 50px;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        flex: 1 1;
        flex-grow: 1;
        justify-content: flex-start;
        padding-left: 10px;
        padding: 0 20px;
        background: #27272b;
        min-width: 400px;
        -webkit-app-region: no-drag;
    }

    .el-input /deep/ .el-input__inner {
        background: #303035;
        border-color: #303035;
        border-radius: 16px;
        color: #fff;
    }

    .tool-button-group {
        background: #27272b;
        -webkit-app-region: no-drag;
    }

    .tool-button {
        color: rgb(160, 167, 180);
        cursor: pointer;
        background: rgb(39, 39, 43);
        border-bottom: 2px solid rgb(39, 39, 43);
        margin-right: 1.4em;
        display: inline-block;
    }
</style>
