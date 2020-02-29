<template>
  <div id="app" style="width: 100%;height:100%;font-size: 15px">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
/*首页改变左侧栏样式*/
#homeContainer .el-menu-item-group .hvr-underline-from-center{
   padding-left: 100px!important;
 }
#homeContainer .el-submenu__title {
  padding-left: 80px!important;
}
#homeContainer .el-menu-item-group{
  border-top: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
  background: #F7F7F7;
}
@font-face {
  font-family: 'iconfont';
  src: url('../static/asset/fonts/iconfont.eot');
  src: url('../static/asset/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../static/asset/fonts/iconfont.woff') format('woff'),
  url('../static/asset/fonts/iconfont.ttf') format('truetype'),
  url('../static/asset/fonts/iconfont.svg#iconfont') format('svg');
}
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: rgba(0,0,0,0)!important;
  color: #2196F3!important;
}
.el-menu-item:focus{
  outline: 0;
  background-color: rgba(0,0,0,0)!important;
  color: #2196F3!important;
}
.el-tabs__item{
  padding: 0 80px!important;
}
#taskList .el-table td, .el-table th{
  text-align: center;
}
#integralCenter .el-table td, .el-table th{
  text-align: left;
}
.Wid-3 .el-dialog{
  width: 500px!important;
}
.Wid-12 .el-dialog{
  width: 1200px!important;
}
.el-menu{
  border-right: 0px!important;
}
</style>
