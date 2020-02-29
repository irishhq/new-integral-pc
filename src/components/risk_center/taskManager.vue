<template>
  <div id="taskList">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">任务管理</span>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <div>
            <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
              <el-tab-pane label="发布任务" name="0" style="overflow: auto">
                <div style="margin-top: 15px;display: flex;" >
                  <div style="flex: 1;min-width: 310px">
                    <upsingleimg @upload="handleUpload" :parentImg="upImgData" class="upimg" ></upsingleimg>
                  </div>
                  <div style="flex: 1;min-width:290px">
                    <div style="margin-top: 40px">
                      <span>任务标题：<el-input v-model="taskName" placeholder="请输入内容" style="width: 200px"></el-input></span>
                    </div>
                    <div style="margin-top: 30px;">
                      <span>任务次数：<el-input v-model="taskCountnumber" placeholder="请输入内容" style="width: 200px"></el-input></span>
                      <!--<span style="margin-left: 10px">消耗积分：<el-input v-model="input" placeholder="请输入内容" style="width: 180px"></el-input></span>-->
                    </div>
                  </div>
                  <div style="flex: 1;min-width:290px">
                    <div style="margin-top: 50px">
                      <span>任务难度：<el-rate v-model="taskDifficulty" style="display: inline-block"></el-rate></span>
                    </div>
                    <div style="margin-top: 30px">
                      <span>单次限时：<el-select v-model="taskTime" clearable placeholder="请选择单次限时">
                          <el-option label="1小时" value="1"></el-option>
                          <el-option label="2小时" value="2"></el-option>
                          <el-option label="3小时" value="3"></el-option>
                          <el-option label="4小时" value="4"></el-option>
                          <el-option label="5小时" value="5"></el-option>
                          <el-option label="6小时" value="6"></el-option>
                          <el-option label="7小时" value="7"></el-option>
                          <el-option label="8小时" value="8"></el-option>
                          <el-option label="9小时" value="9"></el-option>
                          <el-option label="10小时" value="10"></el-option>
                          <el-option label="11小时" value="11"></el-option>
                          <el-option label="12小时" value="12"></el-option>
                          <el-option label="13小时" value="13"></el-option>
                          <el-option label="14小时" value="14"></el-option>
                          <el-option label="15小时" value="15"></el-option>
                          <el-option label="16小时" value="16"></el-option>
                          <el-option label="17小时" value="17"></el-option>
                          <el-option label="18小时" value="18"></el-option>
                          <el-option label="19小时" value="19"></el-option>
                          <el-option label="20小时" value="20"></el-option>
                          <el-option label="21小时" value="21"></el-option>
                          <el-option label="22小时" value="22"></el-option>
                          <el-option label="23小时" value="23"></el-option>
                          <el-option label="24小时" value="24"></el-option>

                        </el-select>
                      </span>
                    </div>
                  </div>
                  <div style="flex: 1;min-width: 290px;">
                    <div style="margin-top: 40px">
                      <span>消耗积分：<el-input v-model="taskPrice" placeholder="请输入内容" style="width: 200px"></el-input></span>
                    </div>
                    <div style="margin-top: 30px">
                      <span>奖励积分：<el-input v-model="taskAward" placeholder="请输入内容" style="width: 200px"></el-input></span>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 30px">
                  <span>任务有效期：<el-date-picker
                    v-model="value4"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
    </el-date-picker></span>
                </div>
                <div>
                  <span style="display: block;margin-top: 30px">任务描述：</span><el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="taskDescribe" style="width: 87%;margin-left: 90px;margin-top: -20px;">
