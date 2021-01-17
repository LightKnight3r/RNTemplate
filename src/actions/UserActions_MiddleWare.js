
var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');
import RDActions_MiddleWare from './RDActions_MiddleWare'
import {Actions} from 'react-native-router-flux'

import {
  Platform
} from 'react-native';
// LIB
var DeviceInfo = require('react-native-device-info');
// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDActions = require('./RDActions');
var {globalVariableManager}= require('../components/modules/GlobalVariableManager');

// NOTE : stuck when call getState (when dispatch another action in a action)

/*
 * action creators
 */

class UserActions_MiddleWare extends RDActions_MiddleWare {
  constructor(){
    super('UserActions_MiddleWare',true);
    this.init();
  }
  actionsList={
    getInfoFromAccessToken: {
      query:'/member/getInfoFromToken',
      argFormat:{
        access_token: ''
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      apiVersion:'2.1',
      onArg:(arg,getState)=>{
        return {
          ...arg,
          token:_.get(getState(), 'User.memberInfo.token', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },

    updateProfile:{
      query:'/member/update-profile',
      argFormat:{},
      argMap:{},
      apiVersion:'2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          token:_.get(getState(), 'User.memberInfo.token', ''),
          ...arg
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    sentVoipNotifyToken: {
      query:'/app/voip-notify',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          token: arg.token,
          notify_token: Define.config.voipToken
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    sentNotifyToken:{
      query:'/app/notify',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          token: arg.token,
          platform:Platform.OS,
          notify_token: Define.config.token,
          bundleId: DeviceInfo.getBundleId()
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    updateLocation:{
      query:'/member/update-location',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          token:_.get(getState(), 'User.memberInfo.token', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getInfo:{
      query:'/user/get',
      argFormat:{},
      argMap:{},
      apiVersion:1.0,
      limitProcess:10,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          token: _.get(getState(), 'User.memberInfo.token', ''),
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
    },
    login:{
      query:'/user/login',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:1.0,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      // onDone: function (dispatch,getState,data) {
      //   dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
      //   dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
      //   return true
      // },
    },
    logout:{
      query:'/user/logout',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:1.0,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      // onDone: function (dispatch,getState,data) {
      //   dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
      //   dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
      //   return true
      // },
    },

  }

  loginFacebook(arg={},setState = true){
    var self = this;
    var actionName = 'loginFacebook';
    var preTextLog = self.name+':'+actionName+':';

    return (dispatch) => {
      var data = {};
      return new Promise((resolve,reject)=>{
        Debug.log2(`${preTextLog}:OnRequest:`, arg);

        LoginManager
          .logInWithPermissions(['public_profile', 'email'])
          .then(result => {
            if(result.isCancelled) {
              Debug.log(`${preTextLog}:UserCanceled:`);
              return new Promise.reject();
            }
            Debug.log2(`${preTextLog}:OnSuccess:`, result);
            return AccessToken
                .getCurrentAccessToken()
          }).then(data => {
            Debug.log2(`${preTextLog}:getAccessToken:`, data);
            if(data) {
              let accessToken = data.accessToken.toString();
              return resolve(accessToken);
            }

            return Promise.reject(new Error(`Can't get accessToken after loginFacebook success`));
          }).catch(err => {
            Debug.log2(`${preTextLog}:OnError:`, err);
            data = {
              arg:arg,
              err:err,
            }
            // if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR, data));}
            reject(err);
          }
        );
      })
    }
  }

  getInfo(accessToken,setState = true){
    var self = this;
    var actionName = 'getInfo';
    var preTextLog = self.name+':'+actionName+':';

    return (dispatch) => {
      var data = {};
      return new Promise((resolve,reject)=>{
        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnRequest']())}
        Debug.log2(`${preTextLog}:getUserInfo:OnRequest`, accessToken);
        axios.get('https://graph.facebook.com/v2.8/me?fields=email,name,locale,timezone&access_token=' + accessToken)
            .then(response => {
                if(response.status === 200) {
                    Debug.log2(`${preTextLog}:getUserInfo:OnSuccess`, response);
                    let memberResonse = response.data;
                    let member = {
                        "profile": {
                            "id": memberResonse.id,
                            "displayName": memberResonse.name,
                            "_json": {
                                "email": memberResonse.email,
                                "locale": memberResonse.locale,
                                "timezone": memberResonse.timezone
                            }
                        },
                        "access_token": accessToken,
                        "deviceInfo": {
                            "device_id": DeviceInfo.getUniqueID(),
                            "os": DeviceInfo.getSystemName(),
                            "app_version": DeviceInfo.getVersion(),
                            "type": Platform.OS
                        }
                    }
                    return resolve(member);
                } else {
                  return Promise.reject(response);
                }
            })
            .catch(err => {
              let data = {
                err: err
              }
              if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
              reject(err);
            });
      })
    }
  }

  updateAuthentication(arg={},setState = true){
    var self = this;
    var actionName = 'updateAuthentication';
    var query = arg.id ? '/shop/authen/modify' : '/shop/authen/create';
    var argFormat={
      id: '',
      storeName:'',
      address:'',
      frontCer:'',
      backCer:'',
      avatar:'',
    }
    var argTemp = Util.dataProtectAndMap(arg, argFormat);

    var preTextLog = self.name+':'+actionName+':';

    return (dispatch,getState) => {
      var req ;
      // req config
      var temp = new FormData();

      if(arg.avatar) {
        temp.append('avatar', {
          uri:arg.avatar,
          name: "avatar.jpg",            // e.g. 'file:///path/to/file/image123.jpg'
          type: 'multipart/form-data'            // e.g. 'image/jpg'
        })
      }

      if(arg.frontCer) {
        temp.append('frontCer', {
          uri:arg.frontCer,
          name: "frontCer.jpg",          // e.g. 'file:///path/to/file/image123.jpg'
          type: 'multipart/form-data'            // e.g. 'image/jpg'
        })
      }

      if(arg.backCer) {
        temp.append('backCer', {
          uri:arg.backCer,
          name: "backCer.jpg",           // e.g. 'file:///path/to/file/image123.jpg'
          type: 'multipart/form-data'            // e.g. 'image/jpg'
        })
      }
      if(arg.address) {
        temp.append('address', arg.address)
      }
      if(arg.phone) {
        temp.append('phone', arg.phone)
      }
      if(arg.storeName) {
        temp.append('storeName', arg.storeName)
      }
      if(arg.id) {
        temp.append('id', arg.id);
      }
      temp.append('token', _.get(getState(), 'User.memberInfo.token', ''))
      temp.append('regionName', _.get(getState(), 'AppSetting.regionNew', ''))
      temp.append('modeApp', _.get(getState(), 'AppSetting.mode', ''))
      temp.append('platform', Platform.OS);
      temp.append('nativeVersion', Define.constants.nativeVersion)
      temp.append('device_id', Define.constants.deviceId)
      req = temp;
      //
      Debug.log(preTextLog+':'+query+':'+JSON.stringify(req));
      var data = {};
      var promise = new Promise((resolve,reject)=>{

        dispatch(RDActions['AppState']['showLoadingOnRequest']({show:true}))

        var serverAddr = Define.constants.serverAddr
        var preLinkApi = '/api/v2.0'
        fetch(`${serverAddr}${preLinkApi}${query}`,{
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: req
        })
        .then((response) => {
          return response.json()
        })
        .then((response)=>{
          dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))

          Debug.log(preTextLog+':callback:'+`${serverAddr}${preLinkApi}${query}`+':'+JSON.stringify(req));
          if(response.code === 200) {
            var res = response.data;
            data={
              arg:argTemp,
              res:res,
            }

            resolve(data);
          }else{
            return Promise.reject(response)
          }
        })
        .catch((err)=>{
          dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))
          Debug.log(preTextLog+':err:'+`${serverAddr}${preLinkApi}${query}`+':'+JSON.stringify(req),Debug.level.ERROR);
          data={
            arg:argTemp,
            err:JSON.stringify(err),
            errObj:err,
          }
          reject(data);
        })
      })
      return promise;
    }
  }
}


module.exports= new UserActions_MiddleWare();
