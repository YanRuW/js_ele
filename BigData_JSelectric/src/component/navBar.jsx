import React,{Component} from "react";
import { Icon ,NavBar} from 'antd-mobile';
import UplusApi from '@uplus/uplus-api';
export default class Nav extends Component{
    render(){
        let {text,route,right} = this.props;
       return(   
        <NavBar
        mode="light"
        icon={[<Icon key="0" type="left" size="lg"/>,
        ]}
        onLeftClick={this.handleClick.bind(this)}
        rightContent={<div onClick={()=>this.props.history.push(route?route:"")}>{right?right:""}</div>}
      >{text?text:""}</NavBar>  
       )
    }
    handleClick(){
      if(this.props.closeWebView=="1"){
            const instance = new UplusApi();
            instance.initDeviceReady().then(function() {
                instance.closeH5ContainerView();
            });
      }else{
          this.props.history.goBack();
      }
    }
}