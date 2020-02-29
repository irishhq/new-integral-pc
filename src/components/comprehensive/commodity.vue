<template>
  <div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;">商品兑换列表</span>
          </div>
          <div>
            <el-input placeholder="请输入商品名称" v-model="searchName"  class="title-but" >
              <template slot="append">
                <el-button @click="search">
                  搜索
                </el-button></template>
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
              prop="date"
              label="商品图片"
              width="225px"
            >
              <template slot-scope="scope">
                <img :src=scope.row.prizeImg alt="" style="width: 125px;height: 70px;text-align: center">
              </template>
            </el-table-column>
            <el-table-column
              prop="prizeName"
              label="商品名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="exchangeCount"
              label="兑换数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="exchangeTime"
              label="兑换时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="userName"
              label="兑换人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" v-if="scope.row.exchangeStatus==1" @click="exchangeSure(scope.row.exchangeId)" style="width:100px">确认兑换</el-button>
                <el-button type="info" size="mini" v-if="scope.row.exchangeStatus!=1" disabled style="width:100px">已完成</el-button>
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
        mid:0,
        page:{
          currentPage:1,
          pageSize:4,
          count:null
        },
        searchName:'',


        value: '',
        dialogTableVisible: false,
        formLabelWidth: '120px',
        input: '',
        num6:'1',
        value1:'',
        value4: '',
      }
    },
    created(){
      this.exchangeLists(1)
    },
    watch:{
      searchName:function(){
        if(this.searchName==''){
          this.mid=0
          this.exchangeLists(1)
        }
      }
    },
    methods: {
      exchangeLists(page) {
        let post = {
        };
        let i='/authority/three/exchangeLists/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].prizeImage=res.data.list[i].prizeImage
              this.tableData[i].prizeImg=this.util.params.imgUrl+this.tableData[i].prizeImage
              // alert( this.tableData[i].prizeImg)
            }
          }
        })
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
        let i='/authority/three/exchangeLists/'+this.searchName+'/'+page+'/'+this.$cookie.get('token')
        this.util.sendGet(this, post, i).then((res) => {
          this.tableData=res.data.list
          this.page.count=res.data.total
          // this.$cookie.set('token', res.token);
          if(res.data.list){
            for(var i=0;i<res.data.list.length;i++){
              this.tableData[i].prizeImage=res.data.list[i].prizeImage
              this.tableData[i].prizeImg=this.util.params.imgUrl+this.tableData[i].prizeImage
            }
          }
        })
      },
      handleCurrentChange(val) {
        this.page.currentPage=val
        if(this.mid==0){
          this.exchangeLists(val)
        }else{
          this.searchData(val)
        }
      },
      exchangeSure(id){
          let post = {
          };
          let i='/authority/three/exchangeLists/'+id
          this.util.sendPut(this, post, i,this.$cookie.get('token')).then((res) => {
            this.$message({
              message: '兑换成功',
              type: 'success'
            });
            // this.$cookie.set('token', res.token);
            this.exchangeLists(this.page.currentPage)
          })

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
    margin-right: 100px;
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


