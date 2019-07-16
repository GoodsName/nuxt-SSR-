<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 头部 -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            v-for="(item,index) in [ `登录`,`注册`]"
            :key="index"
            @click="handleClick(index)"
            :class="{active:currentTab===index}"
          >{{item}}</span>
        </el-row>
        <!-- 登录主键 -->
        <loginform v-if="currentTab==0" />
        <!-- 注册组件 -->
        <RegisterForm v-if="currentTab==1"></RegisterForm>
      </div>
    </el-row>
  </div>
</template>

<script>
import loginform from "@/components/user/loginform.vue";
import RegisterForm from "@/components/user/RegisterForm.vue";
export default {
  data() {
    return {
      currentTab: 0
    };
  },
  components: {
    loginform,
    RegisterForm
  },
  methods: {
    handleClick(index) {
      // console.log(index);
      this.currentTab = index;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 700px;
  min-width: 1000px;
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 2px 2px 0 rgb(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