</el-input>
                </div>
                <div style="margin-top: 30px;text-align: center;">
                  <el-button type="primary" style="width: 120px;margin-bottom: 30px" @click="tasksFirst">发布</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已发布任务" name="1">
                <el-table
                  :data="tableData1"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="250px"
                  >
                    <template slot-scope="scope">
                      <img :src="scope.row.taskImg" alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="900"
                  >
                    <template slot-scope="scope">
                      <h4 style="text-align: left"><b>{{scope.row.taskName}}</b></h4>
                      <div style="text-align: left">
                        <span>任务次数：{{scope.row.taskCountnumber}}</span>
                        <span style="margin-left: 30px">难度：<el-rate
                          v-model=scope.row.taskDifficulty
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}" style="display: inline-block">
</el-rate>
                          </span>
                        <span style="margin-left: 30px">开启时间：{{scope.row.allTime}}</span>
                        <span style="margin-left: 30px">限时：{{scope.row.taskTime}}小时</span>
                        <div style="color: black">{{scope.row.taskDescribe}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="150"
                  >
                    <template slot-scope="scope">
                      <h4><b>奖励：{{scope.row.taskAward}}积分</b></h4>
                      <h4><b>领取人：{{scope.row.userName}}</b></h4>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-button type="primary" style="width:160px" v-if='scope.row.taskStatus==3' @click="released(scope.row.taskId)">已取消任务</el-button>
                      <el-button type="primary" style="width:160px" v-if='scope.row.taskStatus==1' @click="released(scope.row.taskId)">提前取消任务</el-button>
                      <el-button type="info" disabled style="width:160px" v-if='scope.row.taskStatus==2' @click="released(scope.row.taskId)">提前取消任务</el-button>
                      <el-button type="info" disabled style="width:160px" v-if='scope.row.taskStatus==4' @click="released(scope.row.taskId)">提交审核</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align:center;margin-top: 30px">
                  <el-pagination
                    @current-change="handleCurrentChange1"
                    :current-page.sync="page.currentPage1"
                    :page-size="page.pageSize1"
                    layout="prev, pager, next, jumper"
                    :total="page.count1">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待审核任务" name="2">
                <el-table
                  :data="tableData2"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="250px"
                  >
                    <template slot-scope="scope">
                      <img :src="scope.row.taskImg" alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="900"
                  >
                    <template slot-scope="scope">
                      <h4 style="text-align: left"><b>{{scope.row.taskName}}</b></h4>
                      <div style="text-align: left">
                        <span>任务次数：{{scope.row.taskNumber}}/{{scope.row.taskCountnumber}}</span>
                        <span style="margin-left: 30px">难度：<el-rate
                          v-model=scope.row.taskDifficulty
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}" style="display: inline-block">
</el-rate>
                          </span>
                        <span style="margin-left: 30px">开启时间：{{scope.row.allTime}}</span>
                        <span style="margin-left: 30px">限时：{{scope.row.taskTime}}小时</span>
                        <div style="color: black">{{scope.row.taskDescribe}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="150"
                  >
                    <template slot-scope="scope">
                      <h4><b>奖励：{{scope.row.taskAward}}积分</b></h4>
                      <h4><b>领取人：{{scope.row.userName}}</b></h4>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="250"
                  >
                    <template slot-scope="scope">
                      <el-button type="success" style="width:75px" size="mini" @click="pendingPass(scope.row.taskId,'0')">通过</el-button>
                      <el-button type="danger" style="width:75px" size=mini @click="pendingPass(scope.row.taskId,'2')">驳回</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align:center;margin-top: 30px">
                  <el-pagination
                    @current-change="handleCurrentChange2"
                    :current-page.sync="page.currentPage2"
                    :page-size="page.pageSize2"
                    layout="prev, pager, next, jumper"
                    :total="page.count2">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="失效任务" name="3">
                <el-table
                  :data="tableData3"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="250px"
                  >
                    <template slot-scope="scope">
                      <img :src="scope.row.taskImg" alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="680"
                  >
                    <template slot-scope="scope">
                      <h4 style="text-align: left"><b>{{scope.row.taskName}}</b></h4>
                      <div style="text-align: left">
                        <span>任务次数：{{scope.row.taskCountnumber}}</span>
                        <span style="margin-left: 30px">难度：<el-rate
                          v-model=scope.row.taskDifficulty
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}" style="display: inline-block">
</el-rate>
                          </span>
                        <span style="margin-left: 30px">开启时间：{{scope.row.allTime}}</span>
                        <span style="margin-left: 30px">限时：{{scope.row.taskTime}}小时</span>
                        <div style="color: black">{{scope.row.taskDescribe}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="150"
                  >
                    <template slot-scope="scope">
                      <h4><b>奖励：{{scope.row.taskAward}}积分</b></h4>
                      <h4><b>领取人：{{scope.row.userName}}</b></h4>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-button type="primary" style="width:160px" @click="resetTask(scope.row)" v-if='scope.row.taskStatus==3'>重新发布</el-button>
                      <el-button type="primary" style="width:160px" @click="resetTask(scope.row)" v-if='scope.row.taskStatus==5'>重新发布</el-button>
                      <el-button type="primary" style="width:160px" @click="resetTask(scope.row)" v-if='scope.row.taskStatus==6'>重新发布</el-button>
                      <el-button type="info" style="width:160px" disabled @click="resetTask(scope.row)" v-if='scope.row.taskStatus==7'>已完成</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align:center;margin-top: 30px">
                  <el-pagination
                    @current-change="handleCurrentChange3"
                    :current-page.sync="page.currentPage3"
                    :page-size="page.pageSize3"
                    layout="prev, pager, next, jumper"
                    :total="page.count3">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </div>
    <div class="Wid-12">
      <el-dialog :visible.sync="dialogTableVisible" >
        <div style="margin-top: 15px;display: flex">
          <div style="flex: 1;min-width: 310px">
            <upsingleimg @upload="handleUpload" :parentImg="upImgData" class="upimg" ></upsingleimg>
          </div>
          <div style="flex: 1;min-width:290px">
            <div style="margin-top: 40px">
              <span>任务标题：<el-input v-model="taskName" placeholder="请输入内容" style="width: 200px"></el-input></span>
            </div>
            <div style="margin-top: 30px;">
              <span>任务次数：<el-input v-model="taskCountnumber" placeholder="请输入内容" style="width: 200px" type="number"></el-input></span>
            </div>
          </div>
          <div style="flex: 1;min-width:290px">
            <div style="margin-top: 50px">
              <span>任务难度：<el-rate v-model="taskDifficulty" style="display: inline-block"></el-rate></span>
            </div>
            <div style="margin-top: 30px">
                      <span>单次限时：<el-select v-model="taskTime" clearable placeholder="请选择标签类型">
                          <el-option label="1小时" value="1"></el-option>
                          <el-option label="2小时" value="2"></el-option>
                          <el-option label="3小时" value="3"></el-option>
                          <el-option label="4小时" value="4"></el-option>
                          <el-option label="5小时" value="5"></el-option>
                          <el-option label="6小时" value="6"></el-option>
                          <el-option label="7小时" value="7"></el-option>
                          <el-option label="8小时" value="8"></el-option>
                          <el-option label="9小时" value="9"></el-option>
                          <el-option label="10小时" value="10"></el-option>
                          <el-option label="11小时" value="11"></el-option>
                          <el-option label="12小时" value="12"></el-option>
                          <el-option label="13小时" value="13"></el-option>
                          <el-option label="14小时" value="14"></el-option>
                          <el-option label="15小时" value="15"></el-option>
                          <el-option label="16小时" value="16"></el-option>
                          <el-option label="17小时" value="17"></el-option>
                          <el-option label="18小时" value="18"></el-option>
                          <el-option label="19小时" value="19"></el-option>
                          <el-option label="20小时" value="20"></el-option>
                          <el-option label="21小时" value="21"></el-option>
                          <el-option label="22小时" value="22"></el-option>
                          <el-option label="23小时" value="23"></el-option>
                          <el-option label="24小时" value="24"></el-option>

                        </el-select>
                      </span>
            </div>
          </div>
          <div style="flex: 1;min-width: 290px;">
            <div style="margin-top: 40px">
              <span>消耗积分：<el-input v-model="taskPrice" placeholder="请输入内容" style="width: 200px" type="number"></el-input></span>
            </div>
            <div style="margin-top: 30px">
              <span>奖励积分：<el-input v-model="taskAward" placeholder="请输入内容" style="width: 200px" type="number"></el-input></span>
            </div>
          </div>
        </div>
        <div style="margin-top: 30px">
                  <span>任务有效期：<el-date-picker
                    v-model="value4"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
    </el-date-picker></span>
        </div>
        <div>
          <span style="display: block;margin-top: 30px">任务描述：</span><el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="taskDescribe" style="width: 87%;margin-left: 90px;margin-top: -20px;">
        </el-input>
        </div>
        <div style="margin-top: 30px;text-align: center;">
          <el-button type="primary" style="width: 120px" @click="tasksAgain">发布</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)" >
    </div>
  </div>
