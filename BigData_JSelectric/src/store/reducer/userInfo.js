import * as TYPE from "../action-types";
const defaultState = {
    userId:"",
    token:""
}
export default (state = defaultState,action)=>{
    switch(action.type){
        case TYPE.USERID: let userState = {...state};
        userState.userId = action.value;
        return userState;
        case TYPE.TOKEN: let tokenState = {...state};
        tokenState.token = action.value;
        return tokenState;
    }
  return state;
}