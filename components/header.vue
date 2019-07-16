<template>
  <div class="header">
    <el-row class="main" type="flex" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录信息 -->
      <el-row class="loginname" type="flex">
        <!-- 判断没有token值就返回到登录页面 -->
        <div v-if="!$store.state.user.userinfo.token"  >
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div class="right" v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <!-- 头像 -->
              <img :src="$axios.defaults.baseURL+$store.state.user.userinfo.user.defaultAvatar" alt=''/>
                <!-- 昵称 -->
              <i class="el-icon-arrow-down el-icon--right">
                {{$store.state.user.userinfo.user.nickname}}
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item></el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleclick">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    // 点击退出
    handleclick(){
      // 调用清除数据方法清除store和本地储存的数据
      this.$store.commit("user/cleanUserInfo");
      this.$message.success("退出成功");


    }
  }
};
</script>

<style scoped lang="less">
.logo {
  width: 200px;
  height: 55px;
  img {
    width: 100%;
  }
}
.header {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  position: relative;
}
.main {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
.navs {
  flex: 1;
  a {
    display: block;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    &:hover {
      color: blue;
      border-bottom: 5px solid blue;
    }
  }
  .nuxt-link-exact-active {
    background: blue;
    color: #fff;
    &:hover {
      color: #fff;
      border-bottom: 5px solid blue;
    }
  }
}
.right {
  padding-right: 20px;
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}
</style>
