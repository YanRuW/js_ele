import React,{Component,Fragment} from "react";
import NavBar from "./navBar";
export default class ElecNumber extends Component{
    constructor(){
        super();
        this.state={
            userInfo:""
        }
    }
    render(){
       return(
       <Fragment>
       <NavBar  text="如何查询户号"  history={this.props.history} />
        {/* <div className="activity">
            <GoBack history={this.props.history} />
            <div className="float-right" onClick={()=>this.props.history.push("./manage")}>签约管理</div>
            <h2 className="align-center">活动详情</h2>
           
        </div> */}
        <div className="contract">
            今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大，今天风好大
        </div>
       </Fragment>
       )
    }
}