<template>
  <div id="login">
    <div id="mimin" class="dashboard form-signin-wrapper" style="width: 100%;height: 100%;">
      <div class="container">
        <div class="form-signin" style="margin-top: 100px">
          <div class="panel periodic-login">
            <div class="panel-body text-center">
              <img src="../../../static/asset/img/kaituo.png" alt="" style="width: 120px;height:120px">
              <p class="element-name" style="margin-top: 30px;font-size: 22px">凯拓积分系统</p>

              <div class="form-group form-animate-text" style="margin-top:40px !important;">
                <input type="text" v-model="username" class="form-text" required autofocus @keyup.enter="go">
                <span class="bar"></span>
                <label>工号</label>
              </div>
              <div class="form-group form-animate-text" style="margin-top:40px !important;">
                <input type="password" v-model='password' class="form-text" required @keyup.enter="go">
                <span class="bar"></span>
                <label>密码</label>
              </div>
              <input type="submit" class="btn col-md-12" value="登录" @click="go" />
            </div>
            <!--<button class="btn col-md-12" @click="go"  @keyup.enter="go_head">登录</button></div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        username:'',
        password:'',
        allData:'',
      }
    },
    methods:{
      go(){
        let post = {
          'username':this.username,
          'password':this.password
        };
        let i='/user/login'
        this.util.sendAjax(this, post, i).then((res) => {
          this.$cookie.set('token', res.data.token);
          localStorage.setItem("username",res.data.userName)
          this.$cookie.set('JSESSIONID', res.data.jsessionid);
          this.allData=res.data.authorities
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          localStorage.setItem("hello",this.allData)
          this.$router.push({name:'integralCenter'})
        })
      }
    }
  }
</script>
<style>
  #login{
    width: 100%;
    background: rgba(33,150,243,0.8);
    height: 100%;
    overflow: hidden;
  }
</style>
