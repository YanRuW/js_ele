//JavaScript Document
import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Checkbox } from 'antd-mobile';
import Nav from "../component/navBar";
import { rest, axios, root } from "../api";
import { connect } from "react-redux";
import action from "../store/action";
const alert = Modal.alert;
class Contract extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            proviceCode: "320000",  //默认省编码
            cityCode: "320100",  //默认市编码
            areaCode:"320102",//默认区编码
            elecNumber: "",  //缴费账号
            cityArr: [],  //城市
            msg: {
                "41001": "缴费账号不存在",
                "10001": "系统错误",
                "10002": "参数错误"
            },
            modal1: false,//签约成功的modal
            modal2: false, //签约失败的modal
            data: [],   //江苏省市区县
        }
    }
    render() {
        let { elecNumber, checked, cityArr, proviceCode,data,cityCode } = this.state;

        return <Fragment>
            <Nav text="电力需求" history={this.props.history} closeWebView="1" />
            <div className="banner" style={{ background: `url(${rest}/assets/images/banner.png) 100% center no-repeat`, backgroundSize: "cover" }}></div>
            <div className="contract">
                <div>
                    <div className="eleCont" onClick={this.showModal("modal1")}>电力削峰是指......</div>
                    <div className="eleCont" onClick={this.showModal("modal2")}>签约后如何执行......</div>
                </div>
                <div className="form">
                    <div className="align-center title">注册签约</div>
                    <div className="form-con">
                        <label className="align-right">省</label>
                        <select onChange={this.handlechange.bind(this, "proviceCode")}>
                            <option value={proviceCode}>江苏省</option>
                        </select>
                    </div>
                    <div className="form-con">
                        <label className="align-right">市</label>
                        <select
                            onChange={this.handlechange.bind(this, "cityCode")} >
                            {
                                cityArr.map((item, index) => {
                                    return <option key={index} value={item.Code2}>{item.Name3}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-con">
                        <label className="align-right">区/县</label>
                        <select
                            onChange={this.handlechange.bind(this, "areaCode")} >
                            {
                                data.map((item, index) => {
                                    if(item.Code2 == cityCode){
                                        return <option key={index} value={item.Code4}>{item.Name5}</option>
                                    }
                                   
                                }) 
                            }
                        </select>
                    </div>
                    <div className="form-con">
                        <label className="align-right">缴费账号</label>
                        <input type="text" onChange={this.handlechange.bind(this, "elecNumber")} />
                    </div>
                    <div className="align-center num"><NavLink to="/elecNumber">如何查询户号</NavLink></div>
                    <div className="align-center contract-btn">
                        <div>
                            <Checkbox checked={checked} onChange={this.handleCheck.bind(this)}>我已阅读并同意<NavLink to="/protocol">《海尔...协议》</NavLink></Checkbox>
                        </div>
                        <button className={(checked && elecNumber.trim() != "" ? true : false) ? "btn btn-able" : "btn btn-disabled"} disabled={!checked || elecNumber.trim() == "" ? true : false} onClick={this.handleContract.bind(this)}>签约</button>
                    </div>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="电力削峰"
                    footer={[{ text: '确定', onPress: () => { this.onClose('modal1')(); } }]}
                >
                    <div style={{ height: 300, overflow: 'scroll' }}>
                        胖死啦
                    </div>
                </Modal>
                <Modal
                    visible={this.state.modal2}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal2')}
                    title="签约后如何执行"
                    footer={[{ text: '确定', onPress: () => { this.onClose('modal2')(); } }]}
                >
                    <div style={{ height: 300, overflow: 'scroll' }}>
                        开始减肥
                    </div>
                </Modal>
            </div>

        </Fragment>;
    }
    componentDidMount() {
        this.hanldeCity();
    }
    //获取城市信息
    hanldeCity = async () => {
        let result = await axios({
            method: "GET",
            url: `${root}/contract/getCity`
        });
        if (result) {
            let cityJson = {};
            cityJson.Name3 = result[0].Name3;
            cityJson.Code2 = result[0].Code2;
            cityJson = {};
            let cityArr = [cityJson];
            result.map((item1) => {
                let flag = false;
                cityJson.Name3 = item1.Name3;
                cityJson.Code2 = item1.Code2;
                cityArr.forEach(function (item2, index) {
                    if (item1.Name3 == item2.Name3) {
                        flag = true;
                        return;
                    }
                })
                if (!flag) {
                    cityArr.push(cityJson);
                }
                cityJson = {};
            })
            this.setState({
                cityArr: cityArr,
                data: result
            })
        }
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    handlechange(key, event) {
        this.setState({
            [key]: event.target.value
        })
    }
    //签约
    handleContract = async () => {
        let { proviceCode, cityCode, elecNumber, msg } = this.state;
        let result = await axios({
            method: "POST",
            // headers: {
            //     // "Content-Type": "application/json;charset=utf-8",
            //     "Access-User-Token":this.props.token
            // },
            url: `${root}/contract/add`,
            data: {
                elecNumber: elecNumber,
                provinceCode: proviceCode,
                cityCode: cityCode
            }
        });
        if (result.retCode == 0) {
            alert(<div style={{ width: ".81rem", height: ".81rem", margin: "0.1rem auto 0", background: `url(${rest}/assets/images/success.png) 100% center no-repeat`, backgroundSize: "100% 100%" }}></div>,
                <div style={{ color: "#333", fontSize: ".18rem", lineHeight: "3" }}>签约成功</div>, [
                    { text: '查看活动进展', onPress: () => { this.props.handlePropsContract(true); this.props.history.push("/contracted") } },
                ])
        } else {
            alert('签约失败', <div>{msg[result.retCode]}</div>, [
                { text: '确定' }
            ])
        }
    }
    handleCheck(e) {
        this.setState({
            checked: e.target.checked
        })
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
};
const mapStateToProps = (state) => ({
    userId: state.userInfo.userId,
    token: state.userInfo.token
})
const mapDispatchToProps = (dispatch) => ({
    handlePropsContract(contract) {
        dispatch(action.userInfo.contractAction(contract));
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(Contract)