<template>
  <div id="integralCenter">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">版本信息</span>
          </div>

        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <el-collapse v-model="activeNames" style="margin-left: 20px;border: 0px;border-bottom: 0px;width: 800px">
            <el-collapse-item :title=title name="1">
              <div v-for="(item,index) in option" :key="index">
                升级内容：{{item.versionOverview}}
                <br>
                开发团队：{{item.versionCompany}}
                <br>
                项目组功臣(排名分先后)：{{item.versionDeveloper}}
              </div>
              <div>积分守则：<a href="http://192.168.3.251:8081/PDFfile/jf1.pdf" target="_blank">凯拓软件积分管理制度</a></div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)" >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edition',
    data () {
      return {
        versionCurrent:'',
        versionHistory:'',
        versionOverview:'',
        versionCompany:'',
        versionDeveloper:'',
        activeNames: [],
        title:'',
        option:['1']
      }
    },
    created(){
      this.versioninformaion()
    },
    methods: {
      exportExcel () {
        window.location.href=this.util.params.baseUrl+"/PDF/jf1.pdf"
      },
      versioninformaion() {
        let post = {
        };
        let i="/sys/versioninformaion/"+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.title='当前版本: '+res.data[0].versionCurrent+'←'+res.data[0].versionHistory
          this.option=res.data
          // this.versionCurrent=res.data.versionCurrent
          // this.versionHistory=res.data.versionHistory
          // this.versionOverview=res.data.versionOverview
          // this.versionCompany=res.data.versionCompany
          // this.versionDeveloper=res.data.versionDeveloper
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
  a{
    display: inline-block;
    margin-left: 40px;
    width:180px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #F0F3F4;
    border-radius: 15px;
    list-style: none;
  }
  a:hover{
    border: 1px solid lightgray;
  }
  #integralCenter>>>.el-collapse-item__header{
    font-size: 18px;
    font-weight: bolder;
  }
  #integralCenter>>>.el-collapse-item__content{
    font-size: 15px;
    line-height: 50px;
  }
</style>

