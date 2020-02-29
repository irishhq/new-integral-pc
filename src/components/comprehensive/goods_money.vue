<template>
  <div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span style="font-size: 22px;color: #333333;line-height: 40px;">商品发布</span>
          </div>
          <div>
            <el-button type="primary" class="title-but" @click="addgoods" style="width: 100px">添加商品</el-button>
            <el-input placeholder="请输入商品描述" v-model="searchName"  class="title-but" style="margin-right: 80px">
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
              width="180px"
            >
              <template slot-scope="scope">
                <img :src=scope.row.prizeImg alt="" style="width: 125px;height: 70px;text-align: center">
              </template>
            </el-table-column>
            <el-table-column
              prop="prizeName"
              label="商品描述"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prizePrice"
              label="商品单价"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prizeAmount"
              label="商品库存"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prizeQuota"
              label="限购数量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prizeCondition"
              label="购买条件"
              width="150"
            >
              <template slot-scope="scope">
                <span>积分余额>={{scope.row.prizeCondition}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="prizeCondition"
              label="状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-tag type="success" size="mini" v-if="scope.row.prizeStatus=='2'">上架</el-tag>
                <el-tag type="danger" size="mini" v-if="scope.row.prizeStatus=='1'">下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="prizeStatus"
              label="操作"
              width="250"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button type="success" size="mini" v-if="scope.row.prizeStatus=='1'" @click="status1(scope.row.prizeId)">上架</el-button>
                <el-button type="warning" size="mini" v-if="scope.row.prizeStatus=='2'" @click="status2(scope.row.prizeId)">下架</el-button>
                <el-button type="primary" size="mini" v-if="scope.row.prizeStatus=='1'" @click="resetList(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" v-if="scope.row.prizeStatus=='1'" @click="deletePartner(scope.row.prizeId)">删除</el-button>
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
      <el-dialog title="添加商品" :visible.sync="dialogTableVisible" >
        <div style="margin-left: 25px">
          <p>商品图片<upsingleimg @upload="handleUpload" :parentImg="upImgData" class="upimg" style="margin-left: 80px;margin-top: -15px"></upsingleimg>
          </p>
          <div>
            <p>商品名称<el-input v-model="prizeName" placeholder="请输入商品名称" style="margin-left: 25px;margin-top: 20px"></el-input></p>
            <p>库存数量<el-input v-model="prizeAmount" placeholder="请输入库存数量" style="margin-left: 25px;margin-top: 20px" type="number"></el-input></p>
            <p>商品单价<el-input v-model="prizePrice" placeholder="请输入商品单价" style="margin-left: 25px;margin-top: 20px" type="number"></el-input></p>
            <p>限购数量<el-input v-model="prizeQuota" placeholder="请输入限购数量" style="margin-left: 25px;margin-top: 20px" type="number"></el-input></p>
            <p>购买条件<el-input v-model="prizeCondition" placeholder="请输入购买条件" style="margin-left: 25px;margin-top: 20px" type="number"></el-input></p>
          </div>
        </div>
        <div class="decide">
          <el-button  class="decideBut" @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" class="decideBut" @click="sureGoods" v-if="state==1">确认</el-button>
          <el-button type="primary" class="decideBut" @click="sureResetList" v-if="state==2">提交</el-button>
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
        page:{
          currentPage:1,
          pageSize:4,
          count:null
        },
        state:'',
        tableData: [],
        cover:'',
        upImgData: {
          img: '',
          tempImg: ''
        },
        rid:'',
        searchName:'',
        prizeName:'',
        prizePrice:'',
        prizeQuota:'',
        prizeCondition:'',
        prizeStatus:'',
        prizeAmount:'',
        mid:'0',
        dialogTableVisible: false,
      }
    },
    created(){
      this.release(1)
    },
    watch:{
      searchName:function(){
        if(this.searchName==''){
          this.mid=0
          this.release(1)
        }
      }
    },
    methods: {
      //获取商品列表
      release(page) {
        let post = {
        };
        let i='/authority/two/prizes/'+page+'/'+this.$cookie.get('token')
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
          this.release(val)
        }else{
          this.searchData(val)
        }
      },
      status1(id){
        let post = {
        };
        let i='/authority/two/prize/statusOne/'+id
        this.util.sendAjax(this, post, i,this.$cookie.get('token')).then((res) => {
          this.release(this.page.currentPage)
          // this.$cookie.set('token', res.token);
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
        let i='/authority/two/prizes/'+this.searchName+'/'+page+'/'+this.$cookie.get('token')
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
      status2(id){
        let post = {
        };
        let i='/authority/two/prize/statusTwo/'+id
        this.util.sendAjax(this, post, i,this.$cookie.get('token')).then((res) => {
          this.release(this.page.currentPage)
          // this.$cookie.set('token', res.token);
        })
      },
      handleUpload:function(file) {
        this.cover=file
      },
      addgoods(){
        this.state=1
        this.dialogTableVisible=true;
        this.upImgData.tempImg=''
        this.prizeName=''
        this.prizePrice=''
        this.prizeQuota=''
        this.prizeCondition=''
        this.prizeAmount=''
      },
      sureGoods(){
        if(this.upImgData.tempImg==''||this.prizeName==''||this.prizePrice==''||this.prizeQuota==''||this.prizeCondition==''||this.prizeAmount==''){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let formData = new FormData();
          formData.append('file', this.cover);
          formData.append('prizeName', this.prizeName);
          formData.append('prizePrice', this.prizePrice);
          formData.append('prizeQuota', this.prizeQuota);
          formData.append('prizeCondition', this.prizeCondition);
          formData.append('prizeStatus', 1);
          formData.append('prizeAmount', this.prizeAmount);
          let i=this.util.params.baseUrl+'/authority/two/prize'
          this.$http.post(i, formData,{
            headers:{'token': this.$cookie.get('token')}
          }).then((res) => {
            this.$message({
              message: '创建成功',
              type: 'success'
            });
            // this.$cookie.set('token', res.token);
            this.dialogTableVisible=false
            this.release(1)
          })
        }
      },
      deletePartner(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let post = {
          };
          let i='/authority/two/prize/'+id+'/'+this.$cookie.get('token')
          this.util.sendDelete(this, post, i).then((res) => {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            // this.$cookie.set('token', res.token);
            this.release(this.page.currentPage)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      resetList(row){
        this.dialogTableVisible=true
        this.rid=row.prizeId
        this.upImgData.tempImg=row.prizeImg
        this.state=2
        this.prizeName=row.prizeName
        this.prizePrice=row.prizePrice
        this.prizeQuota=row.prizeQuota
        this.prizeCondition=row.prizeCondition
        this.prizeAmount=row.prizeAmount
      },
      sureResetList(){
        if(this.prizeName==''||this.prizePrice==''||this.prizeQuota==''||this.prizeCondition==''||this.prizeAmount==''){
          this.$message({
            message: '请填写全部内容',
            type: 'error'
          });
        }else{
          let formData = new FormData();
          formData.append('file', this.cover);
          formData.append('prizeId', this.rid);
          formData.append('prizeName', this.prizeName);
          formData.append('prizePrice', this.prizePrice);
          formData.append('prizeQuota', this.prizeQuota);
          formData.append('prizeCondition', this.prizeCondition);
          formData.append('prizeStatus', 1);
          formData.append('prizeAmount', this.prizeAmount);
          let i=this.util.params.baseUrl+'/authority/two/prize'
          this.$http.put(i, formData,{headers:{'token': this.$cookie.get('token')
            }}).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.dialogTableVisible=false
            this.release(this.page.currentPage)
          })
        }
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
</style>


