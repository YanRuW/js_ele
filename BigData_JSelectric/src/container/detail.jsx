import React,{Component,Fragment} from "react";
import NavBar from "../component/navBar";
import { Modal,Toast  } from 'antd-mobile';
import { root,axios } from "../api";
import { connect } from "react-redux";
const alert = Modal.alert;
 class Detail extends Component{
    constructor(){
        super();
        this.state={
            userInfo:""
        }
    }
    render(){
       return(
       <Fragment>
       <NavBar  text="活动详情"  history={this.props.history} closeWebView="0" />
        <div className="contract">
            <div>
                <h3 className="align-center">活动详情</h3>
                <article>
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                活动规则详细说明文案
                </article>
            </div>
            <button className="cancel"onClick={this.handleCancle.bind(this)}>解约</button>
        </div>
        
       </Fragment>
       )
    }
    //解约
    handleCancle = async ()=>{
        // window.confirm("确定要解约吗");
        let result = await axios({
            method:"POST",
            // headers: {
            //     // "Content-Type": "application/json;charset=utf-8",
            //     "Access-User-Token":this.props.token
            // },
            url:`${root}/contract/remove`
        });
        if(result.retCode == 0){
            alert('解约', '你确定要解约吗?', [
                { text: '取消'},
                { text: '确定', onPress: () => {
                    window.localStorage.removeItem("contract");
                     Toast.success('解约成功', 1);
                     setTimeout(()=>{
                        this.props.history.push("/")
                    },1000)
                    }
                 },
            ])
        }
        
    }
}
const mapStateToProps = (state)=>({
    userId:state.userInfo.userId,
    token:state.userInfo.token
})
export default connect(mapStateToProps)(Detail)