//JavaScript Document
import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import action from "../store/action";
import { root,axios } from "../api";
import "../assets/css/reset.css";
import "../assets/css/ant-design-mobile.css";
import "../assets/css/common.css";
import "../assets/css/index.css";
import { LocaleProvider } from "antd-mobile";
import UplusApi from '@uplus/uplus-api';

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
            if(result.data == true){
                localStorage.setItem("contract", true);
            }
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
                        // 
                        sessionStorage.setItem("Access-User-Token", data.retData.accessToken);
                        that.props.handleTokenInfo(data.retData.accessToken);
                         that.props.handleUserInfo(data.retData.userId);
                    }
                }
            });
        });
    }
}
const mapStateToProps = (state)=>({});
const mapDispatchToProps = (dispatch)=>({
    handleUserInfo(userId){
        dispatch(action.userInfo.userIdAction(userId));
    },
    handleTokenInfo(token){
        dispatch(action.userInfo.accessTokenAction(token));
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) ;