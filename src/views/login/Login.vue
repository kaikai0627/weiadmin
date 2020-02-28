<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { post } from "../../common/net/axios-cfg";
import storekit from '../../common/utils/store-kit'
export default {
    data: function() {
        return {
            param: {
                username: '00001',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }, //非空验证 
                    { min: 4, max: 18, message: "长度在 4 到 18 个字符", trigger: "blur" } //长度验证
                    ],
                // password: [
                //     { required: true, message: "请输入密码", trigger: "blur" },
                //     { min: 4, max: 18, message: "长度在 4 到 18 个字符", trigger: "blur" }
                //     ]
            },
        };
    },
    created: function () {
        this.loginForm.username = storekit.getLastLoginName();    
    },
    methods: {
        submitForm() {
            this.isLogining=true;
            this.$refs.login.validate(valid => {
                if (valid) {
                    // 保留this
                    var that = this;
                    storekit.setLastLoginName(this.param.username);
                    post("/api/weiadm/sign/v1/sign-in", {
                            account: that.param.username,
                            password: that.param.password,
                            loginType: 'h5pwd',
                            openId: ''
                        }).then((res)=>{
                            //{status: 0, data: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxI…wMSJ9.dhqlHSazqkkrPCyuLW5YdGs8CJuxN7jBzm42oeHGGt4", code: 2, msg: "登录成功", timestamps: 1581391998247, …}
                            console.info("返回:")
                            console.info(res)
                            // 登录成功将用户信息保存到state
                            // sessionStorage.setItem(
                            //         "userInfo",
                            //         JSON.stringify(response.data[0])
                            //       );
                            // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                            // console.log(userInfo);
                            //this.$store.commit("userInfoFun", userInfo);
                            //this.$message.success("登录成功");
                            this.$message({message: "登录成功",type: "success"});
                            // 保存token
                            storekit.setToken(res.msg);
                            storekit.setUserInfo(res.data);
                            //this.$store.commit("setToken", res.data);
                            // 删除本地存储 当前激活菜单的 index
                            localStorage.removeItem("navActive");
                            // 登录成功跳转到首页
                            this.$router.push('/');
                        }).catch(err=>{
                            // {message: "账号不存在", name: "ResError"}
                            console.info("发生错误:")
                            console.info(err);
                            this.$message.error(err.message);
                            this.isLogining = false;
                        });
                } else {
                    this.$message.error("请按照正确格式填写用户名和密码");
                    this.isLogining = false;
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/images/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
