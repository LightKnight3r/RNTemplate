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
  Object.keys(RDActionsTypes.AppSetting).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

const HINT_STEP = {
  'PLACE_TOUR': 0,
  'DISTANCE_MONEY_TOUR': 1,
  'DONE': 2
}

function AppSetting(state ={
                ...initLoading(),

                currentHybridVersion:Define.constants.hybridVersion,
                mode: '',
                keepScreenOn:true,
                defaultOriginPlace: null,
                defaultOriginPlaces: [],
                newFlags:{
                  sideMenuButton:true,
                  'Cài đặt':true,
                  SettingScreen_QuickReceiverMess:false,
                  SettingScreen_KeepScreenOn:false,
                },
                language:'',
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.AppSetting.saveSetting:{
      stateTemp = RDUtil.processReducerLoading(state,action,'saveSetting',
                {
                  onRequest:(stateTempIn)=>{
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setKeepScreenOn:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setKeepScreenOn',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='boolean') {
                      stateTempIn.keepScreenOn = action.data;
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setNewFlags:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setNewFlags',
                {
                  onRequest:(stateTempIn)=>{
                    // let dataTemp = Util.dataProtectAndMap
                    if (typeof(action.data)==='object') {
                      state.newFlags = _.merge(state.newFlags,action.data) ;
                    }
                    return state;
                  }

                })

      break;
    }
    case 'persist/REHYDRATE':{
      if (!action.payload.AppSetting) {
        break;
      }
      // clear loading
      Object.keys(RDActionsTypes.AppSetting).forEach((key)=>{
        if (key === 'constants') { return;}
        action.payload.AppSetting[key] = {loading:0};
      })
      // process newFlags
      if (state.currentHybridVersion !==  action.payload.AppSetting.currentHybridVersion) {
        // special merge ( only set false => true)
        if (!action.payload.AppSetting.newFlags) {
          action.payload.AppSetting.newFlags={};
        }
        Object.keys(state.newFlags).forEach((key)=>{
          if (state.newFlags[key]) {
            action.payload.AppSetting.newFlags[key] = true;
          }
        })
      }

      break;
    }
    case RDActionsTypes.AppSetting.addDefaultOrigin:{
      stateTemp = RDUtil.processReducerLoading(state,action,'addDefaultOrigin',
                {
                  onSuccess:(stateTempIn)=>{
                    if(!stateTempIn.defaultOriginPlaces.length) {
                      action.data.res.data.active = 1;
                    }
                    stateTempIn.defaultOriginPlaces.push(action.data.res.data)
                    stateTempIn.defaultOriginPlaces = _.clone(stateTempIn.defaultOriginPlaces, true);
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.User.logout:{
      stateTemp = RDUtil.processReducerLoading(state,action,'logout',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.mode = '';
                    return stateTempIn;
                  },
                  onError: (stateTempIn) => {
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.AppSetting.switchLanguage:{
      stateTemp = RDUtil.processReducerLoading(state,action,'switchLanguage',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.language = action.data
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


module.exports= AppSetting;
