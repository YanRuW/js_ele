import * as TYPE from "../action-types";
export default {
    userIdAction: val => ({type: TYPE.USERID,value:val}),
    accessTokenAction:val => ({type:TYPE.TOKEN,value:val})
}