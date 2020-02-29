<template>
  <div id="taskList">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span
              style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">任务列表</span>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <div>
            <el-tabs type="border-card"  v-model="activeName"  @tab-click="handleClick">
              <el-tab-pane label="待领取任务" name="0">
                <el-table
                  :data="tableData1"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="300px"
                  >
                    <template slot-scope="scope">
                      <img :src=scope.row.taskImg alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="800"
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
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-button type="primary" style="width:160px" @click="pengding(scope.row.taskId)">
                        消耗{{scope.row.taskPrice}}积分领取任务
                      </el-button>
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
              <el-tab-pane label="未完成任务" name="1">
                <el-table
                  :data="tableData2"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="300"
                  >
                    <template slot-scope="scope">
                      <img :src=scope.row.taskImg alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="600"
                  >
                    <template slot-scope="scope">
                      <h4 style="text-align: left"><b>{{scope.row.taskName}}</b></h4>
                      <div style="text-align: left">
                        <span>任务次数：{{scope.row.taskNumber}} / {{scope.row.taskCountnumber}}</span>
                        <span style="margin-left: 30px">难度：<el-rate
                          v-model=scope.row.taskDifficulty
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}" style="display: inline-block">
</el-rate>
                          </span>
                        <span style="margin-left: 30px">剩余时间：{{scope.row.Hours}}</span>
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
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-button type="primary" style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==1">发布成功
                      </el-button>
                      <el-button type="primary" style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==2">我已完成，提交审核
                      </el-button>
                      <el-button type="info" disabled style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==3">提前取消
                      </el-button>
                      <el-button type="info" disabled style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==4">已提交审核
                      </el-button>
                      <el-button type="info" disabled style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==5">任务失败
                      </el-button>
                      <el-button type="info" disabled style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==6">任务超时
                      </el-button>
                      <el-button type="info" disabled style="width:160px" @click="undone(scope.row.taskId)"
                                 v-if="scope.row.taskStatus==7">任务完成
                      </el-button>

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
              <el-tab-pane label="已完成任务" name="2">
                <el-table
                  :data="tableData3"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="300"
                  >
                    <template slot-scope="scope">
                      <img :src=scope.row.taskImg alt="" style="width: 200px;height: 140px;text-align: center">
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="800"
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
                        <span style="margin-left: 30px">限时：{{scope.row.taskTime}}</span>
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
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label=""
                    width="200"
                  >
                    <template slot-scope="">
                      <el-button type="info" disabled style="width:160px" @click="finishTask">任务完成，奖励到账</el-button>
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
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)">
    </div>
  </div>
