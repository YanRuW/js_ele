import React,{Component} from "react";
import {Route,Redirect} from "react-router-dom";
export default class Home1 extends Component{
    render(){
       let {path,component} = this.props;
       let bol = window.localStorage.getItem("contract")?true:false
       return(
        bol?<Redirect to="/contracted" />:<Route exact path={path} component={component}/>
       )
    }
}