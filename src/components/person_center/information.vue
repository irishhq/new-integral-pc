<template>
  <div id="information">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">我的信息</span>
          </div>

        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <div>
            <img src="../../../static/asset/img/avatar.jpg" alt="" style="width:90px;height: 90px;margin-left:30px;border-radius: 50%">
            <h4 style="display: inline-block;margin-left: 20px">{{userName}},您好</h4>
          </div>
          <div style="margin-left: 144px;display: flex">
              <div style="flex: 1">我的积分：{{userIntegral}}</div>
              <div style="flex: 1">我的工号：{{userId}}</div>
              <div style="flex: 2"></div>
          </div>
          <div style="margin-left: 144px;display: flex;margin-top: 40px;">
            <div style="flex: 1">我的部门：{{deptName}}</div>
            <div style="flex: 1">我的等级：{{positionName}}</div>
            <div style="flex: 2"></div>
          </div>
          <div style="margin-left: 144px;display: flex;margin-top: 40px">
            <div style="flex: 1">我的状态：{{userStatus}}</div>
            <div style="flex: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">入职时间：{{userInductiontime}}</div>
            <div style="flex: 2"></div>
          </div>

        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)" >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'information',
    data () {
      return {
        userName:'',
        userIntegral:'',
        userId:'',
        deptName:'',
        positionName:'',
        userStatus:'',
        userInductiontime:''
      }
    },
    created(){
      this.information()
    },
    methods: {
      information() {
        let post = {
        };
        let i='/user/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.userName=res.data.userName
          this.userIntegral=res.data.userIntegral
          this.userId=res.data.userId
          // this.$cookie.set('token', res.token);
          this.deptName=res.data.deptName
          this.positionName=res.data.positionName
          this.userInductiontime=this.util.formatDate(res.data.userInductiontime)
          switch(res.data.userStatus){
            case 0:
              this.userStatus='正常'
              break;
            case 1:
              this.userStatus='积分冻结'
              break;
            case 2:
              this.userStatus='书面警告'
              break;
            case 3:
              this.userStatus='留职观察'
              break;
            case 4:
              this.userStatus='离职'
              break;
            case 5:
              this.userStatus='超级管理员'
              break;
          }
        })
      },
    }
  }
</script>
<style scoped>
  .block{
    float: left;
    vertical-align: middle;
  }

  .card{
    border-bottom: 1px solid #999999;
    margin-top: 30px;
    padding-bottom: 30px
  }
</style>

