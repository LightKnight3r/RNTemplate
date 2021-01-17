import {
  Dimensions
} from 'react-native';

var RDActionsTypes = require( '../actions/RDActionsTypes');
var RDUtil = require('./RDUtil');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
function initLoading(){
  let retObj={};
  Object.keys(RDActionsTypes.AppState).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

const configFormat = {
  loginByFacebook: {
    status: 0
  },
  undermaintain: {
    status: false,
    message: 'Hệ thống đang bảo trì bạn vui lòng thử lại sau'
  },
  forceUpdate: {
    status: false,
    message: 'Hiện tại đã có phiên bản mới của ứng dụng trên store bạn vui lòng cập nhật để có được những trải nghiệm, chức năng tốt nhất. Xin cảm ơn.'
  },
  networkError: false,
  systemError: false
}

/**
 * Reducer Template.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function AppState(state ={
                  ...initLoading(),
                  showLoading: false,
                  isReview: true,
                  config: {
                    loginByFacebook: {
                      status: 0
                    },
                    undermaintain: {
                      status: false ,
                      message: ''
                    },
                    forceUpdate: {
                      status: false,
                      message: ''
                    },
                    networkError: false,
                    systemError: false,
                  },
  currentState:RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING,
  currentDirect: (widthScreen < heightScreen)?
                      RDActionsTypes.AppState.constants.APP_STATE_DIRECT_LIST.PORTRAIT:
                      RDActionsTypes.AppState.constants.APP_STATE_DIRECT_LIST.LANDSCAPE,
                  } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.AppState.getConfigReview : {
      stateTemp = RDUtil.processReducerLoading(state,action,'getConfigReview',
                {
                  onSuccess: (stateTempIn) => {
                    stateTempIn.isReview = action.data.res.data;
                    return stateTempIn;
                  },
                })
      break;
    }

    case RDActionsTypes.AppState.showLoading : {
      stateTemp = RDUtil.processReducerLoading(state,action,'getConfig',
                {
                  onRequest: (stateTempIn) => {
                    stateTempIn.showLoading = action.data.show;
                    return stateTempIn;
                  },
                })

      break;
    }
    case RDActionsTypes.AppState.getConfig:{
      stateTemp = RDUtil.processReducerLoading(state,action,'getConfig',
                {
                  onRequest: (stateTempIn) => {
                    stateTempIn.config = configFormat;
                    return stateTempIn;
                  },
                  onSuccess:(stateTempIn)=>{
                    const data  = Util.dataProtectAndMap(action.data, configFormat)
                    if(!data.undermaintain.status && !data.forceUpdate.status && !data.networkError && !data.systemError) {
                      stateTempIn.currentState = RDActionsTypes.AppState.constants.APP_STATE_LIST.RUNNING
                    } else {
                      stateTempIn.currentState = RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING
                    }
                    stateTempIn.config = data;
                    return stateTempIn;
                  }
                })

      break;
    }
    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      break;
  }

  return stateTemp;

}


module.exports= AppState;
