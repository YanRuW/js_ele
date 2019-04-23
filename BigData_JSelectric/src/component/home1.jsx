import React,{Component} from "react";
import {Route,Redirect} from "react-router-dom";
import { connect } from "react-redux";
class Home1 extends Component{
    render(){
       let {path,component} = this.props;
       let bol = this.props.contract;
       return(
        bol?<Redirect to="/contracted" />:<Route exact path={path} component={component}/>
       )
    }
}
const mapStateToProps = (state) => ({
    contract: state.userInfo.contract
})
export default connect(mapStateToProps)(Home1)