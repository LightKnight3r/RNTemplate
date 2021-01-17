// @flow
 var _ = require('lodash')
import axios from 'axios';
import { Platform } from 'react-native';
var RDActionsTypes = require('./RDActionsTypes');
// LIB

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');

var RDActions = require('./RDActions');

// NOTE : stuck when call getState (when dispatch another action in a action)

/*
 * action creators
 */

class RDActions_MiddleWare {
  name=''
  sortName=''
  logRes=true
  actionsList={}
  constructor(name,logRes){
    this.name = name;
    this.sortName = name.slice(0,name.indexOf('Actions'));
    this.logRes = logRes;
  }

  init(){
    var self = this;
    Object.keys(self.actionsList).forEach((key)=>{
      var obj = self.actionsList[key];
      // CREATE MIDDLEWARE FUNCTION
      self[key] = function(arg={},setState = true) {
        var actionName = key;
        var query = obj.query;
        var argTemp = Util.dataProtectAndMap(arg, obj.argFormat);

        var preTextLog = self.name+':'+actionName+':';
        return (dispatch, getState) => {
          //
          var retFromPreProcess;
          if (obj.preProcess) {
            retFromPreProcess = obj.preProcess(argTemp,getState);
          }
          if (retFromPreProcess) {
            return retFromPreProcess;
          }
          var req = {};
          // req config
          if (obj.onArg) {
            req = obj.onArg(argTemp,getState);
          }else{
            req=argTemp;
          }

          if(req.forceShowLoading) {
            obj.showLoading = 1;
            delete req.forceShowLoading;
          }

          var extras = {};
          if (obj.onExtras) {
            extras = obj.onExtras(arg, getState);
          }

          req.regionName = _.get(getState(),'AppSetting.regionNew', '');
          req.modeApp = _.get(getState(),'AppSetting.mode', '');
          req.platform = Platform.OS;
          req.nativeVersion = Define.constants.nativeVersion;

          if (_.get(getState(), 'User.memberInfo.token', '')) {
            req.token = _.get(getState(), 'User.memberInfo.token', '');
          }

          Debug.log(preTextLog+':'+query+':'+JSON.stringify(req));
          var promise = new Promise((resolve,reject)=>{
            var data ={
              extras,
              arg: argTemp
            };
            // check limitProcess
            if ( obj.limitProcess !==0 && getState()[this.sortName] && getState()[this.sortName][actionName]  &&
              getState()[this.sortName][actionName].loading >= obj.limitProcess) {
              Debug.log(preTextLog+':reach limitProcess:' + getState()[this.sortName][actionName].loading);
              data={
                arg:argTemp,
                extras,
                err:'react limitProcess',
              }
              reject(data)
              return;
            }

              if(setState) {dispatch(RDActions[this.sortName][actionName+'OnRequest'](data)); }
              if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show:true}))}
              var methode=()=>{};
              var methodeText='get';
              if (obj.methode === 'get') {
                methode = axios.get;
                methodeText='get';
              }else{
                methode = axios.post
                methodeText='post';
              }

              let preLinkApi = '';
              // let apiVersion = obj.apiVersion ? obj.apiVersion : Define.constants.apiVersion;
              let apiVersion = obj.apiVersion;
              switch (apiVersion) {
                case 1:{
                  preLinkApi = '/v1.0';
                  break;
                }
                case 2:{
                  preLinkApi = '/v2.0';
                  break;
                }
                default:{
                  if (typeof(apiVersion) === 'string') {
                    preLinkApi = '/v'+apiVersion;
                  }else{
                    preLinkApi = '/v1.0';
                  }

                }
              }

              let serverAddr = obj.serverAddr || Define.constants.serverAddr;

              let fullRequestUrl = `${serverAddr}${preLinkApi}${query}`;
              if(req.serverAddr) {
                fullRequestUrl = req.serverAddr;
                delete req.serverAddr
              }

              methode(fullRequestUrl, req, {timeout: obj.timeout || 10000},
                { headers: {
                              'x-access-token' : Define.constants.serverApiToken ,
                              ...obj.headers
                            }
                })
                .then((response)=>{
                  if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))}
                  Debug.log(preTextLog+':callback:'+fullRequestUrl+':'+JSON.stringify(req));
                  if(response.data.code === 200) {
                    var res = response.data;
                    Debug.log(preTextLog +'res:');
                    if (self.logRes) {
                      Debug.log(res);
                    }
                    data={
                      arg:argTemp,
                      res:res,
                      extras
                    }
                    var onDoneRet = true;
                    if (obj.onDone) {onDoneRet = obj.onDone.call(self, dispatch,getState,data);}
                    if (onDoneRet) {
                      if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
                      resolve(data);
                    }else{
                      if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
                      reject(data);
                    }
                  }else{
                    return Promise.reject(response)
                  }
                })
                .catch((err)=>{
                  if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))}

                  Debug.log(preTextLog+':err:'+fullRequestUrl+':'+JSON.stringify(req),Debug.level.ERROR);

                  // Debug.log(preTextLog +'err:',Debug.level.ERROR);
                  // Debug.log(err);
                  data={
                    arg:argTemp,
                    // err:util.inspect(err),
                    // err:'err',
                    err:JSON.stringify(err),
                    errObj:err,
                    extras
                  }
                  var onErrorRet = true;
                  if (obj.onError) {onErrorRet = obj.onError(dispatch,getState,data);}
                  if (onErrorRet) {
                    if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
                    reject(data);
                  }else{
                    if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
                    resolve(data);
                  }
                })
          })
          return promise;
        }
      };
    })
    return self;
  }
}


export default RDActions_MiddleWare;
