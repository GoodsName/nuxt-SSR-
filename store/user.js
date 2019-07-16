
export const state=()=>{
    return{
        userinfo:{
            token:"",
            user:{

            }
        }
    }
}
// mutations同步设置state的数据
export const mutations={
// 设置用户的数据
setUserInfo(state,data){
    state.userinfo=data

},
// 清除用户数据
cleanUserInfo(state,info){
    // 清除本地储存
    if(process.browser){
        localStorage.removeItem("userInfo");
    }
    // 清除store储存的数据
    state.userinfo={
        token:'',
        user:{}
    };
}
}
// actions异步设置修改state的数据
export const actions={
    // store对象
    // 参数
login({commit},data){
// 登录的接口

}
}