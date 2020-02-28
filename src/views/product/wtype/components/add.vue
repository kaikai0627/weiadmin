<template>
  <div>
    <el-dialog :visible.sync="show" :before-close="handleClose" width="80%" title="添加分类">
      <el-form ref="modalForm" :model="data" :rules="ruls" size="small" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级分类" prop="parentId">
              <el-input v-model.trim="parentId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="parentName">
              <el-input v-model.trim="parentName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="分类名称" prop="nodeText">
              <el-input v-model.trim="data.nodeText"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顺序" prop="sortId">
              <el-input v-model.trim="data.sortId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="商品类型" prop="productType0">
              <el-select v-model="data.productType0">
                <el-option
                  v-for="item in ptype0List"
                  :value="item"
                  :key="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="一级品类" prop="productType1">
              <el-select v-model="data.productType1">
                <el-option
                  v-for="item in ptype1List"
                  :value="item"
                  :key="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二级品类" prop="productType2">
              <el-select v-model="data.productType2">
                <el-option
                  v-for="item in ptype2List"
                  :value="item"
                  :key="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="三级品类" prop="productType3">
              <el-select v-model="data.productType3">
                <el-option
                  v-for="item in ptype3List"
                  :value="item"
                  :key="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


            <el-form-item label="图片" prop="Mobi">
              <el-input v-model.trim="data.imgURL"></el-input>
              <el-upload
                class="avatar-uploader"
                action=""
                accept=".jpg,.png"
                
                :show-file-list="false"
                :http-request="doUploadFile"
                :before-upload="beforeUpload">
                <img v-if="data.imgURL" :src="data.imgURL" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
      </el-form>

      

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="cancel(false)">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post, uploadFile } from "../../../../common/net/axios-cfg";
export default {
  data() {
    return {
      show: true,
      loading: false,
      data: {
        ptId: "",
        parentId: "",
        nodeLevel: 0,
        nodeType: 0,
        nodeText: "",
        nodeParam: "",
        imgURL: "",
        productType0: "",
        productType1: "",
        productType2: "",
        productType3: "",
        sortId: 9999,
        status: 20,
        shopId: ""
      },

      uploadFileData: [], // 上传的文件Data

      ptype0List: [],
      ptype1List: [],
      ptype2List: [],
      ptype3List: [],

      ruls: {
        nodeText: [
          { required: true, message: "分类名不能为空" }
        ]
      }
    };
  },
  props: {
    parentId: {
      type: String,
      default: ""
    },
    parentName: {
      type: String,
      default: ""
    }
  },
  created() {
    console.info("add form created");
    this.data.parentId = this.parentId;
    if (this.parentId){
      this.data.parentId = this.parentId;
      this.data.nodeLevel = 1;
    }else{
      this.data.parentId = "0";
      this.data.nodeLevel = 0;
    }

    this.loadPTypeList(0); // 载入分类0列表


  },
  methods: {
    /**
     * @description 关闭Modal
     * @param reload 是否重新加载数据
     */
    cancel(reload = false) {
      this.show = false;
      this.$emit("cancel", "add", reload);
    },
    /**
     * @description 确定按钮单击回调
     */
    ok() {
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          // let roles = []
          // console.info(JSON.stringify(this.data));
          // this.data.roles.forEach(el=>{
          //     roles.push(this.roles[el]);
          // })
          let data = JSON.parse(JSON.stringify(this.data));
          //data.roles = roles;
          this.add(data);
        }
      });
    },
    /**
     * @description 添加用户数据请求
     */
    add(data) {
      this.loading = true;
      let that = this;

      post("/api/weiadm/v1/waproducttype/add", data)
        .then(() => {
          that.$message.success("添加成功");
          that.loading = false;
          that.cancel(true);
        })
        .catch(err => {
          that.loading = false;
          that.$message.error(err.message);
        });
    },
    /**
     * @description 加载某个列表的列表
     * level 为 0-3, 表示加载tname0-tname3
     */
    loadPTypeList(level){
      this.loading = true;
      let that = this;
      post("/api/weiadm/v1/product/getPTypeForStepSel", {        
        retLevel: level,
        searchText: "",
        tname0: level>0 ? this.data.productType0: "",
        tname1: level>1 ? this.data.productType1: "",
        tname2: level>2 ? this.data.productType0: "",
        tname3: level>3 ? this.data.productType0: ""
      })
        .then((res) => {
          if (level==3){
            that.ptype3List = res.data;
            that.ptype3List.unshift("");
          }
          else if (level==2){
            that.ptype2List = res.data;
            that.ptype2List.unshift(""); // 头部添加空行
            that.ptype3List.length =0;
          }else if (level==1){
            that.ptype1List = res.data;
            that.ptype1List.unshift("");
            that.ptype2List.length =0;
            that.ptype3List.length =0;
          }else {
            that.ptype0List = res.data;
            that.ptype0List.unshift("");
            that.ptype1List.length =0;
            that.ptype2List.length =0;
            that.ptype3List.length =0;
          }
          that.loading = false;
        })
        .catch(err => {
          that.loading = false;
          that.$message.error(err.message);
        });
    },

    // handleAvatarSuccess(res, file) {
    //     this.data.imgURL = URL.createObjectURL(file.raw);
    // },

    /**
     * @description 上传图片
     */
    beforeUpload(fileInfo) {
        // console.info("上传文件信息:"+fileInfo.name)
        // console.info(fileInfo)
        const isJPG = fileInfo.type === 'image/jpeg' || fileInfo.type === 'image/png';
        const isLt2M = fileInfo.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或者PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }    
        return true;
    },

    doUploadFile(param){
        console.info("上传文件信息param:")
        console.info(param)
        let that = this;
        uploadFile(param.file, "img")
        .then((res)=>{
          that.data.imgURL = res.data;
          that.$message.success("图片上传成功");
        }).catch((err)=>{
          that.$message.error(err);
        });
    },

    /**
     * @description 关闭窗口事件
     */
    handleClose(done) {
      //this.$confirm('确认关闭？')
      //  .then(() => {
      done();
      //  })
      //  .catch(() => {});
    }
  }
};
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