</template>
<script>
  import upsingleimg from '../../components/Home/upSingleImg'
  export default {
    name: 'operationalData',
    components: {
      upsingleimg
    },
    data () {
      return {
        taskName:'',
        taskDifficulty:null,
        taskPrice:'',
        taskAward:'',
        taskTime:'',
        starttime:'',
        rid:'',
        taskCountnumber:'',
        endtime:'',
        taskDescribe:'',
        value4:[],
        cover:'',
        activeName:'',
        tableData1: [],
        tableData2: [],
        tableData3: [],
        upImgData: {
          img: '',
          tempImg: ''
        },
        dialogTableVisible:false,
        page:{
          currentPage1:1,
          pageSize1:4,
          count1:null,
          currentPage2:1,
          pageSize2:4,
          count2:null,
          currentPage3:1,
          pageSize3:4,
          count3:null
        },
        value: '',
        input: '',
        value5:'3.2',
        value1:'',
      }
    },
    created(){
      this.tasks1(1)
    },
    methods: {
      handleClick(tab) {
        if(tab.index==1){
          this.upImgData.tempImg=''
          this.taskName=''
          this.taskDifficulty=null
          this.taskPrice=''
          this.taskAward=''
          this.taskTime=''
          this.value4=[]
          this.taskDescribe=''
          this.taskCountnumber=''
          this.tasks1(1)
        }else if(tab.index==2){
          this.tasks2(1)
        }else if(tab.index==3){
          this.tasks3(1)
        }
      },
      handleUpload:function(file) {
        this.cover=file
      },
      //发布任务
      tasksFirst(){
        if(this.cover==''||this.taskName==''||this.taskDifficulty==null||this.taskPrice==''||this.taskAward==''||this.taskTime==''||this.value4==[]||this.taskDescribe==''||this.taskCountnumber==''){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let formData = new FormData();
          formData.append('file', this.cover);
          formData.append('taskName', this.taskName);
          formData.append('taskDifficulty', this.taskDifficulty);
          formData.append('taskPrice', this.taskPrice);
          formData.append('taskAward', this.taskAward);
          formData.append('taskTime', this.taskTime);
          formData.append('starttime', Date.parse(new Date(this.value4[0])));
          formData.append('endtime',  Date.parse(new Date(this.value4[1])));
          formData.append('taskDescribe', this.taskDescribe);
          formData.append('taskCountnumber', this.taskCountnumber);
          let i=this.util.params.baseUrl+"/authority/five/tasks/status"
          this.$http.post(i, formData,{
            headers:{'token': this.$cookie.get('token')
            }}).then((res) => {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.upImgData.tempImg=''
            this.taskName=''
            this.taskDifficulty=null
            this.taskPrice=''
            this.taskAward=''
            this.taskTime=''
            this.value4=[]
            this.taskDescribe=''
            this.taskCountnumber=''
          })
        }
      },
      tasks1(page) {
        let post = {
        };
        let i='/authority/five/tasks/management/released/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData1=res.data.taskList
          this.page.count1=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.taskList){
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData1[i].taskImage=res.data.taskList[i].taskImage
              this.tableData1[i].taskImg=this.util.params.imgUrl+this.tableData1[i].taskImage
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData1[i].taskDifficulty=parseInt(res.data.taskList[i].taskDifficulty)
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData1[i].allTime=this.util.formatDate(res.data.taskList[i].taskStarttime)+'~'+this.util.formatDate(res.data.taskList[i].taskEndtime)
            }
          }
        })
      },
      handleCurrentChange1(val) {
        this.page.currentPage1=val
        this.tasks1(val)
      },
      released(id){
        let post = {
        };
        let i='/authority/five/task/'+id
        this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
          // this.$cookie.set('token', res.token);
          this.tasks1(this.page.currentPage1)
        })
      },
      tasks2(page) {
        let post = {
        };
        let i='/authority/five/tasks/management/pendingReview/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData2=res.data.taskList
          this.page.count2=res.data.total
          if(res.data.taskList){
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData2[i].taskImage=res.data.taskList[i].taskImage
              this.tableData2[i].taskImg=this.util.params.imgUrl+this.tableData2[i].taskImage
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData2[i].taskDifficulty=parseInt(res.data.taskList[i].taskDifficulty)
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData2[i].allTime=this.util.formatDate(res.data.taskList[i].taskStarttime)+'~'+this.util.formatDate(res.data.taskList[i].taskEndtime)
            }
          }
        })
      },
      handleCurrentChange2(val) {
        this.page.currentPage2=val
        this.tasks2(val)
      },
      pendingPass(id,type){
        let post = {
        };
        let i='/authority/five/task/'+id+'/'+type
        this.util.sendAjax(this, post, i,this.$cookie.get('token')).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.tasks2(this.page.currentPage2)
        })
      },
      tasks3(page) {
        let post = {
        };
        let i='/authority/five/tasks/management/invalid/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData3=res.data.taskList
          this.page.count3=res.data.total
          if(res.data.taskList){
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData3[i].taskImage=res.data.taskList[i].taskImage
              this.tableData3[i].taskImg=this.util.params.imgUrl+this.tableData3[i].taskImage
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData3[i].taskDifficulty=parseInt(res.data.taskList[i].taskDifficulty)
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData3[i].allTime=this.util.formatDate(res.data.taskList[i].taskStarttime)+'~'+this.util.formatDate(res.data.taskList[i].taskEndtime)
            }
          }
        })
      },
      handleCurrentChange3(val) {
        this.page.currentPage3=val
        this.tasks3(val)
      },
      resetTask(row){
        this.dialogTableVisible=true
        this.rid=row.taskId
        this.upImgData.tempImg=row.taskImg
        this.taskAward=row.taskAward
        this.taskDescribe=row.taskDescribe
        this.taskDifficulty=row.taskDifficulty
        this.taskName=row.taskName
        this.taskNumber=row.taskNumber
        this.taskPrice=row.taskPrice
        this.taskTime=row.taskTime.toString()
        this.userName=row.userName
        this.taskCountnumber=row.taskCountnumber
        this.value4[0]=row.taskStarttime.toString();
        this.value4[1]=row.taskEndtime.toString();
      },
      handleUpload:function(file) {
        this.cover=file
      },
      tasksAgain(){
        let formData = new FormData();
        formData.append('file', this.cover);
        formData.append('taskId', this.rid);
        formData.append('taskName', this.taskName);
        formData.append('taskDifficulty', this.taskDifficulty);
        formData.append('taskPrice', this.taskPrice);
        formData.append('taskAward', this.taskAward);
        formData.append('taskTime', this.taskTime);
        formData.append('starttime', Date.parse(new Date(this.value4[0])));
        formData.append('endtime',  Date.parse(new Date(this.value4[1])));
        formData.append('taskDescribe', this.taskDescribe);
        formData.append('taskCountnumber', this.taskCountnumber);
        let i=this.util.params.baseUrl+'/authority/five/task/again'
        this.$http.put(i, formData,{
          headers:{'token': this.$cookie.get('token')
          }}).then((res) => {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          this.dialogTableVisible=false
          this.tasks3(this.page.currentPage3)
          this.upImgData.tempImg=''
          this.taskName=''
          this.taskDifficulty=null
          this.taskPrice=''
          this.taskAward=''
          this.taskTime=''
          this.value4=[]
          this.taskDescribe=''
          this.taskCountnumber=''

        })
      }
      //已发布任务
      //待审核任务
      //失效任务
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




