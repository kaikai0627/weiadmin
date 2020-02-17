<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
    /* 清除莫名其妙的样式 */
    .el-upload--text {
        width: auto;
        height: auto;
    }
    .el-popover {
        overflow-y: auto;
        max-height: 97%;
    }
</style>
