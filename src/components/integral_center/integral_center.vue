<template>
  <div id="integralCenter">
    <div style="width: 100%;">
      <el-col :span="8" style="width: 100%;">
        <el-card shadow="hover" style="height: 80px;border-bottom: 1px solid #999999">
          <div class="block">
            <span
              style="font-size: 22px;color: #333333;line-height: 40px;margin-left: 10px;margin-right: 60px"
            >积分排行榜</span>
          </div>
          <div>
            <el-button type="primary" class="title-but" style="width: 100px" @click="exportExcel">导出</el-button>
            <el-input
              placeholder="请输入姓名/部门"
              v-model="searchName"
              class="title-but"
              style="margin-right: 80px"
            >
              <template slot="append">
                <el-button @click="search">搜索</el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;">
      <el-col :span="8" style="width: 98%;margin-left: 20px">
        <el-card shadow="hover" class="card">
          <el-table :data="tableData" style="width: 100%" id="table">
            <el-table-column prop="num" label="排名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deptName" label="部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="positionName" label="职位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userId" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="userInductiontime"
              label="入职时间"
              width="180"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="userIntegral" label="当前积分" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userStatus" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.userStatus | statusFilter}}</template>
            </el-table-column>
          </el-table>
          <div style="text-align:center;margin-top: 30px">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page.currentPage"
              :page-size="page.pageSize"
              layout="prev, pager, next, jumper"
              :total="page.count"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </div>
    <div style="width: 100%;height:50px;float: left;background: rgba(0,0,0,0)"></div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "integralCenter",
  data() {
    return {
      searchName: "",
      mid: 0,
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        count: null
      }
    };
  },
  created() {
    this.information(1);
  },
  filters: {
    statusFilter(type) {
      switch (type) {
        case 0:
          return "正常";
        case 1:
          return "积分冻结";
        case 2:
          return "书面警告";
        case 3:
          return "留职观察";
        case 4:
          return "离职";
        case 5:
          return "超级管理员";
      }
    }
  },
  watch: {
    searchName: function() {
      if (this.searchName == "") {
        this.mid = 0;
        this.information(1);
      }
    }
  },
  methods: {
    exportExcel() {
      /* generate workbook object from table */
      // var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
      // /* get binary string as output */
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
      window.location.href = this.util.params.baseUrl + "/excel";
    },
    information(page) {
      let post = {
        // token:this.$cookie.get('token')
      };
      let i = "/userIntegrals/" + page + "/" + this.$cookie.get("token");
      this.util.sendGet(this, post, i).then(res => {
        this.tableData = res.data.User;
        this.page.count = res.data.total;
        if (res.data.User) {
          for (var i = 0; i < res.data.User.length; i++) {
            this.tableData[i].userInductiontime = this.util.formatDate(
              res.data.User[i].userInductiontime
            );
          }
        }
      });
    },
    search() {
      this.searchData(1);
      if (this.searchName == "") {
        this.mid = 0;
      } else {
        this.mid = 1;
      }
    },
    searchData(page) {
      let post = {};
      let i =
        "/userIntegrals/" +
        page +
        "/" +
        this.searchName +
        "/" +
        this.$cookie.get("token");
      this.util.sendGet(this, post, i).then(res => {
        this.tableData = res.data.User;
        this.page.count = res.data.total;
        // this.$cookie.set('token', res.token);
        if (res.data.User) {
          for (var i = 0; i < res.data.User.length; i++) {
            this.tableData[i].userInductiontime = this.util.formatDate(
              res.data.User[i].userInductiontime
            );
          }
        }
      });
    },
    //currentPage改变时会触发
    handleCurrentChange(val) {
      this.page.currentPage = val;
      if (this.mid == 0) {
        this.information(val);
      } else {
        this.searchData(val);
      }
    }
  }
};
</script>
<style scoped>
.block {
  float: left;
  vertical-align: middle;
}
.title-but {
  float: right;
}
.card {
  border-bottom: 1px solid #999999;
  margin-top: 30px;
  padding-bottom: 30px;
}
.el-input {
  width: 300px;
}
</style>

