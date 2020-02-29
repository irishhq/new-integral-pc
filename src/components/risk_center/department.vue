<template>
  <div id="integralCenter">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">部门设置</span>
          </div>
          <div>
            <el-button type="primary" class="title-but" @click="build" style="width: 100px">新建部门</el-button>
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
              prop="deptName"
              label="部门名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="deptDescribe"
              label="部门描述"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="deptInductiontime"
              label="成立时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="resetList(scope.row.deptId)">修改</el-button>
                <el-button type="danger" size="mini" @click="deleteList(scope.row.deptId)">删除</el-button>
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
      <el-dialog title="部门信息" :visible.sync="dialogTableVisible" >
        <div style="margin-left: 25px">
          <div>
            <p >部门名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="deptName" placeholder="请输入部门名称"></el-input></p>
            <p style="margin-top: 25px">部门描述：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="deptDescribe" placeholder="请输入部门描述"></el-input></p>
            <p style="margin-top: 25px">部门成立时间&nbsp;&nbsp;
              <el-date-picker
                v-model="deptInductiontime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </p>
            <p style="margin-top: 25px">部门等级范围<el-input placeholder="请输入等级范围" v-model="professionRange" style="margin-left: 13px">
              <template slot="append">
                <el-button @click="add">
                  添加
                </el-button></template>
            </el-input></p>
            <table style="margin-top: 30px">
              <tr style="margin-top: 20px">
                <td>
                  <span style="display: inline-block;margin-left: 95px;margin-top: 35px;height: 15px;width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-for="(item,index) in newData" :key="index">{{item}}</span>
                </td>
                <td style="margin-left: 50px;">
                  <el-button type="danger" size="mini" style="margin-left: 50px;margin-top: 25px" v-for="(item,index) in newData" :key="index" @click="deleteRange(index)">删除</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="decide">
          <el-button  class="decideBut" @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" class="decideBut" @click="newProfession" v-if="state==1">确认</el-button>
          <el-button type="primary" class="decideBut" @click="againProfession" v-if="state==2">提交</el-button>
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
        tableData: [],
        page:{
          currentPage:1,
          pageSize:8,
          count:null
        },
        state:'',
        professionRange:'',
        newData:[],
        deptName:'',
        deptDescribe:'',
        deptInductiontime:'',
        rid:'',
        value: '',
        dialogTableVisible: false,
        formLabelWidth: '120px',
        input: '',
        value1:'',
        value4: ''
      }
    },
    created(){
      this.authority(1)
    },
    methods: {
      authority(page) {
        let post = {
        };
        let i='/authority/four/depts/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].deptInductiontime=this.util.formatDate(res.data.list[i].deptInductiontime)
            }
          }
        })
      },
      add(){
        if(this.professionRange==''){
          this.$message({
            message: '请添加内容',
            type: 'error'
          });
        }else{
          this.newData.push(this.professionRange)
          this.professionRange=''
        }
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        this.authority(val)
      },
      build(){
        this.dialogTableVisible=true
        this.newData=[]
        this.deptName=''
        this.deptDescribe=''
        this.deptInductiontime=''
        this.state=1
      },
      newProfession() {
        if(this.newData==[]||this.deptDescribe==''||this.deptInductiontime==''||this.deptName==''||this.deptInductiontime==null){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else {
          let post = {
            positionArray: this.newData,
            deptName: this.deptName,
            deptDescribe: this.deptDescribe,
            deptInductiontime: this.util.formatDate(this.deptInductiontime)
          };
          let i = '/authority/four/dept'
          this.util.sendAjax(this, post, i, this.$cookie.get('token')).then((res) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.dialogTableVisible = false
            this.authority(this.page.currentPage)
          })
        }
      },
      deleteList(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
          };
          let i='/authority/four/dept/'+id+'/'+this.$cookie.get('token')
          this.util.sendDelete(this, post, i).then((res) => {
            this.authority(this.page.currentPage)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      resetList(id){
        this.dialogTableVisible=true
        this.state=2
        this.rid=id
        let post = {
        };
        let i='/authority/four/dept/'+id+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
            this.deptName=res.data.deptName
            // this.$cookie.set('token', res.token);
            this.deptDescribe=res.data.deptDescribe
            this.deptInductiontime=res.data.deptInductiontime
            this.newData=[]
            if(res.data){
              for(var i=0;i<res.data.positions.length;i++){
                 this.newData.push(res.data.positions[i].positionName)
              }
             }
        })
      },
      deleteRange(index){
        this.newData.splice(index,1)
      },
      againProfession(){
        if(this.newData==[]||this.deptDescribe==''||this.deptInductiontime==''||this.deptName==''||this.deptInductiontime==null){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let post = {
            deptId:this.rid,
            positionArray:this.newData,
            deptName:this.deptName,
            deptDescribe:this.deptDescribe,
            deptInductiontime:this.util.formatDate(this.deptInductiontime)
          };
          let i='/authority/four/dept'
          this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.dialogTableVisible=false
            this.authority(this.page.currentPage)
          })
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
</style>

