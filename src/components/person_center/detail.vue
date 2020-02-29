<template>
  <div id="integralCenter">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px">积分明细</span>
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
              prop="integralChange"
              label="积分变动"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="integralChangestr"
              label="变动原因"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="operationName"
              label="操作人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="integralTime"
              label="变动时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="integralEndnum"
              label="变动后积分余额"
              show-overflow-tooltip
            >
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
          pageSize:10,
          count:null
        },
        tableData: [],
      }
    },
    created(){
      this.integral(1)
    },
    methods: {
      integral(page) {
        let post = {
        };
        let i='/integral/'+this.$cookie.get('token')+'/'+page
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].integralTime=this.util.formatDate(res.data.list[i].integralTime)
            }
            for(var i=0;i<res.data.list.length;i++){
              if(res.data.list[i].integralChangeint>0){
                this.tableData[i].integralChange='+'+res.data.list[i].integralChangeint
              }else{
                this.tableData[i].integralChange=res.data.list[i].integralChangeint
              }
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        this.integral(val)
      }
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
  .el-input{
    width: 300px;
  }
</style>


