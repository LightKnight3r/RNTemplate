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
      token : _.get(globalVariableManager, 'reduxManager.state.User.memberInfo.token', ''),
    }

    var argTemp = Util.dataProtectAndMap(arg, argFormat);

    var preTextLog = self.name+':'+actionName+':';

    return (dispatch) => {
      return new Promise((resolve,reject)=>{
          dispatch(RDActions[this.sortName][actionName+'OnRequest'](argTemp))
          const uri = `${url}?nativeVersion=${argTemp.nativeVersion}&platform=${argTemp.platform}&os_version=${argTemp.os_version}&role=${argTemp.role}&modeApp=${argTemp.modeApp}&regionName=${argTemp.regionName}&token=${argTemp.token}`;
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
