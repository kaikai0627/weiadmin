<template>
  <div>
    <el-dialog :visible.sync="show" :before-close="handleClose" width="80%" title="添加用户">
      <el-form ref="modalForm" :model="data" :rules="ruls" size="small" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号" prop="employNo">
              <el-input v-model.trim="data.employNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="data.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" prop="deptId">
              <el-select v-model="data.deptId">
                <el-option
                  v-for="item in [{label:'默认',value:0}]"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="Sex">
              <el-select v-model="data.sex">
                <el-option
                  v-for="item in [{label:'男',value:'男'},{label:'女',value:'女'}]"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="头像" prop="avatarUrl">
                <el-input v-model.trim="data.avatarUrl"></el-input>
        </el-form-item>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" prop="Mobi">
              <el-input v-model.trim="data.mobi"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务" prop="Sex">
              <el-select v-model="data.duty">
                <el-option v-for="item in dutyList" :value="item" :key="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="生日">
                <el-date-picker v-model="data.birthDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="入职日期">
                <el-date-picker v-model="data.jobDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="微信id" prop="openId">
              <el-input v-model.trim="data.openId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="Sex">
              <el-select v-model="data.isActive">
                <el-option
                  v-for="item in [{label:'正常',value:true},{label:'锁定',value:false}]"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                >{{ item.label }}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model.trim="data.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重复密码" prop="repassword">
              <el-input type="password" v-model.trim="data.repassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="角色组">
          <el-checkbox-group v-model="data.roles">
            <el-checkbox
              v-for="item in roles"
              :label="item.groupId"
              :key="item.groupId"
            >{{item.groupName}}</el-checkbox>
          </el-checkbox-group>
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
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.data.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: true,
      loading: false,
      data: {
        employNo: "",
        name: "",
        avatarUrl: "",
        sex: "男",
        birthDate: "1990-01-01",
        jobDate: "",
        duty: "员工",
        password: "",
        repassword: "",
        mobi: "",
        openId: "",
        deptId: 0,
        isActive: true,
        roles: []
      },
      dutyList: ["员工", "部门经理", "总经理"],
      ruls: {
        employNo: [
          { required: true, message: "工号不能为空" },
          {
            pattern: /^(\w){4,20}$/,
            message: "用户名应为[A-Za-z0-9_]组成的4-20位字符"
          }
        ],
        // name: [
        //     { required: true, message: "姓名不能为空" },
        //     {pattern:/^(\w){2,20}$/,message:'用户名应为[A-Za-z0-9_]组成的2-20位字符'}
        // ],
        password: [
          { required: true, message: "请填写密码" },
          {
            pattern: /^(\w){4,18}$/,
            message: "密码应为[A-Za-z0-9_]组成的4-18位字符"
          }
        ],
        repassword: [{ validator: validateConfirmPwd }],
        roles: [{ required: true, message: "请至少选择一个角色" }]
      }
    };
  },
  props: {
    roles: {
      type: Array,
      default: []
    }
  },
  created() {
    console.info("add form created");
    // this.getUserInfo();
    console.info(JSON.stringify(this.roles));
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

      post("/api/weiadm/v1/user/add", data)
        .then(() => {
          that.$message.success("用户 " + data.name + " 添加成功");
          that.loading = false;
          that.cancel(true);
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


