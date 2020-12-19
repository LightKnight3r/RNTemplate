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

var memberInfoFormat={
  member: {
    facebook:{
      id:'',
      name:'',
      birthday:'',
      picture:'',
      email:'',
      token:''
    },
    shop:{
      isAuthen:0,
    },
    _id:'',
    memberToken:'',
    phone:'',
    os_version:{},
    name:'',
    address:'',
    email:'',
    birthday:{},

    // v2
    type: 0,
    likes:0,
    dislikes:0,
    coints:0,
    expireTime: 0,
    isExpire: true,
    blockUtil: 0,
    createdAt: 0,
    updatedAt: 0,
  }
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
    case RDActionsTypes.User.trackingAction:{
      stateTemp = RDUtil.processReducerLoading(state,action,'trackingAction',
                {
                  onSuccess:(stateTempIn) => {
                    stateTempIn.lastTracking = Date.now();
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }

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
    case RDActionsTypes.User.login:{
      stateTemp = RDUtil.processReducerLoading(state,action,'login',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res,memberInfoFormat)
                    stateTempIn.phonePrediction = action.data.res.member.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.User.loginByPhone:{
      stateTemp = RDUtil.processReducerLoading(state,action,'loginByPhone',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res,memberInfoFormat)
                    stateTempIn.phonePrediction = action.data.arg.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.resetPassword:{
      stateTemp = RDUtil.processReducerLoading(state,action,'resetPassword',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res,memberInfoFormat)
                    stateTempIn.phonePrediction = action.data.arg.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.resetPasswordByNewPhoneAuthen:{
      stateTemp = RDUtil.processReducerLoading(state,action,'resetPasswordByNewPhoneAuthen',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res,memberInfoFormat)
                    stateTempIn.phonePrediction = action.data.arg.phone;
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
    case RDActionsTypes.User.get:{
      stateTemp = RDUtil.processReducerLoading(state,action,'get',
                {
                  onSuccess:(stateTempIn)=>{
                    const memberInfo =  Util.dataProtectAndMap(action.data.res,memberInfoFormat);
                    memberInfo.member.memberToken = stateTempIn.memberInfo.member.memberToken;
                    stateTempIn.memberInfo = memberInfo;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.updatePhoneNumber:{
      stateTemp = RDUtil.processReducerLoading(state,action,'updatePhoneNumber',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.phone = action.data.res.phone;
                    stateTempIn.phonePrediction = action.data.res.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.User.changePhoneNumber:{
      stateTemp = RDUtil.processReducerLoading(state,action,'changePhoneNumber',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.phone = action.data.res.phone;
                    stateTempIn.phonePrediction = action.data.res.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }

    case RDActionsTypes.User.changePhoneNumberByNewPhoneAuthen:{
      stateTemp = RDUtil.processReducerLoading(state,action,'changePhoneNumberByNewPhoneAuthen',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.phone = action.data.res.phone;
                    stateTempIn.phonePrediction = action.data.res.phone;
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }

    case RDActionsTypes.User.doneTraining:{
      stateTemp = RDUtil.processReducerLoading(state,action,'doneTraining',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.training = 1;
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.toggleReceiveOrder:{
      stateTemp = RDUtil.processReducerLoading(state,action,'toggleReceiveOrder',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.receivePushOrder = action.data.arg.isReceive;
                    return stateTempIn;
                  }
                })
      break;
    }
    // case RDActionsTypes.User.updateProfile:{
    //   stateTemp = RDUtil.processReducerLoading(state,action,'updateProfile',
    //             {
    //               onSuccess:(stateTempIn)=>{
    //                 _.set(action.data.res, 'member.isExpire', stateTempIn.memberInfo.member.isExpire);
    //                 stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res,memberInfoFormat)
    //                 return stateTempIn;
    //               },
    //               onError: (stateTempIn) => {
    //                 return stateTempIn;
    //               }
    //             })
    //
    //   break;
    // }
    case RDActionsTypes.User.bankCharging:{
      stateTemp = RDUtil.processReducerLoading(state,action,'bankCharging',
                {

                })

      break;
    }
    case RDActionsTypes.User.cardCharging:{
      stateTemp = RDUtil.processReducerLoading(state,action,'cardCharging',
                {
                  onSuccess:(stateTempIn)=>{
                    if(action.data.res.coints) {
                      stateTempIn.memberInfo.member.coints = action.data.res.coints
                    }
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.User.buyPackage:{
      stateTemp = RDUtil.processReducerLoading(state,action,'buyPackage',
                {
                  onSuccess:(stateTempIn)=>{
                    if(_.has(action.data.res, 'newCoints')) {
                      stateTempIn.memberInfo.member.coints = action.data.res.newCoints
                    } else if(_.has(action.data.res, 'newRealMoney')) {
                      stateTempIn.memberInfo.member.realMoney = action.data.res.newRealMoney
                    }
                    stateTempIn.memberInfo.member.expireTime = action.data.res.newExpireTime
                    stateTempIn.memberInfo.member.isExpire = false
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.getInfoCheckout:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getInfoCheckout',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.coints = action.data.res.data;
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.getInfoPaymentMomo:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getInfoPaymentMomo',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.coints = action.data.res.data;
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.User.transferSSMToCoints:{
      stateTemp = RDUtil.processReducerLoading(state,action,'transferSSMToCoints',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.realMoney = action.data.res.data.realMoney;
                    stateTempIn.memberInfo.member.coints = action.data.res.data.coints;
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.User.withdrawVimo:{
      stateTemp = RDUtil.processReducerLoading(state,action,'withdrawVimo',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.memberInfo.member.realMoney = action.data.res.data.realMoney;
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.getHotNews:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getHotNews',
                {
                  onSuccess:(stateTempIn) => {
                    if (action.data.res.data) {
                      if (!action.data.arg.serviceId) {
                        stateTempIn.hotnews[action.data.arg.type].general.push(action.data.res.data);
                      } else {
                        if (!stateTempIn.hotnews[action.data.arg.type][action.data.arg.serviceId]) {
                          stateTempIn.hotnews[action.data.arg.type][action.data.arg.serviceId] = [];
                        }

                        stateTempIn.hotnews[action.data.arg.type][action.data.arg.serviceId].push(action.data.res.data);
                      }
                    }
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.listServiceRegister:{
      stateTemp = RDUtil.processReducerLoading(state,action,'listServiceRegister',
                {
                  onSuccess:(stateTempIn) => {
                    if (action.data.res.data) {
                      stateTempIn.serviceRunning = action.data.res.data
                    }
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.switchService:{
      stateTemp = RDUtil.processReducerLoading(state,action,'switchService',
                {
                  onSuccess:(stateTempIn) => {
                    let count = 0
                    if(stateTempIn.memberInfo.member && stateTempIn.serviceRunning && stateTempIn.serviceRunning.services) {
                      stateTempIn.serviceRunning.services.forEach((service) => {
                        if(action.data.res.data.includes(service._id)) {
                          service.active = 1;
                          count ++
                        } else {
                          service.active = 0
                        }
                      })
                      stateTempIn.serviceRunning.count = count;
                    }
                    return stateTempIn;
                  }
                })
      break;
    }

    case RDActionsTypes.User.getPoint:{
      stateTemp = RDUtil.processReducerLoading(state, action, 'getPoint',
        {
          onSuccess:(stateTempIn) => {
            if(action.data && action.data.res && action.data.res.data && action.data.res.data.point >= 0) {
              stateTempIn.memberInfo.member.point = action.data.res.data.point;
            }
            return stateTempIn;
          }
        })
      break;
    }

    case RDActionsTypes.User.loginWithoutPassword: {
      stateTemp = RDUtil.processReducerLoading(state, action, 'loginWithoutPassword',
                {
                  onSuccess: (stateTempIn) => {
                    stateTempIn.memberInfo = Util.dataProtectAndMap(action.data.res, memberInfoFormat)
                    stateTempIn.phonePrediction = action.data.arg.phone;
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
