//JavaScript Document
import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import action from "../store/action";
import { root,axios,systemManagerRest } from "../api";
import "../assets/css/reset.css";
import "../assets/css/ant-design-mobile.css";
import "../assets/css/common.css";
import "../assets/css/index.css";
import { LocaleProvider } from "antd-mobile";
import UplusApi from '@uplus/uplus-api';//引入U+app的类库

class App extends Component {
    render() {
        return <LocaleProvider>
            <div className="wrapper">
                {
                    this.props.children
                }
            </div>
        </LocaleProvider>;
    }
    componentDidMount(){
        this.handleUser();
        this.handleSigned();
    }
    //获取是否签约
    handleSigned = async ()=>{
        // console.log(this.props.token)
        let result = await axios({
            method:"GET",
            // headers: {
            //     "Content-Type": "application/json;charset=utf-8",
            //     "Access-User-Token":this.props.token
            // },
            url:`${root}/contract/signed`

        });
        if(result.retCode==0){
                this.props.handleContract(result.data)
                // localStorage.setItem("contract", true);
        }
    }
    //获取用户信息
    handleUser = async ()=>{
        const instance = new UplusApi();
        let that = this;
        instance.initDeviceReady().then(function() {
            instance.userModule.getUserInfo().then(function(data) {
                if(data.retCode == "000000"){
                    if(data.retData){
                        that.props.handleTokenInfo(data.retData.accessToken); //将token存入store
                        that.props.handleUserInfo(data.retData.userId);//将用户id存入store
                        that.handleToken(data.retData.accessToken);//token转换
                    }
                }
            });
        });
    }
    //换取token
    handleToken = async (token)=>{
        // let result = await axios({
        //     method:"POST",
        //     url:`${systemManagerRest}/token/exchange`,
        //     data:{
        //         "accessToken":token,
        //         "sysCode":"",
        //         "username":""
        //     }
        // })
        // if(result.retCode==0){
        //     console.log(result)
        // }
        sessionStorage.setItem("Access-User-Token", token);
    }
}
const mapStateToProps = (state)=>({});
const mapDispatchToProps = (dispatch)=>({
    handleUserInfo(userId){
        dispatch(action.userInfo.userIdAction(userId));
    },
    handleTokenInfo(token){
        dispatch(action.userInfo.accessTokenAction(token));
    },
    handleContract(contract){
        dispatch(action.userInfo.contractAction(contract));
    }

})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) ;