</template>
<script>

  export default {
    name: 'operationalData',
    data() {
      return {
        statusType: '',
        activeName: '0',
        nowtime: '',
        tasktime: '',
        page: {
          currentPage1: 1,
          pageSize1: 4,
          count1: null,
          currentPage2: 1,
          pageSize2: 4,
          count2: null,
          currentPage3: 1,
          pageSize3: 4,
          count3: null
        },
        //待领取任务
        tableData1: [],
        tableData2: [],
        tableData3: [],
        totalTime: '',
        value: '',
        //未完成任务
        //已完成任务
      }
    },
    created() {
      this.taskList1(1)
    },
    methods: {
      handleClick(tab) {
        if (tab.index == 0) {
          this.taskList1(1)
        } else if (tab.index == 1) {
          this.taskList2(1)
        } else {
          this.taskList3(1)
        }
      },
      taskList1(page) {
        let post = {};
        let i = '/tasks/status/list/Pending' + '/' + page + '/u/' + this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          if(res.data){
            this.tableData1 = res.data.taskList
            this.page.count1 = res.data.total
            // this.$cookie.set('token', res.token);
            if (res.data.taskList) {
              for (var i = 0; i < res.data.taskList.length; i++) {
                this.tableData1[i].taskImage = res.data.taskList[i].taskImage
                this.tableData1[i].taskImg = this.util.params.imgUrl + this.tableData1[i].taskImage
              }
              for(var i=0;i<res.data.taskList.length;i++){
                this.tableData1[i].taskDifficulty=parseInt(res.data.taskList[i].taskDifficulty)
              }
              for (var i = 0; i < res.data.taskList.length; i++) {
                this.tableData1[i].allTime = this.util.formatDate(res.data.taskList[i].taskStarttime) + '~' + this.util.formatDate(res.data.taskList[i].taskEndtime)
              }
            }
          }else{
            this.tableData1=[]
          }
        })
      },
      handleCurrentChange1(val) {
        this.page.currentPage1 = val
        this.taskList1(val)
      },
      pengding(id) {
        let post = {};
        let i = '/tasks/status/one/' + id
        this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
          this.taskList1(1)
        })
      },
      taskList2(page) {
        let post = {};
        let i = '/tasks/status/list/undone' + '/' + page + '/u/' +this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          // this.$cookie.set('token', res.token);
          this.tableData2 = res.data.taskList
          this.page.count2 = res.data.total
          if (res.data.taskList) {
            this.tableData2.map((obj, index) => {
              this.tableData2[index].taskImage = res.data.taskList[index].taskImage
              this.tableData2[index].taskImg = this.util.params.imgUrl + this.tableData2[index].taskImage
              this.tableData2[index].taskGettime = res.data.taskList[index].taskGettime
              this.tableData2[index].end = Date.parse(new Date(this.tableData2[index].taskGettime)) + Date.parse(new Date(this.tableData2[index].taskTime * 60 * 60 * 1000))
              this.$set(
                obj,"Hours", this.InitTime(this.tableData2[index].end)
              );
              setInterval(() => {
                this.$set(
                  obj,"Hours", this.InitTime(this.tableData2[index].end)
                );
              },1000)
            })
          }
        })
      },
      undone(id) {
        let post = {};
        let i = '/tasks/status/four/' + id
        this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
          this.taskList2(this.page.currentPage2)
          // this.$cookie.set('token', res.token);
        })
      },
      handleCurrentChange2(val) {
        this.page.currentPage2 = val
        this.taskList2(val)
      },
      taskList3(page) {
        let post = {};
        let i = '/tasks/status/list/completed' + '/' + page + '/u/' + this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData3 = res.data.taskList
          this.page.count3 = res.data.total
          // this.$cookie.set('token', res.token);
          if (res.data.taskList) {
            for (var i = 0; i < res.data.taskList.length; i++) {
              this.tableData3[i].taskImage = res.data.taskList[i].taskImage
              this.tableData3[i].taskImg = this.util.params.imgUrl + this.tableData3[i].taskImage
            }
            for(var i=0;i<res.data.taskList.length;i++){
              this.tableData3[i].taskDifficulty=parseInt(res.data.taskList[i].taskDifficulty)
            }
            for (var i = 0; i < res.data.taskList.length; i++) {
              this.tableData3[i].allTime = this.util.formatDate(res.data.taskList[i].taskStarttime) + '~' + this.util.formatDate(res.data.taskList[i].taskEndtime)
            }
          }
        })
      },
      handleCurrentChange3(val) {
        this.page.currentPage3 = val
        this.taskList3(val)
      },
      InitTime(endtime) {
        let dd, hh, mm, ss = null;
        let end_time = parseInt(endtime);
        let start_time = Date.parse(new Date());
        let rightTime = end_time - start_time;
        if (rightTime > 0) {
          dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
          hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
          mm = Math.floor((rightTime / 1000 / 60) % 60);
          ss = Math.floor((rightTime / 1000) % 60);
          return dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
        }else {
          return "已过期";
        }
      },
    }
  }
</script>
<style scoped>
  .block {
    float: left;
    vertical-align: middle;
  }

  .card {
    border-bottom: 1px solid #999999;
    margin-top: 30px;
    padding-bottom: 30px
  }
</style>

