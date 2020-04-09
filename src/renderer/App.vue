<template>
    <div id="app" style="height: 100%">
        <MainPage></MainPage>
    </div>
</template>

<script>
    import MainPage from './components/MainPage'

    const bodyStyle = 'height: 100%;' +
        'margin:0;overflow:hidden;' +
        'user-select:none;' +
        'background-color:#000;' +
        'min-height: 860px;' +
        'overflow-y: none;' +
        'font-size:14px;' +
        'line-height: 1.5;' +
        'font-family: "Monospaced Number",Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif' +
        'color: #fff';
    const htmlStyle = 'height: 100%; margin:0;width:100%';
    // 在根节点建立链接，给其他组件提供方法

    export default {
        name: 'graduation-design',
        components: {MainPage},
        // 在这里处理body 和 html的样式、目前没有找到更好的方法
        mounted: function () {
            document.getElementsByTagName('body')[0].style = bodyStyle;
            document.getElementsByTagName('html')[0].style = htmlStyle;
        },
    }
</script>

<style scoped>
    *, :after, :before {
        box-sizing: border-box;
    }
</style>
