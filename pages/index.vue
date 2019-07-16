<template>
  <div class="container">
    <!-- 走马灯 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat; background-size:contain contain;`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(tab,index) in tabs" :key="index"
          @click="handleClick(index)"
          :class="{active:current===index}" >
            <i>{{tab.tatle}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
            <input :placeholder="tabs[current].placeholder"/>
            <i class="el-icon-search"></i>  
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 轮播图
      banners: [],
      // tab栏
      tabs: [
        { tatle: "攻略", placeholder: "搜索城市" },
        { tatle: "酒店", placeholder: "请输入城市搜索酒店" },
        { tatle: "机票", placeholder: "" }
      ],
      // 当前的显示索引
      current:0,
    };
  },
  methods:{
    // 切换tab栏
    handleClick(index){
      if(index===2){
        this.$router.push("/air");
      }
      this.current=index;
    }
  },
  mounted() {
    // 把axios添加到实例
    // Vue.prototype.$axios=axios
    // 请求轮播图接口
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      console.log(res);
      this.banners = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
  position: relative;
  min-width: 1000px;
    // 使用了第三方插件，在使用插件中的class属性的时候要在前面加上/deep/
  /deep/ .el-carousel__container {
    height: 700px;
  }
  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
    .search-bar {
      width: 552px;
      margin: 0 auto;
    }
    .search-tab {
      .active {
        i{
          color:red;
        }
        &::after{
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after{
          position:absolute;
          left: 0;
          top: 0;
          display:block;
          content: "";
          width: 100%;
          height: 100%;
          border:1px rgba(255,255,255,0.2) solid;
          border-bottom:none;
          transform: scale(1.1,1.3) perspective(.7em)rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0,0,0,0.5);
          border-radius: 1px 2px 0 0;
          box-sizing:border-box;
        }
      }
    }
    .search-input{
      width:550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border:1px rgba(255,255,255,0.2) solid;
      border-top:none;
      box-sizing:unset;
      input{
        flex:1;
        height: 20px;
        padding:13px 15px;
        border:0;
        font-size:16px;
      }
      .el-icon-search{
        cursor:pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
        

      }
    }
  }
}
</style>

