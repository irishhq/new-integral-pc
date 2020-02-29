<template>
  <div class="wys-up-single-img">

      <div class="imglogo">
        <span class="remove-btn" v-show="parentImg.tempImg !== ''" @click.stop="removeImg()">
          <i class="el-icon-close" ></i>
        </span>
        <div  v-show="parentImg.tempImg === ''">
          <i class="el-icon-upload" style="color:#50bfff;"></i>
          <div class="el-upload__text">点击上传</div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
        </div>
        <!--<img :src="parentImg.tempImg" alt="" class="temp-img">-->
        <div :style="'background-image:url(' + parentImg.tempImg + ')'" alt="" class="temp-img"></div>
        <input type="file" @change="fileUp" class="up-input" />
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'upSingleImg',
    props: {
      parentImg: {
        type: Object
      }
    },
    data() {
      return {
      };
    },
    watch: {
      parentImg(value) {
        this.$nextTick(() => {
          this.parentImg.tempImg = value;
        });
      }
    },
    methods: {
      fileUp(e) {
        const img = e.target.files[0].type;
        if (img === 'image/png' || img === 'image/jpg' || img === 'image/jpeg') {
          this.parentImg.img = e.target.files[0];
          if (this.parentImg.img) {
            this.parentImg.tempImg = window.URL.createObjectURL(this.parentImg.img);
          } else {
            this.parentImg.tempImg = '';
          }
          this.$emit('upload', this.parentImg.img);
        } else {
          this.$message('上传图片格式不正确');
        }
      },
      removeImg() {
        this.parentImg.img = '';
        this.parentImg.tempImg = '';
      }
    }
  };
</script>

<style scoped="scoped">
    .imglogo {
      max-width: 300px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      border-radius: 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

      .temp-img {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }

      .up-input {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }

      .remove-btn {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 5px;
        color: #fff;
        background-color: #409EFF;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        z-index: 2;
      }
      .el-icon-upload{
        font-size:40px;
        color:#ccc;
      }
.el-upload__text{
  color:rgb(22,155,213)
}
</style>
