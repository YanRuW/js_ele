import React,{Component} from "react";
import {Route,Redirect} from "react-router-dom";
export default class Home2 extends Component{
    render(){
       let {path,component} = this.props;
       let bol = window.localStorage.getItem("contract")?true:false
       return(
        bol?<Route exact path={path} component={component}/>:<Redirect to="/" />
       )
    }
}