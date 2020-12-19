var _ = require('lodash')
import {
  Platform
} from 'react-native';
var DeviceInfo = require('react-native-device-info');

var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');
import RDActions_MiddleWare from './RDActions_MiddleWare'
import axios from 'axios';

// LIB

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

class AppStateActions_MiddleWare extends RDActions_MiddleWare {
  constructor(){
    super('AppStateActions_MiddleWare',true);
    this.init();
  }
  actionsList={
    getConfigAnalytics: {
      query:'/app/get-config-analytics',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return arg;
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    sendCrashLog: {
      query:'/app/send-crash-log',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          device: {
            platform: Platform.OS,
            uniqueId: DeviceInfo.getUniqueID(),
            deviceManufacturer: DeviceInfo.getManufacturer(),
            deviceBrand: DeviceInfo.getBrand(),
            deviceModel: DeviceInfo.getModel(),
            deviceId: DeviceInfo.getDeviceId(),
            systemName: DeviceInfo.getSystemName(),
            systemVersion: DeviceInfo.getSystemVersion(),
            bundleId: DeviceInfo.getBundleId(),
            appBuild: DeviceInfo.getBuildNumber(),
            appVersion: DeviceInfo.getVersion(),
            readableVersion: DeviceInfo.getReadableVersion(),
            deviceName: DeviceInfo.getDeviceName(),
            userAgent: DeviceInfo.getUserAgent(),
            deviceLocale: DeviceInfo.getDeviceLocale(),
            deviceCountry: DeviceInfo.getDeviceCountry(),
            timezone: DeviceInfo.getTimezone()
          },
          ...arg
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigReview: {
      query:'/app/get-config-payment',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return arg;
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigForUpdateLocation: {
      query:'/app/get-config-for-update-location',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          ...arg
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigForBackgroundLocation: {
      query:'/app/get-config-for-background-location',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:'2.1',
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getApiKeyGoogle: {
      query:'/app/get-api-key-google-map',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getContact: {
      query:'/app/get-contact',
      argFormat:{
      },
      argMap:{},
      limitProcess:1,
      apiVersion:'2.1',
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    reportLocation: {
      query:'/app/report-location',
      argFormat:{
        platform:''
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          message: arg.message,
          feed_id: arg.id,
          nameLocation: arg.nameLocation
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    listRegion: {
      query:'/app/region/list',
      argFormat:{
        memberToken:''
      },
      argMap:{},
      limitProcess:1,
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigPhoneAuthen: {
      query:'/app/get-config-for-phone-athentication',
      argMap:{},
      limitProcess:1,
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getMessageWarningAuthen: {
      query: '/app/get-message-warning-authentication',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: 2,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    listServiceAvailable: {
      query: '/app/list-service-available',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.2',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getNewsCategory: {
      query: '/app/get-news-category',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getNews: {
      query: '/app/get-news',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getDetailNews: {
      query: '/app/get-detail-news',
      argFormat: {},
      argMap: {},
      showLoading: true,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getBanner: {
      query: '/app/get-banner',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getConfigForMount: {
      query: '/app/get-config-for-mount',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getConfigZippo: {
      query: '/app/get-config-zippo',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    syncZippo: {
      query: '/app/sync-zippo',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getConfigHistoryFacebook: {
      query: '/app/get-config-history-facebook',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: 2,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getListTopUpAddress: {
      query: '/app/list-topup-address',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: 2,
      limitProcess: 1,
      showLoading: true,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getConfigForTag: {
      query: '/app/get-config-tag',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getConfigLogin: {
      query: '/app/get-config-login',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getHotlineBookCar: {
      query: '/app/get-hotline-book-car',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.0',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    },
    getStateMachineRider: {
      query: '/app/get-state-machine-rider',
      argFormat: {},
      argMap: {},
      showLoading: false,
      apiVersion: '2.0',
      limitProcess: 1,
      onArg: (arg, getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch, getState, data) => {
        return true
      }
    }
  }

  setShowLoading(show) {
    const actionName = 'showLoading';

    return (dispatch) => {
      return new Promise((resolve,reject)=>{
          dispatch(RDActions[this.sortName][actionName+'OnRequest']({show}))
      })
    }
  }

  getConfig(arg={},setState = true){
    // return;
    var self = this;
    var url = `${Define.constants.proxyAddr}/config`;

    var actionName = 'getConfig';
    var argFormat={
      modeApp: _.get(globalVariableManager, 'reduxManager.state.AppSetting.mode', '') || '',
      regionName: _.get(globalVariableManager, 'reduxManager.state.AppSetting.regionNew', ''),
      platform: Platform.OS,
      nativeVersion: DeviceInfo.getBuildNumber(),
      os_version: DeviceInfo.getSystemVersion(),
      role: '',
      memberToken : _.get(globalVariableManager, 'reduxManager.state.User.memberInfo.member.memberToken', ''),
    }

    var argTemp = Util.dataProtectAndMap(arg, argFormat);

    var preTextLog = self.name+':'+actionName+':';

    return (dispatch) => {
      return new Promise((resolve,reject)=>{
          dispatch(RDActions[this.sortName][actionName+'OnRequest'](argTemp))
          const uri = `${url}?nativeVersion=${argTemp.nativeVersion}&platform=${argTemp.platform}&os_version=${argTemp.os_version}&role=${argTemp.role}&modeApp=${argTemp.modeApp}&regionName=${argTemp.regionName}&memberToken=${argTemp.memberToken}`;
          axios
            .get(uri)
            .then((res) => {
              let data = {
                systemError: true
              };

              if(res.status === 200 && res.data.code === 200) {
                data = res.data.data;
              }

              dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));
              resolve(res);
            })
            .catch((err) => {
              let data = {
                // networkError: err.message === 'Network Error' ? true : false,
                // systemError: true
              }

              dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));
              reject(err);
            })
      })
    }
  }
}


module.exports= new AppStateActions_MiddleWare();
