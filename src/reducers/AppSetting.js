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
                regionNew: '',
                lastLocation: null,
                lastTimeGetRegion: 0,
                changedQuickReceiverMess:false,
                quickReceiverMessArray:['☎','☎','☎'],
                actionPressOrder:'none',
                countTipsCash:0,
                countTipCart:0,
                showTipFeedsSaved:true,
                numberFeedsCache:200,
                numberFeedsDisplay:30,
                showAllLineFeed:true,
                keepScreenOn:true,
                onlyFacebookOrder:false,
                soundOS: true,
                setOpenFb:'Trong app',
                isShowTotalPosts:true,
                defaultOriginPlace: null,
                defaultOriginPlaces: [],
                hasSyncDefaultLocation: false,
                searchOptions:{
                  myLocationOn: true,
                  radius:3,
                  salary:0,
                  salaryOn:false,
                  deposit:0,
                  depositOn:false,
                },
                hintOrderStep: HINT_STEP.PLACE_TOUR,
                isHintPickLocation: 0,
                isGuideAtFeed: 1,
                newFlags:{
                  sideMenuButton:true,
                  'Cài đặt':true,
                  SettingScreen_QuickReceiverMess:false,
                  SettingScreen_ShowAllLineFeed:false,
                  SettingScreen_KeepScreenOn:false,
                  SettingScreen_NumberFeedsDisplay:false,
                  SettingScreen_NumberFeedsCache:false,
                },
                language:'',
                countTipsImageOrder: 0,
                countSuggestLocation: 0,
                recentlyLocation:[]
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.User.getRegionByLatLng: {
      stateTemp = RDUtil.processReducerLoading(state,action,'getRegionByLatLng',
                {
                  onSuccess:(stateTempIn)=>{
                    stateTempIn.lastLocation = action.data.arg.location;
                    stateTempIn.regionNew = action.data.res.data;
                    stateTempIn.lastTimeGetRegion = Date.now();
                    return stateTempIn;
                  }
                })

      break;
    }
    case RDActionsTypes.AppSetting.saveSetting:{
      stateTemp = RDUtil.processReducerLoading(state,action,'saveSetting',
                {
                  onRequest:(stateTempIn)=>{
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.increaseHintOrder:{
      stateTemp = RDUtil.processReducerLoading(state,action,'increaseHintOrder',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.hintOrderStep++;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.increaseHintPickLocation:{
      stateTemp = RDUtil.processReducerLoading(state,action,'increaseHintPickLocation',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.isHintPickLocation = 1;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.disableGuideAtFeed:{
      stateTemp = RDUtil.processReducerLoading(state,action,'disableGuideAtFeed',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.isGuideAtFeed = 0;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setQuickReceiverMess:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setQuickReceiverMess',
                {
                  onRequest:(stateTempIn)=>{
                    if (Array.isArray(action.data)) {
                      stateTempIn.changedQuickReceiverMess = true;
                      stateTempIn.quickReceiverMessArray = action.data;
                      stateTempIn.quickReceiverMessArray.forEach((message) => {
                        let startPointPhoneText = message.search('☎')
                        startPointPhoneText === -1 && (message += '☎');
                      })
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setNumberFeedsCache:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setNumberFeedsCache',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='number') {
                      stateTempIn.numberFeedsCache = action.data;
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setActionOrderOnpress:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setActionOrderOnpress',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='string') {
                      stateTempIn.actionPressOrder = action.data;
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.increaseTipsCash:{
      stateTemp = RDUtil.processReducerLoading(state,action,'increaseTipsCash',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.countTipsCash++;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.increaseTipCart:{
      stateTemp = RDUtil.processReducerLoading(state,action,'increaseTipCart',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.countTipCart++;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setTipFeedsSave:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setTipFeedsSave',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.showTipFeedsSaved = false;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setNumberFeedsDisplay:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setNumberFeedsDisplay',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='number') {
                      stateTempIn.numberFeedsDisplay = action.data;
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setModeOpenFb:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setModeOpenFb',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='string') {
                      stateTempIn.setOpenFb = action.data;
                    }
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.showOnlyFacebookOrder:{
      stateTemp = RDUtil.processReducerLoading(state,action,'showOnlyFacebookOrder',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.onlyFacebookOrder = action.data ? true : false;
                    return stateTempIn;
                  }

                })

      break;
    }

    case RDActionsTypes.AppSetting.switchSoundOS:{
      stateTemp = RDUtil.processReducerLoading(state,action,'switchSoundOS',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.soundOS = action.data ? true : false;
                    return stateTempIn;
                  }

                })

      break;
    }

    case RDActionsTypes.AppSetting.showTotalPosts:{
      stateTemp = RDUtil.processReducerLoading(state,action,'showTotalPosts',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.isShowTotalPosts = action.data ? true : false;
                    return stateTempIn;
                  }

                })

      break;
    }
    case RDActionsTypes.AppSetting.setShowAllLineFeed:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setShowAllLineFeed',
                {
                  onRequest:(stateTempIn)=>{
                    if (typeof(action.data)==='boolean') {
                      stateTempIn.showAllLineFeed = action.data;
                    }
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
    case RDActionsTypes.AppSetting.setSearchOptions:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setSearchOptions',
                {
                  onRequest:(stateTempIn)=>{
                    // let dataTemp = Util.dataProtectAndMap
                    if (typeof(action.data)==='object') {
                      stateTempIn.searchOptions = _.merge(stateTempIn.searchOptions,action.data) ;
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
    case RDActionsTypes.AppSetting.setMode:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setMode',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.mode = action.data.mode
                    return stateTempIn;
                  }

                })
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
    case RDActionsTypes.AppSetting.deleteDefaultOrigin:{
      stateTemp = RDUtil.processReducerLoading(state,action,'deleteDefaultOrigin',
                {
                  onSuccess:(stateTempIn)=>{
                    for (let i = 0; i < stateTempIn.defaultOriginPlaces.length; i++) {
                      if(stateTempIn.defaultOriginPlaces[i]._id && stateTempIn.defaultOriginPlaces[i]._id === action.data.arg.id) {
                        const deleteOriginLocation = stateTempIn.defaultOriginPlaces[i];
                        stateTempIn.defaultOriginPlaces.splice(i, 1);

                        if(deleteOriginLocation.active && stateTempIn.defaultOriginPlaces.length) {
                          stateTempIn.defaultOriginPlaces[0].active = 1;
                        }
                        break;
                      }
                    }
                    stateTempIn.defaultOriginPlaces = _.clone(stateTempIn.defaultOriginPlaces, true);
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.AppSetting.setDoneSyncDefaultLocation:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setDoneSyncDefaultLocation',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.hasSyncDefaultLocation = true;
                    return stateTempIn
                  }
                })
      break;
    }
    case RDActionsTypes.AppSetting.modifyDefaultOrigin:{
      stateTemp = RDUtil.processReducerLoading(state,action,'modifyDefaultOrigin',
                {
                  onSuccess:(stateTempIn)=>{
                    const id = action.data.arg.id;
                    const data = action.data.arg;
                    for (let i = 0; i < stateTempIn.defaultOriginPlaces.length; i++) {
                      if(stateTempIn.defaultOriginPlaces[i]._id && stateTempIn.defaultOriginPlaces[i]._id === action.data.arg.id) {
                        if(data.name) {
                          stateTempIn.defaultOriginPlaces[i].name = data.name;
                        }

                        if(data.location) {
                          stateTempIn.defaultOriginPlaces[i].location = data.location;
                        }
                          stateTempIn.defaultOriginPlaces[i].nameDefault = data.nameDefault;
                          stateTempIn.defaultOriginPlaces[i].subNameDefault = data.subNameDefault;
                      }
                    }

                    stateTempIn.defaultOriginPlaces = _.clone(stateTempIn.defaultOriginPlaces, true);
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.AppSetting.listDefaultLocation:{
      stateTemp = RDUtil.processReducerLoading(state,action,'listDefaultLocation',
                {
                  onSuccess:(stateTempIn)=>{
                    let indexActive = 0;
                    stateTempIn.defaultOriginPlaces.forEach((location, index) => {
                      if(location.active) {
                        indexActive = index
                      }
                    })

                    let data = action.data.res.data
                    data.forEach((location, index) => {
                      if(indexActive == index) {
                        location.active = 1;
                      } else {
                        location.active = 0;
                      }
                    })

                    stateTempIn.defaultOriginPlaces = data
                    stateTempIn.defaultOriginPlaces = _.clone(stateTempIn.defaultOriginPlaces, true);
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.AppSetting.setActiveDefaultOrigin:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setActiveDefaultOrigin',
                {
                  onRequest:(stateTempIn)=>{
                    const indexActive = action.data.index;

                    stateTempIn.defaultOriginPlaces.forEach((location, index) => {
                      location.active = 0;
                      if(index === indexActive) {
                        location.active = 1;
                      }
                    });

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
    case RDActionsTypes.AppSetting.setRegion:{
      stateTemp = RDUtil.processReducerLoading(state,action,'setRegion',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.region = action.data.region
                    return stateTempIn;
                  }

                })
      break;
    }
    case RDActionsTypes.AppSetting.increaseTipsImageOrder:{
      stateTemp = RDUtil.processReducerLoading(state,action,'increaseTipsImageOrder',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.countTipsImageOrder++;
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.AppSetting.addRecentlyLocationPick:{
      stateTemp = RDUtil.processReducerLoading(state,action,'addRecentlyLocationPick',
                {
                  onRequest:(stateTempIn)=>{
                    stateTempIn.recentlyLocation.unshift(action.data)
                    stateTempIn.recentlyLocation = _.clone((_.uniqWith(stateTempIn.recentlyLocation, _.isEqual)).slice(0,5), true);
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
