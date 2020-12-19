
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
    getRegionByLatLng: {
      query:'/member/get-region',
      argFormat:{
      },
      argMap:{},
      showLoading: false,
      limitProcess:1,
      serverAddr: Define.constants.serverAddr,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          level: 2,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    addPresenterCode: {
      query:'/member/add-presenter-code',
      argFormat:{
        presenterCode: ''
      },
      argMap:{},
      showLoading: false,
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
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
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    listMoneyMoMo: {
      query:'/momo/payment/list-money',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
      },
      argMap:{},
      showLoading: false,
      limitProcess:1,
      apiVersion: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          platform: Platform.OS,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    listMoneyBank: {
      query:'/bank/list-money',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
      },
      argMap:{},
      methode: 'get',
      showLoading: false,
      limitProcess:1,
      apiVersion: 2,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    listMoneyVimo: {
      query:'/vimo/checkout/list-money',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
      },
      argMap:{},
      methode: 'get',
      showLoading: false,
      limitProcess:1,
      apiVersion: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getDeeplinkMomo: {
      query:'/momo/get-deeplink',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
        access_token: ''
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      apiVersion: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          platform: Platform.OS,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getInfoPaymentMomo: {
      query:'/momo/payment/get-info',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
        access_token: ''
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      apiVersion: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          platform: Platform.OS,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    uploadCookies: {
      query:'/comment/upload-cookies',
      argFormat:{
        cookies: {}
      },
      argMap:{},
      showLoading: false,
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    checkPhoneExist: {
      query:'/member/check-phone-exist',
      argFormat:{
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      apiVersion:'2.1',
      onArg:(arg,getState)=>{
        return {
          ...arg
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    chooseMode: {
      query:'/member/choose-mode',
      argFormat:{
        region: '',
        type: 0
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      apiVersion: '2.1',
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    buyPackage: {
      query:'/package/buy-package',
      argFormat:{
        memberToken:'',
        _id: '',
        type: ''
      },
      argMap:{},
      limitProcess:1,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    bankCharging: {
      query:'/bank/charging',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
        memberToken:''
      },
      argMap:{},
      limitProcess:1,
      showLoading:true,
      apiVersion:Define.constants.apiVersion,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
          amount:arg.amount,
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigGateway: {
      query:'/get-config',
      argFormat:{
        memberToken:''
      },
      serverAddr: Define.constants.serverGatewayAddr,
      apiVersion:'1.0',
      argMap:{},
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getConfigForCard: {
      query:'/card/get-config',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
        memberToken:''
      },
      argMap:{},
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    cardCharging: {
      query:'/card/charging',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{
        type:'',
        serial: '',
        pin: ''
      },
      argMap:{},
      showLoading: true,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    resetToken: {
      query:'/member/reset-token',
      argFormat:{
        id:'',
        token:'',
      },
      argMap:{},
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
          // token:getState().User.memberInfo.member.facebook.token,
          // id:getState().User.memberInfo.member.facebook.id,
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
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
          ...arg
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    // updateAuthentication:{
    //   serverAddr:'http://192.168.1.7:8000',
    //   query:'/shop/authen/create',
    //   methode:'post',
    //   headers:{
    //     // 'content-type': 'multipart/form-data'
    //   },
    //   apiVersion:2,
    //   argFormat:{
    //     storeName:'',
    //     address:'',
    //     frontCer:'',
    //     backCer:'',
    //     avatar:'',
    //   },
    //   argMap:{},
    //   limitProcess:1,
    //   showLoading:true,
    //   onArg:(arg,getState)=>{
    //     var temp = new FormData();
    //
    //     var avatarImage = {
    //       uri:arg.avatar,             // e.g. 'file:///path/to/file/image123.jpg'
    //       type:'image/jpg'             // e.g. 'image/jpg'
    //     }
    //     var frontCerImage = {
    //       uri:arg.frontCer,             // e.g. 'file:///path/to/file/image123.jpg'
    //       type:'image/jpg'             // e.g. 'image/jpg'
    //     }
    //     var backCerImage = {
    //       uri:arg.backCer,             // e.g. 'file:///path/to/file/image123.jpg'
    //       type:'image/jpg'             // e.g. 'image/jpg'
    //     }
    //
    //     temp.append('address', arg.address)
    //     temp.append('storeName', arg.storeName)
    //
    //     temp.append('avatar', avatarImage)
    //     temp.append('frontCer', frontCerImage)
    //     temp.append('backCer', backCerImage)
    //
    //     temp.append('memberToken', _.get(getState(), 'User.memberInfo.member.memberToken', ''))
    //     temp.append('device_id', Define.constants.deviceId)
    //     return temp;
    //   },
    //   onError:undefined, // (dispatch,getState,data)=>{return true},
    //   onDone:undefined, // (dispatch,getState,data)=>{return true},
    // },
    sentVoipNotifyToken: {
      query:'/app/voip-notify',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken: arg.memberToken,
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
          memberToken: arg.memberToken,
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
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    doneTraining:{
      query:'/member/done-training',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      showLoading: true,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    toggleReceiveOrder: {
      query:'/member/toggle-order',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      showLoading: true,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken:_.get(getState(), 'User.memberInfo.member.memberToken', ''),
          isReceive: arg.isReceive
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    get:{
      query:'/member/get',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:10,
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', ''),
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        if(Date.now() - getState().User.lastTracking >= 3600000) {
          dispatch(this.trackingAction({type: 2, memberToken: data.res.member.memberToken}));
        }

        return true
      },
    },
    getAuthenShopInf:{
      query:'/shop/authen/get',
      argFormat:{},
      argMap:{},
      // serverAddr: 'http://sandbox.api.sanship.info',
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getById:{
      query:'/member/get-by-id',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', ''),
          id: arg.id
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    login:{
      query:'/member/login',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          access_token:arg.access_token,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.trackingAction({type: 0, memberToken: data.res.member.memberToken}));
        return true
      },
    },
    loginByPhone:{
      query:'/member/login-by-phone',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.trackingAction({type: 0, memberToken: data.res.member.memberToken}));
        return true
      },
    },
    resetPassword:{
      query:'/member/reset-password',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg: (arg,getState) => {
        return {
          newApp: 1,
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.trackingAction({type: 0, memberToken: data.res.member.memberToken}));
        return true
      },
    },
    resetPasswordByNewPhoneAuthen:{
      query:'/member/reset-password',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:'2.1',
      limitProcess:1,
      onArg: (arg,getState) => {
        return {
          newApp: 1,
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.trackingAction({type: 0, memberToken: data.res.member.memberToken}));
        return true
      },
    },
    changePhoneNumber: {
      query:'/member/change-phone-for-user',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      showLoading: true,
      onArg:(arg,getState)=>{
        return {
          newApp: 1,
          newPhone: arg.phone,
          token: arg.token,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    changePhoneNumberByNewPhoneAuthen: {
      query:'/member/change-phone-for-user',
      argFormat:{},
      argMap:{},
      apiVersion:'2.1',
      limitProcess:1,
      showLoading: true,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    updatePhoneNumber: {
      query:'/member/update-phone',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      showLoading: true,
      onArg:(arg,getState)=>{
        return {
          newApp: 1,
          phone: arg.phone,
          token: arg.token,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    trackingAction: {
      query: '/app/tracking-action',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          otherInf: {
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
          }
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getByPhone: {
      query:'/member/get-by-phone',
      argFormat:{},
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      showLoading:true,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getHotNews: {
      query:'/hotnew/get',
      argFormat:{},
      serverAddr: Define.constants.serverNotifyAddr,
      argMap:{},
      apiVersion:Define.constants.apiVersion,
      limitProcess:2,
      showLoading:false,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState().User ,'memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    createCheckout: {
      query:'/vimo/checkout/create',
      serverAddr: Define.constants.serverGatewayAddr,
      showLoading:true,
      argFormat:{},
      argMap:{},
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined,
    },
    getInfoCheckout: {
      query:'/vimo/checkout/get-info',
      serverAddr: Define.constants.serverGatewayAddr,
      showLoading:true,
      argFormat:{},
      argMap:{},
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined,
    },
    sendViMoLink: {
      query:'/vimo/send-user-link',
      serverAddr: Define.constants.serverGatewayAddr,
      showLoading:true,
      argFormat:{},
      argMap:{},
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    checkViMoLink: {
      query:'/vimo/get',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    activeViMoLink: {
      query:'/vimo/active-user-link',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    requestChargeViMo: {
      query:'/vimo/request-charge',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    confirmChargeViMo: {
      query:'/vimo/confirm-charge',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    unlinkViMo: {
      query:'/vimo/unlink',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getLinkMomoInfo: {
      query:'/momo/payment/get-link-info',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    processTransactionMomo: {
      query:'/momo/payment/process-transaction',
      serverAddr: Define.constants.serverGatewayAddr,
      argFormat:{},
      argMap:{},
      showLoading:true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
    getAuthenShipperInf:{
      query:'/shipper/authen/get',
      argFormat:{},
      argMap:{},
      // serverAddr: 'http://sandbox.api.sanship.info',
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    statisticStar:{
      query:'/member/statisticStar',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverRatingAddr,
      showLoading: false,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    transferSSMToCoints:{
      query:'/member/transfer-ssm-to-coint',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: true,
      apiVersion:Define.constants.apiVersion,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    withdrawVimo:{
      query:'/vimo/withdraw-to-phone',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverGatewayAddr,
      showLoading: true,
      apiVersion:1,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    listSSMTransaction:{
      query:'/member/history-transaction',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: true,
      apiVersion:2,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getLatestShipperAuthenInf:{
      query:'/shipper/authen/get-new-approve',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: true,
      apiVersion: '2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    requestPhoneCode:{
      query:'/member/send-code',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:2,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    checkPhoneCode:{
      query:'/member/check-code',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:2,
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    addDefaultOrigin:{
      query:'/member/add-default-location',
      argFormat:{},
      argMap:{},
      showLoading: false,
      apiVersion:'2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined
    },
    deleteDefaultOrigin:{
      query:'/member/remove-default-location',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:'2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined
    },
    modifyDefaultOrigin:{
      query:'/member/modify-default-location',
      argFormat:{},
      argMap:{},
      showLoading: false,
      apiVersion:'2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    listDefaultLocation:{
      query:'/member/list-default-location',
      argFormat:{},
      argMap:{},
      showLoading: true,
      apiVersion:'2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    sendShipperAuthenInf:{
      query: '/shipper/authen/create',
      argFormat: {},
      argMap: {},
      showLoading: true,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch,getState,data) => {
        return true
      },
    },
    updateShipperAuthenInf:{
      query: '/shipper/authen/update',
      argFormat: {},
      argMap: {},
      showLoading: true,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: (dispatch,getState,data) => {
        return true
      },
    },
    getConfigShipperAuthenInf:{
      query:'/shipper/authen/get-config',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: true,
      apiVersion: '2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    sendFeedBack:{
      query:'/app/feedback',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: true,
      apiVersion: '2.1',
      limitProcess:1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getPoint:{
      query:'/member/get-point',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: false,
      apiVersion: 2,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getBankCodes:{
      query:'/bank/get-bank-codes',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: false,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getMountConfig:{
      query:'/mount/get-config',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: false,
      apiVersion: 2,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    sendMountProfile:{
      query:'/mount/send-profile',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    cancelMount:{
      query:'/mount/cancel',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getMountStatus:{
      query:'/mount/get-status',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    uploadBillMount:{
      query:'/mount/upload-bill',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    getVideoGuide:{
      query:'/mount/get-video-guide',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    checkMountServiceAvailable:{
      query:'/mount/check-service-available',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      },
    },
    listServiceRegister: {
      query: '/app/list-service-register',
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
    switchService: {
      query: '/app/switch-service',
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
    checkPhoneToMount: {
      query: '/mount/check-phone',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverMountAddr,
      showLoading: true,
      apiVersion: 1,
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      }
    },
    getConfigPoint: {
      query: '/app/get-config-point',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: false,
      apiVersion: '2.0',
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      }
    },
    getPointHistory: {
      query: '/member/history-transaction-point',
      argFormat:{},
      argMap:{},
      serverAddr: Define.constants.serverAddr,
      showLoading: false,
      apiVersion: '2.0',
      limitProcess: 1,
      onArg:(arg,getState)=>{
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        }
      },
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:(dispatch,getState,data)=>{
        return true
      }
    },
    loginWithoutPassword: {
      query: '/member/login-without-password',
      argFormat: {},
      argMap: {},
      showLoading: true,
      apiVersion: Define.constants.apiVersion,
      limitProcess: 1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          deviceId: Define.constants.deviceId
        };
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        dispatch(this.sentNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.sentVoipNotifyToken({memberToken: data.res.member.memberToken}));
        dispatch(this.trackingAction({type: 0, memberToken: data.res.member.memberToken}));
        return true
      }
    },
    getBannerFood: {
      query: '/app/get-banner-food',
      argFormat: {},
      argMap: {},
      showLoading: true,
      apiVersion: '2.1',
      limitProcess: 1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        return true
      }
    },
    calculateMoneyMultiOrderType: {
      query: '/order/calculate-money-multi-order-type',
      argFormat: {},
      argMap: {},
      showLoading: false,
      serverAddr: Define.constants.serverOrderAddr,
      apiVersion: '2.0',
      limitProcess: 1,
      onArg: (arg,getState) => {
        return {
          ...arg,
          memberToken: _.get(getState(), 'User.memberInfo.member.memberToken', '')
        };
      },
      onError: undefined, // (dispatch,getState,data)=>{return true},
      onDone: function (dispatch,getState,data) {
        return true
      }
    }
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

  // login(member,setState:boolean = true) {
  //   var self = this;
  //   var actionName = 'login';
  //   var preTextLog = self.name+':'+actionName+':';

  //   return (dispatch: Function) => {
  //     var data = {};
  //     return new Promise((resolve,reject)=>{
  //       let preLinkApi = '';
  //       switch (Define.constants.apiVersion) {
  //         case 1:{
  //           preLinkApi = '/api/v1.0';
  //           break;
  //         }
  //         case 2:{
  //           preLinkApi = '/api/v2.0';
  //           break;
  //         }
  //         default:{
  //           preLinkApi = '/api/v1.0';
  //         }
  //       }
  //       dispatch(RDActions[this.sortName][actionName+'OnRequest']());
  //       axios.post(`${ Define.constants.serverAddr }${preLinkApi}/member/login`, member, { headers: { 'x-access-token' : Define.constants.serverApiToken } })
  //           .then(response => {
  //             if(response.status === 200) {
  //               let data = response.data;
  //               if(data.code === 200) {
  //                 if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
  //                 if(!Define.config.waitToken) {
  //                   dispatch(this.sentNotifyToken());
  //                 }
  //               } else {
  //                 return Promise.reject(data);
  //               }
  //               resolve(data);
  //             } else {
  //               return Promise.reject(response);
  //             }
  //           })
  //           .catch(err => {
  //             let data = {
  //               err: err
  //             }
  //             if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}

  //             reject(err);
  //           })
  //     })
  //   }
  // }

  logout(arg = {},setState = true) {
    const memberToken = _.get(globalVariableManager, 'reduxManager.state.User.memberInfo.member.memberToken', '');
    const regionName = _.get(globalVariableManager, 'reduxManager.state.AppSetting.regionNew', '');
    const modeApp = _.get(globalVariableManager, 'reduxManager.state.AppSetting.mode', '');
    const platform = Platform.OS;
    const nativeVersion = Define.constants.nativeVersion;
    var self = this;
    var actionName = 'logout';
    var preTextLog = self.name+':'+actionName+':';
    Debug.log(`${preTextLog}:logOut:`, arg);
    return (dispatch) => {
      let data = {};
      if(setState) {dispatch(RDActions[this.sortName][actionName+'OnRequest']());}
      dispatch(RDActions['AppSetting']['setMode']({mode: ''}))

      return new Promise((resolve, reject) => {
        // Logout facebook
        LoginManager
          .logOut();

        if(memberToken) {
          // Call API when logout
          fetch(`${Define.constants.serverAddr}/api/v2.0/member/logout`,{
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberToken, regionName, modeApp, platform, nativeVersion})
          })
          .then((result) => {
            Debug.log(result);
          })
          .catch((err) => {
            Debug.log(err);
          });
          // Track event when logout
          dispatch(this.trackingAction({memberToken, type: 1}));
        }

        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
        resolve();
      });
    }
  }
  uploadVideoMount(arg){

    var argFormat={
      fileUpload: '',
    }
    var argTemp = Util.dataProtectAndMap(arg, argFormat);

    var req ;
    // req config
    var temp = new FormData();

    if(arg.fileUpload) {
      temp.append('fileUpload', {
        uri: arg.fileUpload,
        name: "video.mp4",
        fileName: "video.mp4",
        type: 'multipart/form-data'
      })
      temp.append('id', arg.id)
    }
    req = temp;
    //
    var data = {};
    var promise = new Promise((resolve,reject)=>{
      globalVariableManager.reduxManager.dispatch(RDActions['AppState']['showLoadingOnRequest']({show: true}))
      const serverAddr = Define.constants.serverMountAddr
      const preLinkApi = '/api/v1.0'
      const query = '/mount/upload-video'
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
        globalVariableManager.reduxManager.dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))
        if(response.code === 200) {
          var res = response;
          data={
            arg:argTemp,
            res:res,
          }
          resolve(data);
        }else{
          if(argTemp.fileUpload) {
            globalVariableManager.rootView.showToast('Gửi Video thất bại');
          }
          return Promise.reject(response)
        }
      })
      .catch((err)=>{
        globalVariableManager.reduxManager.dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))
        if(argTemp.fileUpload) {
          globalVariableManager.rootView.showToast('Gửi Video thất bại');
        }
        data={
          arg:argTemp,
          err:JSON.stringify(err),
          res:err,
          errObj:err,
        }
        reject(data);
      })
    })
    return promise;
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
      temp.append('memberToken', _.get(getState(), 'User.memberInfo.member.memberToken', ''))
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
