import * as TYPE from "../action-types";
const defaultState = {
    userId:"",
    token:"",
    contract:false
}
export default (state = defaultState,action)=>{
    switch(action.type){
        case TYPE.USERID: let userState = {...state};
        userState.userId = action.value;
        return userState;
        case TYPE.TOKEN: let tokenState = {...state};
        tokenState.token = action.value;
        return tokenState;
        case TYPE.CONTRACT: let contractState = {...state};
        contractState.contract = action.value;
        return contractState;
    }
  return state;
}