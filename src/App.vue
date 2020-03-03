<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css';
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/

/** 
* 为了计算table的高度 
* 需要给外层容器设置默认高度为100%
* 并禁止滚动条
*/
.child-main {
    height: 100%;
    overflow: hidden;
}
/* 修改默认滚动条 */
::-webkit-scrollbar-track
{
  background: rgba(0,0,0,.1);
  border-radius: 0;
}

::-webkit-scrollbar
{
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb
{
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0,0,0,.25);
    transition: color .2s ease;
}
.my-footer {
    position: absolute;
    bottom: 0;
    width:100%;
    left:0;
    height: 60px;
    padding: 0 20px;
}
</style>
