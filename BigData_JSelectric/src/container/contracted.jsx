//JavaScript Document
import React, { Component, Fragment } from "react";
import { root, axios } from "../api";
import { Modal, Button, WhiteSpace, WingBlank, Switch, List } from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Nav from "../component/navBar";
import { connect } from "react-redux";
// import Websocket from 'react-websocket';
class Contracted extends Component {
    constructor() {
        super();
        this.state = {
            cost: 0,
            // modal: false,
            // checked: true,
            userInfo: {},
            taskObj: {
                // id: 0,
                // userId: "",
                // date: "",
                // startTime: "",
                // endTime: "",
                // state: 11111
            },
            acts: [],
            dailyCont: {
                "0": "未参与",
                "1": "已签约",
                "2": "未开始",
                "3": "进行中",
                "4": "中途打断,未完成任务",
                "5": "完成任务"
            },
            taskCont: {
                "0": "未参与今日调峰任务",
                "2": "今日任务：",
                "3": "今日调峰任务进行中",
                "4": "调峰任务被打断"
            }
        }
    }
    render() {
        let { acts, dailyCont, cost, taskObj, taskCont } = this.state;
        //用户id，token
        // console.log(this.props.userId,this.props.token)
        return <Fragment>
            <Nav text="已签约" history={this.props.history} right="活动详情" history={this.props.history} route="./detail" closeWebView="1" />
            <div className="signed-con align-center">
                <div className="task">
                    <header>已累计调峰</header>
                    <div className="count"><span>{cost} </span><span>次</span></div>
                    <div className="taskBox">
                        <div className={`task-con task${taskObj.state}`}>
                     
                            <div>{JSON.stringify(taskObj)!=="{}" ? taskCont[taskObj.state] + (taskObj.state == 2 ? taskObj.startTime + " 计划调峰" : "") : "暂无电量调峰任务"}</div>
                        </div>
                    </div>

                </div>
                <div className="diary">
                    <div className="diary-title">活动日记</div>
                    <div className="align-left diary-con">
                        {
                            acts.map((item, index) => {
                                return (<div key={index}><div className="month">{item.month}<span>月</span></div><ul>
                                    {item.data.map((res, i) => {
                                        return <li key={i}>
                                            <em></em>
                                            <span className="day">{moment(res.date).format("DD")}<span>日</span></span>&nbsp;
                                            <span className="time">{moment(res.date + " " + res.startTime).format("HH:mm")}-{moment(res.date + " " + res.endTime).format("HH:mm")}</span>&nbsp;&nbsp;
                                            <span>{dailyCont[res.state]}</span>
                                        </li>
                                    })}
                                </ul></div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/*<Modal
                popup
                visible={this.state.modal}
                onClose={this.onClose('modal')}
                animationType="slide-up"
            //   afterClose={() => { alert('afterClose'); }}
            >
                <List renderHeader={() => <div className="clearfix"><div className="float-left">是否开启通知</div><div onClick={this.onClose('modal')} className="float-right">关闭</div></div>} className="popup-list">
                    {/* {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))} */}
            {/*<Switch
                        checked={this.state.checked}
                        onChange={() => {
                            this.setState({
                                checked: !this.state.checked,
                            });
                        }}
                    />
                    <List.Item>
                        <Button type="primary" style={{ width: '280px', height: '45px', lineHeight: "45px", margin: "0 auto 100px", fontSize: "18px" }}>确定</Button>
                    </List.Item>
                </List>
            </Modal>
             <Websocket url='ws://localhost:9000/'
              onMessage={this.handleData.bind(this)}/> */}
        </Fragment>;
    }
    componentDidMount() {
        this.handleStatistic();
        //一分钟获取任务日志一次
        this.timer = setInterval(() => {
            this.handleStatistic();
        }, 1000 * 60);
    }
    //获取任务
    handleStatistic = async () => {
        let result = await axios({
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json;charset=utf-8",
            //     "Access-User-Token": this.props.token
            // },
            url: `${root}/task/statistic`
        });
        if (result.retCode == 0) {
            let now = new Date();
            let nowDate = moment(now).format("YYYY-MM-DD");
            let time = moment(now).format("HH:mm:ss");
            let taskObj = {}; // 任务对象
            let data = result.acts;
            data.map((item, index) => {
                if (item.date == nowDate && time < item.endTime) {
                    taskObj = item;
                    taskObj.startTime = moment(taskObj.date + " " + taskObj.startTime).format("HH:mm");
                    taskObj.endTime = moment(taskObj.date + " " + taskObj.endTime).format("HH:mm");
                    // 将未完成的任务从活动日记中删除
                    data.splice(index, 1);
                }
            })
            this.setState({
                taskObj: taskObj
            })
            this.handleData(result.cost, data);
        }
    }
    // 处理活动日记数据
    handleData(cost, data) {
        let newArr = [], tempArr = [];
        data.map((item, index) => {
            if (moment(item.date).format("MM") == (data[index + 1] ? moment(data[index + 1].date).format("MM") : "")) {
                tempArr.push(item);
            } else {
                tempArr.push(item);
                newArr.push(tempArr.slice(0));
                tempArr.length = 0;
            }
        })
        let newActs = [];
        newArr.map((item) => {
            newActs.push({ month: moment(item[0].date).format("M"), data: item })
        })
        this.setState({
            cost: cost,
            acts: [...newActs]
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    // handleDetail() {
    //     this.props.history.push("/detail")
    // }
    // onClose = key => () => {
    //     this.setState({
    //         [key]: false
    //     });
    // }
    // handleSend(val) {
    //     let newData = this.state.data;
    //     newData.unshift(val);
    //     this.setState({
    //         data: newData
    //     })
    // }
};
const mapStateToProps = (state) => ({
    userId: state.userInfo.userId,
    token: state.userInfo.token
})
export default connect(mapStateToProps)(Contracted)