<template>
  <div id="password">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;">修改密码</span>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
           <p class="p">
             <span>登录名</span>
             <span style="margin-left: 50px">{{username}}</span>
           </p>
          <p class="p">
            <span>原密码</span>
            <span style="margin-left: 28px"><el-input v-model="oldPassword" placeholder="请输入原密码" style="margin-left: 25px;margin-top: 20px" type="password"></el-input></span>
          </p>
          <p class="p">
            <span>新密码</span>
            <span style="margin-left: 28px;"><el-input v-model="newPassword" placeholder="请输入新密码" style="margin-left: 25px;margin-top: 20px" type="password"></el-input></span>
          </p>
          <p class="p">
            <span>确认新密码</span>
            <span><el-input v-model="surePassword" placeholder="请确认新密码" style="margin-left: 25px;margin-top: 20px" type="password"></el-input></span>
          </p>
          <div style="margin:auto;text-align: center;margin-top: 50px">
            <el-button type="primary" @click="resetPassword" style="width: 100px;">确认修改</el-button>
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
    name: 'password',
    data () {
      return {
        oldPassword:'',
        newPassword:'',
        surePassword:'',
        username:''
      }
    },
    created(){
      this.username=localStorage.getItem("username")
    },
    methods: {
       resetPassword(){
         if(this.newPassword==this.surePassword){
           let post = {
             'oldPassWord':this.oldPassword,
             'newPassWord':this.newPassword
           };
           let i='/user/password'
           this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
             this.$message({
               message: '修改成功',
               type: 'success'
             });
           })
         }else{
           this.$message({
             message: '输入密码不一致',
             type: 'error'
           });
         }
       }
    }
  }
</script>
<style scoped>
  .block{
    float: left;
    vertical-align: middle;
  }
  .title-but{
    float: right;
  }
  .card{
    border-bottom: 1px solid #999999;
    margin-top: 30px;
    padding-bottom: 30px
  }
  .el-input{
    width: 300px;
  }
  .decide{
    margin-top: 30px;
    text-align: center;
  }
  .decideBut{
    margin-left: 30px;
    width: 100px;
  }
  .p{
    margin-top: 30px;
    margin-left: 50px;
  }
</style>



