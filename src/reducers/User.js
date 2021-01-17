var _ = require('lodash')

var RDActionsTypes = require( '../actions/RDActionsTypes');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDUtil = require('./RDUtil');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

function initLoading(){
  let retObj={};
  Object.keys(RDActionsTypes.User).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

function User(state ={
                ...initLoading(),
                memberInfo:{},
                phonePrediction:'',
                lastTracking: 0,
                hotnews: {
                  0: {
                    general: []
                  },
                  2: {
                    general: []
                  }
                },
                serviceRunning:{
                  services: [],
                  count: 0
                }
              } , action) {
  var stateTemp =state;
  switch (action.type) {

    case RDActionsTypes.User.getInfoFromAccessToken:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getInfoFromAccessToken',
                {
                  onSuccess:(stateTempIn) => {
                    // stateTempIn.memberInfo.member.name = action.data.res.data.name;
                    // stateTempIn.memberInfo.member.facebook.picture = action.data.res.data.picture;
                    // stateTempIn.memberInfo.member.email = action.data.res.data.email;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.logout:{
      stateTemp = RDUtil.processReducerLoading(state,action,'logout',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo = {};
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.getInfo:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getInfo',
                {
                  onSuccess:(stateTempIn)=>{
                    const memberInfo =  Util.dataProtectAndMap(action.data.res.data);
                    memberInfo.token = stateTempIn.memberInfo.token;
                    stateTempIn.memberInfo = memberInfo;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }

    case RDActionsTypes.User.login: {
      stateTemp = RDUtil.processReducerLoading(state, action, 'login',
                {
                  onSuccess: (stateTempIn) => {
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res.data)
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }

    case 'persist/REHYDRATE':{
      // clear loading
      if (!action.payload.User) {
        break;
      }
      Object.keys(RDActionsTypes.User).forEach((key)=>{
        if (key === 'constants') { return;}
        action.payload.User[key] = {loading:0};
      });
    }

    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      break;
  }

  return stateTemp;

}


module.exports= User;
