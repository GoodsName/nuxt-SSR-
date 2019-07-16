<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    class="demo-ruleForm"
  >
    <el-form-item  prop="username">
      <el-input v-model="loginForm.username" placeholder="账号/手机号"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      <el-input v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="form-text">
    <nuxt-link to='#'>忘记密码</nuxt-link>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  class="submit"  @click="handleclick">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      // 登录数据
      activeName: [],
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" }
          // { min: 3, message: "长度至少为3个", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码错误", trigger: "blur" }
          // { min: 3, message: "密码错误，请重新输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleclick() {
      this.$refs.loginForm.validate(valid => {
        // 没有错误
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            data: this.loginForm,
            method: "POST"
          }).then(res => {
            // console.log(res);
            this.$message({
              message:"登录成功，正在跳转",
              type:"success",
              
            })
            // 储存数据到vuex.user模块里面
            this.$store.commit("user/setUserInfo",res.data)
              // 跳转
            setTimeout(()=>{
              this.$router.replace('/')
            },1000)
          });
        }else{
          this.$message({
            message:'请输入正确的信息'
          })
        }

      });
    }
  }
};
</script>

<style lang="less" scoped>
.demo-ruleForm {
  padding: 20px;
  .form-text {
    font-size: 12px;

    a {
     padding-left: 300px;
      color: blue;
    }
  }
  .submit {
    text-align: center;
    width: 100%;
  }
}
</style>

