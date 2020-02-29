<template>
  <div id="manageJurisdiction">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">权限设置</span>
          </div>
          <div>
            <el-button type="primary" class="title-but" @click="addpartner" style="width: 100px">添加员工</el-button>
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
              label="员工姓名"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userId"
              label="员工账号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="所属部门"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="positionName"
              label="员工职级"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="getRoleTime"
              label="添加时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="resetJurisdiction(scope.row)">修改权限</el-button>
                <el-button type="danger" size="mini" @click="deletePartner(scope.row.userId)">删除</el-button>
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
      <el-dialog :visible.sync="dialogTableVisible" >
        <div style="margin-left: 25px" >
          <p v-if="state==1">员工选择<el-select v-model="staff" placeholder="请选择标签类型" style="margin-left: 20px;width: 300px" >
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
          </p>
          <p>权限选择
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in option" :label="item.roleId" :key="item.roleId" style="display: block;margin-top: 30px">{{item.roleName}}</el-checkbox>
             </el-checkbox-group>
          </p>
        </div>
        <div class="decide">
          <el-button  class="decideBut" @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" class="decideBut" @click="newPush" v-if="state==1">确认</el-button>
          <el-button type="primary" class="decideBut" @click="againPush" v-if="state==2">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)" >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'manageJurisdiction',
    data () {
      return {
        page:{
          currentPage:1,
          pageSize:10,
          count:null
        },
        dialogTableVisible: false,
        options:[],
        tableData:[],
        staff:'',
        option:[],
        checkList: [],
        state:'',
      }
    },
    created(){
      this.roles(1)
    },
    methods: {
      roles(page) {
        let post = {
        };
        let i='/authority/all/role/users/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          // this.$cookie.set('token', res.token);
          this.page.count=res.data.total
        })
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        this.roles(val)
      },
      //点击添加员工的弹窗
      addpartner(){
        this.dialogTableVisible=true
        this.option1()
        this.option2()
        this.state=1
        this.staff=''
        this.checkList=[]
      },
      //员工选择下拉框
      option1(){
        let post = {
        };
        let i='/authority/all/role/users/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.options=res.data
          // this.$cookie.set('token', res.token);
        })
      },
      //获取权限选择的内容
      option2(){
        let post = {
        };
        let i='/authority/all/roles/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.option=res.data
          // this.$cookie.set('token', res.token);
        })
      },
      //添加员工弹窗之后的提交
      newPush(){
        let post = {
          'userId':this.staff,
          'roles':this.checkList,
        };
        let i='/authority/all/roles'
        this.util.sendAjax(this, post, i,this.$cookie.get('token')).then((res) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          // this.$cookie.set('token', res.token);
          this.dialogTableVisible=false
          this.roles(1)
        })
      },
      //删除
      deletePartner(id){
        this.$confirm('此操作将删除员工权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
          };
          let i='/authority/all/role/'+id+'/'+ this.$cookie.get('token')
          this.util.sendDelete(this, post, i).then((res) => {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            // this.$cookie.set('token', res.token);
            this.roles(this.page.currentPage)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      resetJurisdiction(row){
        this.option2()
        this.checkList=[]
        this.staff=row.userId
        this.dialogTableVisible=true
        this.state=2
        this.listPush(row.userId)
      },
      listPush(id){
        let post = {
        };
        let i='/authority/all/roles/'+id+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.checkList=[]
          // this.$cookie.set('token', res.token);
          if(res.data){
            for(var i=0;i<res.data.length;i++){
              this.checkList.push(res.data[i].roleId)
            }
          }
        })
      },
      againPush(){
        let post = {
          'userId':this.staff,
          'roles':this.checkList,
        };
        console.log(post)
        let i='/authority/all/roles'
        this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          // this.$cookie.set('token', res.token);
          this.dialogTableVisible=false
          this.roles(this.page.currentPage)
        })
      }

    }
  }
</script>
<style scoped>
  #manageJurisdiction .el-checkbox{
    margin-left: 30px;
  }
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
  .decide{
    margin-top: 40px;
    text-align: center;
  }
  .decideBut{
    margin-left: 30px;
    width: 100px;
  }
</style>

