
var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');
import RDActions_MiddleWare from './RDActions_MiddleWare'

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

class NotificationsActions_MiddleWare extends RDActions_MiddleWare {
  constructor(){
    super('NotificationsActions_MiddleWare',true);
    this.init();
  }
  actionsList={
    notify: {
      query: '/notification/list',
      argFormat: {},
      argMap: {},
      serverAddr: Define.constants.serverNotifyAddr,
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
    seenAllNotify: {
      query: '/notification/seen-all',
      argFormat: {},
      argMap: {},
      serverAddr: Define.constants.serverNotifyAddr,
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
    countNotify: {
      query: '/notification/count',
      argFormat: {},
      argMap: {},
      serverAddr: Define.constants.serverNotifyAddr,
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
    getDetailNotification: {
      query: '/notification/get',
      argFormat: {},
      argMap: {},
      serverAddr: Define.constants.serverNotifyAddr,
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
    }
  }
}


module.exports = new NotificationsActions_MiddleWare();
