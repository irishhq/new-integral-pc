<template>
  <div id="mimin" class="dashboard">
    <nav class="navbar navbar-default header navbar-fixed-top">
      <div class="col-md-12 nav-wrapper">
        <div class="navbar-header" style="width:100%;">
          <span class="navbar-brand" style="font-size: 26px;letter-spacing: 5px">凯拓积分系统</span>
          <ul class="nav navbar-nav navbar-right user-nav">
            <li class="user-name">
              <span>{{username}}iris</span>
            </li>
            <!--<li class="dropdown avatar-dropdown">-->
            <!--<img src="static/asset/img/avatar.jpg" class="img-circle avatar" alt="user name" />-->
            <!--</li>-->
            <li>
              <div
                style="width:30px;height: 30px;margin-left: 40px;line-height: 55px;cursor: pointer"
                @click="go('password')"
              >
                <i class="iconfont">&#xe7e1;</i>
              </div>
            </li>
            <li>
              <div
                style="width:30px;height: 30px;margin-left: 15px;line-height: 55px;cursor: pointer"
                @click="reset"
              >
                <i class="iconfont">&#xe7dd;</i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid mimin-wrapper">
      <!-- start:Left Menu -->
      <div id="left-menu">
        <div class="sub-left-menu" style="overflow: hidden">
          <ul class="nav nav-list">
            <li>
              <div class="left-bg"></div>
            </li>
            <el-container id="homeContainer" style="margin-top: 30px">
              <el-aside style="width:210px;color: #918c8c;height: 600px;overflow-y:auto">
                <el-menu light router :unique-opened="true" style="margin-left:-20px;">
                  <el-submenu index="0">
                    <template slot="title">
                      <i class="iconfont">&#xe7df;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >积分中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="0-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('integralCenter')"
                      >积分排行榜</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="iconfont">&#xe7e2;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >任务中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="1-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('taskList')"
                      >任务列表</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="iconfont">&#xe7e5;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >兑换中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="2-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('goodsList')"
                      >商品列表</el-menu-item>
                      <el-menu-item
                        index="2-2"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('moneyRecord')"
                      >兑换记录</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="iconfont">&#xe7e3;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >个人中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="3-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('information')"
                      >我的信息</el-menu-item>
                      <el-menu-item
                        index="3-2"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('edition')"
                      >版本信息</el-menu-item>
                      <el-menu-item
                        index="3-3"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('detail')"
                      >积分明细</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="4" v-show="state7">
                    <template slot="title">
                      <i class="iconfont">&#xe7e7;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >风控中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="4-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('taskManager')"
                        v-show="state1"
                      >任务管理</el-menu-item>
                      <el-menu-item
                        index="4-2"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('department')"
                        v-show="state2"
                      >部门设置</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="5" v-show="state8">
                    <template slot="title">
                      <i class="iconfont">&#xe7e4;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >综服中心</span>
                    </template>
                    <el-menu-item-group v-show="8">
                      <el-menu-item
                        index="5-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('staff')"
                        v-show="state3"
                      >员工设置</el-menu-item>

                      <el-menu-item
                        index="5-2"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('goodsMoney')"
                        v-show="state4"
                      >商品发布</el-menu-item>
                      <el-menu-item
                        index="5-3"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('commodity')"
                        v-show="state5"
                      >商品兑换列表</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-submenu index="6" v-show="state6">
                    <template slot="title">
                      <i class="iconfont">&#xe7e6;</i>
                      <span
                        style="width:100%;font-size: 16px;margin-left: 10px;color: #918c8c"
                        class="hvr-underline-from-center"
                      >权限管理</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        index="6-1"
                        style="width:100%;color: #918c8c"
                        class="hvr-underline-from-center hvr"
                        @click="go('manageJurisdiction')"
                      >管理权限设置</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-aside>
            </el-container>
          </ul>
        </div>
      </div>
    </div>
    <div style="min-width:1000px;margin-left:200px;margin-top: 56px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import bus from "../../bus";
export default {
  name: "home",
  data() {
    return {
      username: "",
      allData: [],
      state1: true,
      state2: true,
      state3: true,
      state4: true,
      state5: true,
      state6: true,
      state7: true,
      state8: true
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.allData = localStorage.getItem("hello");
    if (this.allData) {
      for (var i = 0; i < this.allData.length; i++) {
        if (this.allData[i] == 1) {
          this.state1 = false;
        } else if (this.allData[i] == 2) {
          this.state2 = false;
        } else if (this.allData[i] == 3) {
          this.state3 = false;
        } else if (this.allData[i] == 4) {
          this.state4 = false;
        } else if (this.allData[i] == 5) {
          this.state5 = false;
        } else {
          this.state6 = false;
        }
      }
    }
    if (this.state1 == false && this.state2 == false) {
      this.state7 = false;
    }
    if (this.state3 == false && this.state4 == false && this.state5 == false) {
      this.state8 = false;
    }
  },
  methods: {
    /**
     * @description 导航
     */
    go(linkhref, params) {
      if (params) {
        this.$router.push({ name: linkhref, params: params });
      } else {
        this.$router.push({ name: linkhref });
      }
    },
    /**
     * @description 注销登录
     */
    reset() {
      let post = {};
      let i = "/logout";
      this.util.sendPut(this, post, i, this.$cookie.get("token")).then(res => {
        this.$message({
          message: "注销成功",
          type: "success"
        });
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>
<style>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 15px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.1px;
  margin-left: -20px;
  -moz-osx-font-smoothing: grayscale;
}
.hvr:visited {
  color: #2196f3 !important;
}
/*::-webkit-scrollbar {*/
/*width: 8px;*/
/*height: 4px;*/
/*background-color: #F5F5F5;*/
/*}*/
/*!*定义滚动条轨道 内阴影+圆角*!*/
/*::-webkit-scrollbar-track {*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
/*background: #fff ;*/
/*}*/
/*!*定义滑块 内阴影+圆角*!*/
/*::-webkit-scrollbar-thumb {*/
/*border-radius: 3px;*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
/*background-color:rgba(33, 150, 243, 0.4);*/
/*}*/
/*::-webkit-scrollbar-thumb:hover {*/
/*border-radius: 3px;*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
/*background-color: rgba(33, 150, 243, 1);*/
/*}*/
/*::-webkit-scrollbar {*/
/*width: 8px;*/
/*height: 4px;*/
/*background-color: #F5F5F5;*/
/*}*/
/*!*定义滚动条轨道 内阴影+圆角*!*/
/*::-webkit-scrollbar-track {*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
/*background: #fff ;*/
/*}*/
/*!*定义滑块 内阴影+圆角*!*/
/*::-webkit-scrollbar-thumb {*/
/*border-radius: 3px;*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
/*background-color:rgba(33, 150, 243, 0.4);*/
/*}*/
/*::-webkit-scrollbar-thumb:hover {*/
/*border-radius: 3px;*/
/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
/*background-color: rgba(33, 150, 243, 1);*/
/*}*/
#left-menu .sub-left-menu {
  width: 210px;
}
</style>
