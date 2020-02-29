<template>
  <div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;">员工设置</span>
          </div>
          <div>
            <el-button type="primary" class="title-but" @click="addpartner" style="width: 100px">添加新员工</el-button>
            <el-input placeholder="请输入姓名/部门" v-model="searchName"  class="title-but" style="margin-right: 80px">
              <template slot="append">
                <el-button @click="search">搜索</el-button></template>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="userName"
              label="姓名"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="部门"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="positionName"
              label="职位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userId"
              label="工号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userInductiontime"
              label="入职时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userIntegral"
              label="当前积分"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userStatus"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.userStatus | statusFilter}}
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              width="300"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="changeMessage(scope.row.userId)">修改信息</el-button>
                <el-button type="primary" size="mini" @click="changeIntegral(scope.row.userId)">修改积分</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:center;margin-top: 30px">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page.currentPage"
              :page-size="page.pageSize"
              layout="prev, pager, next, jumper"
              :total="page.count">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </div>
    <div class="Wid-3" >
      <el-dialog title="员工信息" :visible.sync="dialogTableVisible" >
        <div style="margin-left: 25px">
          <div>
            <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<el-input v-model="username" placeholder="请输入姓名" style="margin-left: 25px;"></el-input></p>
            <p>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：<el-select v-model="professionValue"  placeholder="请选择部门" style="margin-left: 25px;width: 300px;margin-top: 15px">
              <el-option
                v-for="item in profession"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId">
              </el-option>
            </el-select></p>
            <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：<el-select v-model="stepValue" placeholder="请选择职位" style="margin-left: 25px;width: 300px;margin-top: 15px">
              <el-option
                v-for="item in step"
                :key="item.deptPositionId"
                :label="item.positionName"
                :value="item.deptPositionId">
              </el-option>
            </el-select></p>
            <p>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<el-select v-model="statusValue"  style="margin-left: 25px;width: 300px;margin-top: 15px">
              <el-option label="正常" value="0"></el-option>
              <el-option label="积分冻结" value="1"></el-option>
              <el-option label="书面警告" value="2"></el-option>
              <el-option label="留职观察" value="3"></el-option>
              <el-option label="离职" value="4"></el-option>
            </el-select></p>
            <p>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
              <el-input v-model="userId" placeholder="请输入员工工号" style="margin-left: 25px;margin-top: 15px" v-if="state==1" type="number"></el-input>
              <el-input v-model="userId" placeholder="请输入员工工号" style="margin-left: 25px;margin-top: 15px" v-if="state==2" disabled ></el-input>

            </p>
            <p>初始密码：<el-input v-model="passwordValue" placeholder="请输入初始密码" style="margin-left: 21px;margin-top: 15px"></el-input></p>
            <p>入职时间：<el-date-picker
              v-model="userInductiontime"
              type="datetime"
              placeholder="选择日期时间" style="margin-left: 20px;margin-top:15px ">
            </el-date-picker>
            <p>积分变更：<el-input-number v-model="num8" controls-position="right" :min="0"  style="margin-left: 21px;margin-top: 15px"></el-input-number></p>
          </div>
        </div>
        <div class="decide">
          <el-button  class="decideBut" @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" class="decideBut" @click="newpush" v-if="state==1">确认</el-button>
          <el-button type="primary" class="decideBut" @click="changepush" v-if="state==2">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="Wid-3" >
      <el-dialog title="修改积分" :visible.sync="dialogChangeVisible" >
        <div style="margin-left: 80px">
          <div >
            <p>积分变更：<el-input-number v-model="num8" controls-position="right"   style="margin-left: 30px;margin-top: 15px"></el-input-number></p>
            <p>修改原因：<el-input v-model="reason" placeholder="请输入修改原因" style="width: 180px;margin-left: 30px;margin-top: 20px"></el-input></p>
          </div>
        </div>
        <div class="decide" >
          <el-button  class="decideBut" @click="dialogChangeVisible=false">取消</el-button>
          <el-button type="primary" class="decideBut" @click="sureNum">确认</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)" >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'operationalData',
    data () {
      return {
        page:{
          currentPage:1,
          pageSize:8,
          count:null
        },
        tableData: [],
        searchName:'',
        mid:0,
        dialogTableVisible: false,
        profession:[],
        professionValue:'',
        step:[],
        stepValue:'',
        statusValue:'',
        userId:'',
        passwordValue:'',
        userInductiontime:'',
        username:'',
        num8:null,
        state:'',
        dialogChangeVisible:false,
        rid:'',
        hid:'',
        reason:'',


        value: '',
        formLabelWidth: '120px',
        input: '',
        num6:'1',
        value1:'',
        value4: '',
        upImgData: {
          img: '',
          tempImg: ''
        },
        options: []
      }
    },
    created(){
      this.staff(1)
    },
    watch:{
      searchName:function(){
        if(this.searchName==''){
          this.mid=0
          this.staff(1)
        }
      },
      professionValue:function(){
        this.step=[]
        if(this.professionValue){
          this.stepOption(this.professionValue)
        }
      },
    },
    filters:{
      statusFilter(type) {
        switch (type) {
          case 0:
            return '正常';
          case 1:
            return '积分冻结';
          case 2:
            return '书面警告';
          case 3:
            return '留职观察';
          case 4:
            return '离职';
          case 5:
            return '超级管理员';
        }
      }
    },
    methods: {
      //获取商品列表
      staff(page) {
        let post = {
        };
        let i='/authority/one/users/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].userInductiontime=this.util.formatDate(res.data.list[i].userInductiontime)
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        if(this.mid==0){
          this.staff(val)
        }else{
          this.searchData(val)
        }

      },
      search(){
        this.searchData(1)
        if(this.searchName==''){
          this.mid=0
        }else{
          this.mid=1
        }
      },
      searchData(page) {
        let post = {
        };
        let i='/authority/one/users/'+this.searchName+'/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].userInductiontime=this.util.formatDate(res.data.list[i].userInductiontime)
            }
          }
        })
      },
      addpartner(){
        this.state=1
        this.dialogTableVisible=true
        this.profe()
        this.userId=''
        this.username=''
        this.stepValue=''
        this.passwordValue=''
        this.professionValue=''
        this.num8=0
        this.userInductiontime=''
        this.statusValue=''
      },
      profe(callback) {
        let post = {
        };
        let i='/authority/one/depts/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.profession=res.data;
        //   this.$cookie.set('token', res.token);
        })
      },
      stepOption(id, callback) {
        let post = {
        };
        let i='/authority/one/positions/'+id+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.step=res.data;
          if(callback){callback()}
          // this.$cookie.set('token', res.token);
        })
      },
      newpush(){
        if(this.userId==''||this.username==''||this.passwordValue==''||this.userInductiontime==''||this.userInductiontime==null||this.statusValue==''){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let post = {
            'userId':this.userId,
            'userName':this.username,
            'userDeptPosition':this.stepValue,
            'userPassword':this.passwordValue,
            'userIntegral':this.num8,
            'userInductiontime':this.util.formatDate(this.userInductiontime),
            'userStatus':this.statusValue,
          };
          let i='/authority/one/user'
          this.util.sendAjax(this, post, i,this.$cookie.get('token')).then((res) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            // this.$cookie.set('token', res.token);
            this.dialogTableVisible=false
            this.staff(1)
          })
        }
      },
      changeMessage(id){
        this.state=2
        this.profe();
        this.dialogTableVisible=true
        this.rid=id;
        this.getInformation(id)
      },
      //获取个人信息
      getInformation(id){
        let post = {
        };
        let i='/authority/one/user/'+id+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.userId=res.data.userId
          this.username=res.data.userName
          this.professionValue=res.data.dept_id
          this.stepValue=res.data.userDeptPosition
          // this.passwordValue=res.data.userPassword
          this.userInductiontime=res.data.userInductiontime
          this.statusValue=(res.data.userStatus).toString()
          this.num8=res.data.userIntegral;
        })
      },
      changepush(){
        if(this.userId==''||this.username==''||this.userInductiontime==''||this.userInductiontime==null||this.statusValue==''){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let post = {
            'userId':this.userId,
            'userName':this.username,
            'userDeptPosition':this.stepValue,
            'userPassword':this.passwordValue,
            'userIntegral':this.num8,
            'userInductiontime':this.util.formatDate(this.userInductiontime),
            'userStatus':this.statusValue,
            'oldUserId':this.rid
          };
          let i='/authority/one/user'
          this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.dialogTableVisible=false
            this.staff(this.page.currentPage)
          })
        }
      },
      changeIntegral(id){
        this.dialogChangeVisible=true
        this.getInformation(id)
        this.hid=id
        this.reason=''
      },
      sureNum(){
        let post = {
          'changeInt':this.num8,
          'changestr':this.reason
        };
        let i='/authority/one/user/integral/'+this.hid
        this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          // this.$cookie.set('token', res.token);
          this.dialogChangeVisible=false
          this.staff(this.page.currentPage)
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
    margin-top: 50px;
    text-align: center;
  }
  .decideBut{
    margin-left: 30px;
    width: 100px;
  }
</style>



