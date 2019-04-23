import React,{Component,Fragment} from "react";
import NavBar from "./navBar";
export default class Protocol extends Component{
    render(){
       return(
       <Fragment>
       <NavBar  text="海尔协议"  history={this.props.history} />
        <div className="contract">海尔协议</div>
       </Fragment>
       )
    }
}