<template>
  <el-form :model="registerform" ref="registerform" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="registerform.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="registerform.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="registerform.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="registerform.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="registerform.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
      return {
        registerform: {
          username: "",
          captcha: "",
          nickname: "",
          password: "",
          checkPassword: ""
        },
        // 表单规则
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
          nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          // validator: 自定义的验证函数
          checkPassword: [{ validator: validatepass, trigger: "blur" }]
        }
      };
         // 确认两次密码是否一致正确
      const validatepass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.registerform.password) {
          callback(new Error("两次输入密码不一致！"));
        } else {
          callback();
        }
      };
    },
    methods:{
        // 点击发送验证码验证
        handleSendCaptcha(){
            // 判断是否有手机号码
            if(!this.registerform.username.trim()){
                this.$message.warning('请输入用户名手机号码');
                return
            }
            // 发送手机的验证码
            this.$axios({
                url:"/captchas",
                method:"POST",
                data:{
                    tel:this.registerform.username
                }
            }).then(res=>{
                // console.log(res)
                // 解构出code
                const {code}=res.data;
                this.$alert(`手机验证码是：${code}`,'提示',{confirmButtonText:'确定',type:'warning'})
            })
        },
        // 点击注册
        handleRegSubmit(){
            // 再次验证数据是否正确
            this.$refs.registerform.validate(valid=>{
                if(valid){
                    // 发送props是除了checkPassword剩余的属性请求数据
                    const {checkPassword,...props}=this.registerform
                    this.$axios({
                        url:'/accounts/register',
                        method:'POST',
                        data:props
                    }).then(res=>{
                        // 把数据保存到vueX,user模块名字
                        this.$store.commit('user/setUserInfo',res.data)
                        // 跳转到上一页
                        this.$router.back();
                    })

                }else{
                    this.$alert('请输入正确的数据')
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
