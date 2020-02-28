<template>
  <div>
    <el-dialog :visible.sync="show" :before-close="handleClose" title="重置密码">
      <el-form ref="modalForm" :model="data" :rules="ruls" :label-width="80">
        <el-form-item label="新密码" prop="password">
          <el-input v-model.trim="data.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="rePassword">
          <el-input v-model.trim="data.rePassword" type="password"></el-input>
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
import { post } from "../../../../common/net/axios-cfg";
export default {
  data() {
    return {
      show: true,
      loading: false,
      data: {
        password: "",
        rePassword: ""
      },
      ruls: {
        password: [
          { required: true, message: "请填写密码" },
          {
            pattern: /^(\w){4,18}$/,
            message: "密码应为[A-Za-z0-9_]组成的4-18位字符"
          }
        ],
        rePassword: {
          validator: (rule, value, callback, source, options) => {
            if (value === "") {
              callback(new Error("请再次输入密码"));
            } else if (value !== this.data.password) {
              callback(new Error("两次输入密码不一致!"));
            } else {
              callback();
            }
          }
        }
      }
    };
  },
  props: {
    uid: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @description 关闭Modal
     * @param reload 是否重新加载数据
     */
    cancel(reload = false) {
      this.show = false;
      this.$emit("cancel", "resetPassword", reload);
    },
    ok() {
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          this.resetPost({
            password: this.data.password,
            userId: this.uid
          });
        }
      });
    },
    resetPost(data) {
      this.loading = true;
      let that = this;
      post("/api/weiadm/v1/user/reset-password", data)
        .then(() => {
          this.$message.success("密码重置成功");
          that.loading = false;
          that.cancel(false);
        })
        .catch(err => {
          that.loading = false;
          that.$message.error(err.message);
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
