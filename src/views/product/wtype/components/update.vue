<template>
  <div>
    <el-dialog :visible.sync="show" :before-close="handleClose" width="80%" title="修改用户">
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
                action="https://xxxx"
                accept=".jpg,.png"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
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
import { post,uploadFile } from "../../../../common/net/axios-cfg";
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
    },
    keyId: {
      type: String,
      default: ""
    }
  },
  created() {
    console.info("update form created");
    this.loadPTypeList(0); // 载入分类0列表
    this.getUserInfo();
  },
  methods: {
    /**
     * @description 关闭Modal
     * @param reload 是否重新加载数据
     */
    cancel(reload = false) {
      this.show = false;
      this.$emit("cancel", "update", reload);
    },
    /**
     * @description 获取用户信息
     */
    getUserInfo() {
      let that = this;
      post("/api/weiadm/v1/waproducttype/id", {
        ptId: this.keyId
      })
        .then(res => {
          that.data = res.data;
        })
        .catch(err => {
          that.$message.error(err.message);
        });
    },
    /**
     * @description 确定按钮单击回调
     */
    ok() {
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          // let roles = [];
          // this.data.roles.forEach(el => {
          //   roles.push(this.roles[el]);
          // });
          let data = JSON.parse(JSON.stringify(this.data));
          //data.roles = roles;
          this.update(data);
        }
      });
    },
    /**
     * @description 更新用户数据请求
     */
    async update(data) {
      this.loading = true;
      let that = this;

      console.info(data);
      post("/api/weiadm/v1/waproducttype/update", data)
      .then(()=>{
        that.$message.success("更新成功");
          that.loading = false;
          that.cancel(true);
      })
      .catch ((err)=>{
        that.loading = false;
        that.$message.error(err.message);
      })
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
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        let that = this;

        uploadFile(file, "img").then((res)=>{
          that.data.imgURL = res.data;
          that.$message.success("图片上传成功");
        }).catch((err)=>{
          that.$message.error(err);
        });


        return false;
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

