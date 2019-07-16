// Message=this.$message
import {Message} from "element-ui";
// 使用axios的拦截器拦截页面的所有请求错误，并弹出对应的提示
export default function({$axios,redirect}){
    // 拦截axios的错误请求
    $axios.onError(err=>{
        // console.log(err)
        const{statusCode,message}=err.response.data;
        // 还未使用
        if(statusCode===401||statusCode===403){
            Message.warning({message:"请先登录"})
            // 重定义跳转到login页面
            redirect("/user/login");
        }
        if(statusCode===400){
            // 错误提示
            Message.error(message)
        }

    })
}