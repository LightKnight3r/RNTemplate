
//LIB
import React from 'react';
import {
  View,
  NativeModules,
  DeviceEventEmitter,
  ToastAndroid,
  BackHandler,
  AppState,
  NativeAppEventEmitter,
  AlertIOS,
  Platform,
  Dimensions,
  InteractionManager,
  UIManager,
  TouchableOpacity,
  Text,
  Linking,
  ActivityIndicator,
  Vibration,
  Image,
  PermissionsAndroid,
  Keyboard,
  SafeAreaView,
  Alert
} from 'react-native';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
import {injectAsyncReducer} from '../reducers'
import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import codePush from "react-native-code-push";

import IncomingLinkingManager from '../components/modules/IncomingLinkingManager';
import AnalyticsManager from '../components/modules/Analytics';

import * as Animatable from 'react-native-animatable';
//var GcmAndroid = require('react-native-gcm-android');
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
const RouterWithRedux = connect()(Router);
// var Orientation = require('react-native-orientation');
import messaging from '@react-native-firebase/messaging';
var SensorManager = NativeModules.SensorManager;
var Spinner = require('react-native-spinkit');
var StatusBarAndroid = require('react-native-android-statusbar');
import { Icon} from 'native-base';
let _ = require('lodash')
// var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);
var createReactClass = require('create-react-class');
const ms = require('ms');



var RNIntent = NativeModules.RNIntent;
//var RNHotUpdate = NativeModules.RNHotUpdate;
var UtilNative = NativeModules.Util;
var DeviceInfo = require('react-native-device-info');
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NetInfo from "@react-native-community/netinfo";
import RNBootSplash from "react-native-bootsplash";

import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';


// action
var RDActionsTypes = require( '../actions/RDActionsTypes');
var RDActions = require( '../actions/RDActions');

var TempActions_MiddleWare = require( '../actions/TempActions_MiddleWare');
var AppStateActions_MiddleWare = require( '../actions/AppStateActions_MiddleWare');
var UserActions_MiddleWare = require( '../actions/UserActions_MiddleWare');
//Component
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var Themes = require('../Themes');
var Define = require('../Define');
var Include = require('../Include');


import SideBar from '../components/elements/SideBar'

import NewTag from '../components/elements/NewTag'

var {globalVariableManager} = require('../components/modules/GlobalVariableManager');
var locationManager = require('../components/modules/LocationManager');
var {PopupManager,popupActions,popupConst} = require('../components/popups/PopupManager');
import Toast, {DURATION} from 'react-native-easy-toast'
// var SCTVFilmsSideMenu = require('../components/elements/SCTVFilmsSideMenu');
// screens
import LoginScreen from '../components/screens/LoginScreen'
import HomeScreen from '../components/screens/HomeScreen'


var screenList=[
  LoginScreen,
  HomeScreen
];
//popups
import DefaultPopup from '../components/popups/DefaultPopup'
import NotifyPopup from '../components/popups/NotifyPopup'
//variable


var App = createReactClass({
  getInitialState() {
    return {
      hasSetApiGoogleMap: Platform.OS === 'android',
      wakeByLocation: this.props.wakeByLocation
    }
  },
  webRTCAppear:false,
  changeWebRTCAppear:function(flag){
    var self = this;
    self.webRTCAppear = flag;
  },
  hideContentState:false,
  hideContent:function(flag=true){
    var self =this;
    if (flag) {
      // InteractionManager.runAfterInteractions(() => {
        self.refs.contentView.transitionTo({opacity:0},200)
      // })
      // self.refs.tutorialView.transitionTo({opacity:0.8},1200)
    }
    else{
      self.refs.contentView.transitionTo({opacity:1},200)
      // self.refs.tutorialView.transitionTo({opacity:0},600)
    }

    self.hideContentState=flag;
  },
  renderSideMenu:function(){
    var self=this;
     return(
       <SideBar ref={ref => this._sideMenuContent = ref} rootView={self}/>
     )
   },
   updateSideMenu: function() {
     const self = this;
     if(self._sideMenuContent) {
       self._sideMenuContent.getWrappedInstance().forceUpdate();
     }
   },
  drawSideMenu:function(flag=true){
    var self = this;
    if (self.sideMenu) {
      self.sideMenu.openMenu(flag);
    }
  },
  showToast: function(text, time=1000) {
    if(this.refs.toast) {
      this.refs.toast.show(text, time);
    }
  },
  getRegion: function() {
    return new Promise((resolve, reject) => {
      const {dispatch, appSetting, user} = this.props;
      const memberToken = _.get(user, 'memberInfo.member.memberToken', '');
      if(!appSetting.mode || !appSetting.regionNew || !memberToken || Date.now() - appSetting.lastTimeGetRegion <= 300000) {
        return resolve();
      }

      locationManager
        .getCurrentLocation()
        .then((location) => {
          return dispatch(UserActions_MiddleWare.getRegionByLatLng({location}))
        })
        .then((res) => {
          resolve();
        })
        .catch((err) => {
          resolve();
        })
    })
  },
  getUser: function() {
    const {user, dispatch} = this.props;

    if(user.memberInfo.member) {
      dispatch(UserActions_MiddleWare.get())
    }
  },
  handleAppStateChange:function(currentAppState){
    var self = this;
    const { dispatch,state,navigator, appSetting} = this.props;
    Debug.log('handleAppStateChange ' + currentAppState , Debug.level.USER_TRACKER);

    switch (currentAppState) {
      case 'active':{
        if(this.state.wakeByLocation) {
          this.setState({
            wakeByLocation: false
          })
        }

        this.getRegion()
        this.getConfig()
        .then(() => {
          this.getConfigReview();
          this.getUser();
        })
        break;
      }
      case 'background':{
        break;
      }
      case 'inactive':{
        break;
      }
      default:
    }
  },
  screenList:[],
  defaultLeftButton() {
    return (
      <TouchableOpacity
        style={Themes.current.screen.leftButtonWrapNavBar}
        onPress={()=>{
          Actions.pop();
        }}>
            <Icon name='md-arrow-back' style={{fontSize: 27, lineHeight: 36, color: '#fff',marginRight:6}} />
      </TouchableOpacity>
    )
  },
  defaultRightButton() {
    return (
      <View style={Themes.current.screen.rightButtonWrapNavBar}>
        {/* <ButtonWrap onPress={()=>{
          Actions.NotifyScreen({
            type: 'push'
          })
        }}>
          <Icon name='ios-notifications' style={{fontSize: 27, lineHeight: 36, color: '#fff'}} />
          {this.props.notify.list.length > 0 ?
            <View
              pointerEvents={'none'}
              style={{position: 'absolute', top: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, right: -5, width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center'}}>
                <Include.Text numberOfLines={1} style={{color: '#fff', backgroundColor: 'transparent'}}>{this.props.notify.list.length}</Include.Text>
            </View>
          : null}
        </ButtonWrap> */}
      </View>
    )
  },
  createScreen:function(){
    var self = this;
    self.screenList= screenList.map((current)=>{
      var currentTemp = current;
      if (current.WrappedComponent) {
        currentTemp = current.WrappedComponent;
      }
      if(!currentTemp.renderBackButton) {
        currentTemp.renderBackButton = self.defaultLeftButton;
      }
      if(!currentTemp.renderRightButton) {
        currentTemp.renderRightButton = self.defaultRightButton;
      }
      return(
        <Scene
          key={currentTemp.componentName}
          title={currentTemp.componentName}
          component={current}
          backButtonImage={Define.assets.Menu.icon_back}
          renderBackButton={currentTemp.renderBackButton}
          renderRightButton={currentTemp.renderRightButton}
          {...currentTemp.sceneConfig}
          onBack={() => {
            Actions.pop()
          }}
          navigationBarStyle = {{
            backgroundColor: '#01cca1',
            ...currentTemp.sceneConfig.navigationBarStyle,
          }}
          backButtonTextStyle = {{resizeMode: 'stretch', height: 19, top: -4}}
          bodyStyle={Themes.current.screen.bodyViewWrap}
          rootView={self}
          headerBackground={() => (
            <LinearGradient
              {...Themes.current.linearConfig}
              style={{ flex: 1 }}
            />
          )}
        />
      )
    })

    this.AppNavigator = Actions.create(
      <Scene key="root" hideNavBar>
        {self.screenList}
      </Scene>,
    )

    const initialState = this.AppNavigator.router.getStateForAction(this.AppNavigator.router.getActionForPathAndParams('LoginScreen'));
    const navReducer = (state = initialState, action) => {
      const nextState = this.AppNavigator.router.getStateForAction(action, state);
      // Simply return the original `state` if `nextState` is null or undefined.
      return nextState || state;
    };

    injectAsyncReducer('nav', navReducer)

    this.ReduxNavigator = createReduxContainer(this.AppNavigator, 'root');

    const mapStateToProps = state => ({
      state: state.nav,
    })
    this.RouterWithRedux = connect(mapStateToProps)(Router);
  },

  processUpdateInfoDone:false,
  processUpdateInfo:function(arg){
    var self = this;
    var {dispatch} = self.props;
    self.processUpdateInfoDone = true;
    Debug.log(arg);
    if ((arg.currentHybridVersion < arg.newHybridVersion ) /*&& !arg.mandatory*/ ) {
      if ((typeof arg.description === 'string' || arg.description instanceof String) &&
      !(arg.description.indexOf('NO_NOTIFY') === 0) ) {
        popupActions.setRenderContentAndShow(
          DefaultPopup,
          {
            title:'CẬP NHẬT TỰ ĐỘNG',
            description:('Phiên bản mới ' + Util.date2String(new Date(arg.newHybridVersion),'yyyy:mm:dd:HH:MM') + ':'  + arg.description) ,
          });
      }
    }
  },
  preProcessWhenStartDone:false,
  preProcessWhenStart : function(){
    Debug.log('preProcessWhenStart');
    var self = this;
    var {dispatch,user}= self.props;

    self.preProcessWhenStartDone = true;

    // GcmAndroid.requestPermissions();
    // if(Platform.OS === 'android') {
    //   RNHotUpdate.getCheckUpdateInfo()
    //     .then((arg)=>{
    //       Debug.log('getCheckUpdateInfo:done');
    //       self.processUpdateInfo(arg);
    //     })
    //     .catch((err)=>{
    //       Debug.log2('getCheckUpdateInfo:err',err,Debug.level.ERROR);
    //     })
    //
    // }

    self.processDeepLinkFromNotify();
  },
  processDeepLinkFromNotifyDone:false,
  startDeepLink:'',
  startExtras:{},
  backFlag:false,
  processDeepLinkFromNotify:function(){
    var self =this;
    // check intent (start from link or notify)
    if (self.processDeepLinkFromNotifyDone) {
      return;
    }

    Debug.log('Process deeplink when start app from notity')
    globalVariableManager.navigatorManager.handleNavigator(self.startDeepLink,self.startExtras);
    self.processDeepLinkFromNotifyDone = true;
  },
  fetchDataFromNotify(notify) {
    const {dispatch, appSetting} = this.props;

    let link, id;
    if (Platform.OS === 'ios') {
      link = _.get(notify, '_data.link', '');
      id = _.get(notify, '_data.extras.id', '');
    } else {
      link = _.get(notify, 'link', '');
      id = _.get(notify, 'extras.id', '');
    }
  },
  getConfigReview() {
    const {appSetting, dispatch} = this.props;

    return dispatch(AppStateActions_MiddleWare.getConfigReview())
  },
  getConfig() {
    const {appSetting, dispatch} = this.props;

    const role = _.get(appSetting, 'mode', '');
    return dispatch(AppStateActions_MiddleWare.getConfig({role}))
  },
  notifyManager(notify, isInitial) {
    const {dispatch, appSetting} = this.props;
    this.fetchDataFromNotify(notify);

    const notiObj = {
      _id: Date.now(),
      notifiedAt: Date.now(),
      title: _.get(notify, '_alert.title', ''),
      description: _.get(notify, '_alert.body', ''),
      icon: _.get(notify, '_data.icon', ''),
      link: _.get(notify, '_data.link', ''),
      extras: _.get(notify, '_data.extras', {}),
    }

    dispatch(RDActions['Notify']['addOnRequest'](notiObj));

    if(!isInitial && AppState.currentState === 'active') {
      popupActions.setRenderContentAndShow(NotifyPopup, {notiObj})
    } else {
      setTimeout(() => {
        globalVariableManager.navigatorManager.handleNavigator(notiObj.link, notiObj.extras)
      }, 500);
    }
  },
  keyboardWillShow: function(e) {
    this.heightKeyboard = e.endCoordinates.height;
    this.setState({
      keyboardShow: true
    })
  },
  keyboardWillHide: function() {
    this.setState({
      keyboardShow: false
    })
  },
  handleException: function (error, isFatal) {
    const {dispatch, navigator} = this.props;
    dispatch(AppStateActions_MiddleWare.sendCrashLog({
      appState: {
        stackScreen: navigator.stack,
        stackPopup: popupActions.getPopupStack()
      },
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        fileName: error.fileName,
        lineNumber: error.lineNumber,
        columnNumber: error.columnNumber
      }
    }))

    if(isFatal) {
      this.showToast("Đã có lỗi xảy với ứng dụng. HeyU sẽ khắc phục sớm nhất có thể. Xin cảm ơn", 2000);
    }
  },

  onPressNotify: function(e) {
    var self = this;
    var { dispatch,state,appState, user,appSetting} = this.props;
    Debug.log('Notification:press',Debug.level.USER_TRACKER);
    if (self.processDeepLinkFromNotifyDone) {
      globalVariableManager.navigatorManager.handleNavigator(e.payload.deepLink,e.payload.extras);
      let _idSellect = -1;
      for (let i = 0; i < globalVariableManager.reduxManager.state.Notify.list.length; i++) {
        if(globalVariableManager.reduxManager.state.Notify.list[i].notifiedAt === e.payload.time) {
          _idSellect = globalVariableManager.reduxManager.state.Notify.list[i]._id;
          break;
        }
      }

      if(_idSellect !== -1) {
          dispatch(RDActions['Notify']['removeOnRequest']({id:_idSellect}));
      }
    }
    else{
      self.startDeepLink = e.payload.deepLink;
      self.startExtras = e.payload.extras;
    }
  },

  onRegisterNotification: function(token){
    const {dispatch, user} = this.props;
    Define.config.token = token;
    Define.config.waitToken = false;
    const memberToken = _.get(user, 'memberInfo.member.memberToken', '');
    if(memberToken) {
      dispatch(UserActions_MiddleWare.sentNotifyToken({memberToken: memberToken}));
    }
  },

  onNotification: function(notification){
    var self = this;
    var { dispatch,state,appState, user,appSetting} = this.props;

    Debug.log2('GCM receive notification', notification);

    // GcmAndroid.applyBadgeCount(1);
    Vibration.vibrate([0, 500, 500]);
    var notifyFormat={
      _id:'',
      title:'',
      bigImgage:'',
      description:'',
      link:'',
      extras:{},
      createAt:0,
      expiredAt:0,
    }
    if (notification && notification.data && notification.data.title) {


      ToastAndroid.show('Thông báo: ' + notification.data.title , ToastAndroid.LONG);
      try{
        notification.data.extras = JSON.parse(notification.data.extras);
      }catch(ex){};

      var temp = Util.dataProtectAndMap(notification.data, notifyFormat);


      if (temp.link==="WebRTC") {
        self.webRTCAppear = true;
      }else {
        // Notification.create({
        //   id: temp._id,
        //   subject: temp.title,
        //   message: temp.description,
        //   bigText : temp.description,
        //   smallIcon: 'ic_launcher',
        //   bigStyleUrlImgage :temp.bigImgage ? temp.bigImgage:undefined,
        //   autoClear: true,
        //   category : 'event',
        //   // sound :'default',
        //   sound: temp.sound || 'default',
        //   priority: 2,
        //   vibrate :'default',
        //   lights :'default',
        //   payload: {
        //     time:Date.now(),
        //     deepLink:temp.link,
        //     extras:temp.extras,
        //   }
        // });
      }


      if (temp.link !== 'WebRTC') {
        temp.notifiedAt = Date.now()
        dispatch(RDActions['Notify']['addOnRequest'](temp));
      }

      self.fetchDataFromNotify(notification.data);
    }
  },

  UNSAFE_componentWillMount : function(){
    var self = this;
    var { dispatch,state,appState, user,appSetting} = this.props;

    globalVariableManager.reduxManager.setDispatchAndState(dispatch,state);
    globalVariableManager.rootView = self;

    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }else{
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }

    AnalyticsManager.init();

    if(Platform.OS === 'ios') {
      dispatch(AppStateActions_MiddleWare.getApiKeyGoogle())
        .then((result) => {
          UtilNative.setApiKeyGoogleMap(result.res.data.apiKey)
          self.setState({
            hasSetApiGoogleMap: true
          });
        })
        .catch((err) => {
          UtilNative.setApiKeyGoogleMap(Define.constants.apiKeyGoogleMap)
          self.setState({
            hasSetApiGoogleMap: true
          });
        });
    }


    if (!Define.constants.debug) {
      ErrorUtils.setGlobalHandler(this.handleException)
    }

    if(Platform.OS === 'android') {
      // RNHotUpdate.getVersion()
      //   .then((arg)=>{
      //     Define.constants.currentHybridVersion = arg.currentHybridVersion;
      //     Debug.log(Define.config.currentHybridVersion);
      //   })
        // fcm
      //Debug.log2('GcmAndroid.module.fcmToken : ',GcmAndroid.module.fcmToken)
      // console.log('GcmAndroid.module.fcmToken : ',GcmAndroid.module.fcmToken)
    //  Define.config.token = GcmAndroid.module.fcmToken;
      Define.config.waitToken = false;

      const memberToken = _.get(user, 'memberInfo.member.memberToken', '');
      if(memberToken) {
        dispatch(UserActions_MiddleWare.sentNotifyToken({memberToken: memberToken}));
      }
      // GcmAndroid.removeEventListener('notification');
      // GcmAndroid.addEventListener('notification', function(notification){
      //   Debug.log2('GCM receive notification', notification);
      //
      //   // GcmAndroid.applyBadgeCount(1);
      //   Vibration.vibrate([0, 500, 500]);
      //   var notifyFormat={
      //     _id:'',
      //     title:'',
      //     bigImgage:'',
      //     description:'',
      //     link:'',
      //     extras:{},
      //     createAt:0,
      //     expiredAt:0,
      //   }
      //   if (notification && notification.data && notification.data.title) {
      //
      //
      //     ToastAndroid.show('Thông báo: ' + notification.data.title , ToastAndroid.LONG);
      //     try{
      //       notification.data.extras = JSON.parse(notification.data.extras);
      //     }catch(ex){};
      //
      //     var temp = Util.dataProtectAndMap(notification.data, notifyFormat);
      //
      //     if (temp.link === 'OrderCreatedScreen') {
      //       temp.link = 'ServiceAvailableListContainer';
      //       temp.extras = {
      //         orderCreatedScreen: {
      //           ...temp.extras,
      //           time: Date.now()
      //         },
      //         serviceId: Define.constants.serviceOrderSystem[0],
      //         tabFocus: 1
      //       }
      //     }
      //
      //     if (temp.link === 'OrderSystemScreen') {
      //       temp.link = 'OrderSystemContainer';
      //       temp.extras = {
      //         orderSystemScreen: {
      //           ...temp.extras,
      //           time: Date.now()
      //         },
      //         time: Date.now(),
      //         serviceId: Define.constants.serviceOrderSystem[0]
      //       }
      //     }
      //
      //     if (temp.link==="WebRTC") {
      //       self.webRTCAppear = true;
      //       popupActions.setRenderContentAndShow(WebRTC, {
      //         roomId: temp.extras.roomId,
      //         userId: temp.extras.userId
      //       });
      //     }else {
      //       Notification.create({
      //         id: temp._id,
      //         subject: temp.title,
      //         message: temp.description,
      //         bigText : temp.description,
      //         smallIcon: 'ic_launcher',
      //         bigStyleUrlImgage :temp.bigImgage ? temp.bigImgage:undefined,
      //         autoClear: true,
      //         category : 'event',
      //         // sound :'default',
      //         sound:'default',
      //         vibrate :'default',
      //         lights :'default',
      //         payload: {
      //           time:Date.now(),
      //           deepLink:temp.link,
      //           extras:temp.extras,
      //         }
      //       });
      //     }
      //
      //
      //     if (temp.link !== 'WebRTC') {
      //       temp.notifiedAt = Date.now()
      //       dispatch(RDActions['Notify']['addOnRequest'](temp));
      //     }
      //
      //     self.fetchDataFromNotify(notification.data);
      //   }
      // });

      // Notification.addListener('press', function(e) {
      //   Debug.log('Notification:press',Debug.level.USER_TRACKER);
      //   if (self.processDeepLinkFromNotifyDone) {
      //     globalVariableManager.navigatorManager.handleNavigator(e.payload.deepLink,e.payload.extras);
      //     let _idSellect = -1;
      //     for (let i = 0; i < globalVariableManager.reduxManager.state.Notify.list.length; i++) {
      //       if(globalVariableManager.reduxManager.state.Notify.list[i].notifiedAt === e.payload.time) {
      //         _idSellect = globalVariableManager.reduxManager.state.Notify.list[i]._id;
      //         break;
      //       }
      //     }
      //
      //     if(_idSellect !== -1) {
      //         dispatch(RDActions['Notify']['removeOnRequest']({id:_idSellect}));
      //     }
      //   }
      //   else{
      //     self.startDeepLink = e.payload.deepLink;
      //     self.startExtras = e.payload.extras;
      //   }
      //
      // });
      // update task
      DeviceEventEmitter.addListener('HotUpdateManager:checkUpdate', (ev) => {
        Debug.log2('HotUpdateManager:checkUpdate', ev,Debug.level.USER_TRACKER);
      });
      DeviceEventEmitter.addListener('HotUpdateManager:checkUpdateDone', (arg) => {
        Debug.log2('HotUpdateManager:checkUpdateDone', arg,Debug.level.USER_TRACKER);
      });
      DeviceEventEmitter.addListener('HotUpdateManager:download', (ev) => {
        Debug.log2('HotUpdateManager:download', ev,Debug.level.USER_TRACKER);
      });
      var time2ShowToast = Date.now();
      DeviceEventEmitter.addListener('HotUpdateManager:downloading', (ev) => {
        Debug.log2('HotUpdateManager:downloading ', ev,Debug.level.USER_TRACKER);
        if (Date.now() - time2ShowToast > 1000) {
          if (Platform.OS==='android') {
            ToastAndroid.show('Update downloading '+ (Math.floor(ev.byte/1024)).toString() + ' kb' , ToastAndroid.SHORT);
          }
          time2ShowToast = Date.now();
        }
      });
      DeviceEventEmitter.addListener('HotUpdateManager:downloadDone', (ev) => {
        Debug.log2('HotUpdateManager:downloadDone', ev,Debug.level.USER_TRACKER);
      });
      DeviceEventEmitter.addListener('HotUpdateManager:updateDone', (arg) => {
        Debug.log2('HotUpdateManager:updateDone', arg,Debug.level.USER_TRACKER);
        if (Platform.OS==='android') {
          ToastAndroid.show('Update completed', ToastAndroid.SHORT)
        }
        if (!self.processUpdateInfoDone ) {
            self.processUpdateInfo(arg);
        }
      });
      //key
      BackHandler.addEventListener('hardwareBackPress',
         () => {
           appState = self.props.appState;
           var {navigator } = self.props;
           if (self.hideContentState) {
             globalVariableManager.rootView.hideContent(false);
           }
           if (popupActions.popPopup()) {
             return true;
           }
           else if(popupActions.getPopupStackSize(0)>0){
             popupActions.popPopup(0,true,0);
             return true;
           }
           else if (self.sideMenu && self.sideMenu.isOpen) {
             self.drawSideMenu(false);
             return true;
           }
           else if (!(appState.currentState === RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING)) {
             appSetting = globalVariableManager.reduxManager.state.AppSetting
             if (navigator.currentScreen.name !== 'FeedsScreenContainer' &&
                  navigator.currentScreen.name !== 'TemplateScreen' &&
                  navigator.currentScreen.name !== 'LoginScreen' &&
                  navigator.currentScreen.name !== 'HuntShipperScreen' &&
                  navigator.currentScreen.name !== 'SwitchModeScreen' &&
                  navigator.currentScreen.name !== 'ServiceAvailableListContainer' &&
                  navigator.currentScreen.name !== 'InstantOrderScreen'
                ) {
               if(Actions.pop()) {
                 return true;
               }else{
                  if (!self.backFlag) {
                    self.backFlag = true;
                    ToastAndroid.show('Nhấn Back một lần nữa để thoát ứng dụng', ToastAndroid.SHORT);
                    setTimeout(()=>{
                      self.backFlag = false;
                    },2000)
                  }else{
                    ToastAndroid.show('Cám ơn bạn đã sử dụng HeyU', ToastAndroid.LONG);
                    BackHandler.exitApp();
                  }
                 return true;
               }
             }
             else{
                if (!self.backFlag) {
                  self.backFlag = true;
                  ToastAndroid.show('Nhấn Back một lần nữa để thoát ứng dụng', ToastAndroid.SHORT);
                  setTimeout(()=>{
                    self.backFlag = false;
                  },2000)
                }else{
                  ToastAndroid.show('Cám ơn bạn đã sử dụng HeyU', ToastAndroid.LONG);
                  BackHandler.exitApp();
                }
                  return true;
              }
            }
            else{
                if(Platform.OS === 'android'){
                    ToastAndroid.show('Cám ơn bạn đã sử dụng HeyU', ToastAndroid.SHORT);
                  }
                BackHandler.exitApp();
               return true;
            }
           });

        DeviceEventEmitter.addListener('hardwareMenuPress', ()=>{
          if(globalVariableManager.reduxManager.state.Navigator.currentScreen.name !== 'LoginScreen' &&
              globalVariableManager.reduxManager.state.Navigator.currentScreen.name !== 'LoginByPhoneScreen' &&
              globalVariableManager.reduxManager.state.Navigator.currentScreen.name !== 'PhoneAuthenticationScreen' &&
              globalVariableManager.reduxManager.state.Navigator.currentScreen.name !== 'PolicyScreen' &&
              globalVariableManager.reduxManager.state.Navigator.currentScreen.name !== 'TutorialScreen'){
            self.drawSideMenu();
          }
        });
    } else {
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
      PushNotificationIOS.addEventListener('register', token => {
        Define.config.token = token;
        Define.config.waitToken = false;
        const memberToken = _.get(user, 'memberInfo.member.memberToken', '');
        if(memberToken) {
          dispatch(UserActions_MiddleWare.sentNotifyToken({memberToken: memberToken}));
        }
      });

      PushNotificationIOS
        .getInitialNotification()
        .then((notify) => {
          if(notify) {
            this.notifyManager(notify, true);
          }
        });

      PushNotificationIOS.addEventListener('registrationError', ()=>{});
      PushNotificationIOS.addEventListener('notification', this.notifyManager);
      PushNotificationIOS.addEventListener('localNotification', (notify) => {
        notify._alert = {
          title: 'HeyU',
          body: notify._alert
        }

        this.notifyManager(notify);
      });
    }

    // events
    NetInfo.addEventListener((connectionInfo)=>{
      Debug.log('Connection state change: ' + connectionInfo.type,Debug.level.USER_TRACKER); // NONE , WIFI, MOBILE
      dispatch(RDActions.ServerConnection.changeNetInfoOnRequest(connectionInfo.type));
    })

    AppState.addEventListener('change', self.handleAppStateChange);

    self.createScreen();
  },

  componentWillUnmount : function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    if(Platform.OS === 'android') {
      DeviceEventEmitter.removeListener('sysNotificationClick',this.onPressNotify);
    }

    popupActions.popAllPopup();
  },

  isDisableSideMenu() {
    let {navigator, appState, appSetting} = this.props;
    let currentSceneName = navigator.currentScreen.name;
    if(currentSceneName === 'LoginScreen'
    || currentSceneName === 'PolicyScreen'
    || currentSceneName === 'TutorialScreen'
    || currentSceneName === 'SwitchModeScreen'
    || currentSceneName === 'InstantOrderScreen'
    || currentSceneName === 'PhoneAuthenticationScreen'
    || currentSceneName === 'LoginByPhoneScreen'
    || appState.instantMode
  ) {
      return true;
    }

    return false;
  },
  sideMenuState: false,
  renderFormAlert: function(title, content, buttonTitle, onPress) {
    return (
      <Animatable.View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#226FB7'}}>
        <View style={{backgroundColor: '#fff', borderRadius: 4, margin: 15, paddingTop: 20}}>
          <View>
            <View style={[Themes.current.popup.titleWrap]}>
              <Text style={Themes.current.text.popupTitle}>{title}</Text>
            </View>
            <View style={{width: '100%', borderBottomWidth: 1, borderBottomColor: '#DCDEE1', padding: 10}}>
              <Text style={{left: 0, right: 0, color: '#000', margin: 5, alignSelf: 'center', textAlign: 'center'}}>{content}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor: '#fff', justifyContent: 'center', height: 45, borderRadius: 4,}}
          >
            <Text style={{alignSelf: 'center', marginLeft: 0, fontSize: 14, fontWeight: 'bold', color: '#1697B4'}}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  },
  renderContentAtLoading: function() {
    const {appState, dispatch} = this.props;
    let content = (
      <View
        pointerEvents={'auto'}
        style={[Themes.current.screen.bodyView,this.props.bodyStyle,{justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}]}>
        <Spinner type={'ThreeBounce'} color={Themes.current.factor.spinnerColor} />
      </View>
    );
    if(appState.config.forceUpdate.status) {
      content = this.renderFormAlert('CẬP NHẬT PHIÊN BẢN MỚI', appState.config.forceUpdate.message, 'CẬP NHẬT', () => {
        if (Platform.OS === 'android') {
          var url = appState.config.forceUpdate.url || 'https://play.google.com/store/apps/details?id=com.sanship.pro';
            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                // console.log('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL(url);
              }
            }).catch(err => console.error('An error occurred', err));
        } else {
          Linking.openURL(appState.config.forceUpdate.url || 'https://itunes.apple.com/vn/app/săn-ship/id1179627110?mt=8')
        }
      })
    } else if(appState.config.undermaintain.status) {
      content = this.renderFormAlert('THÔNG BÁO BẢO TRÌ', appState.config.undermaintain.message, 'THỬ LẠI', () => {
             this.getConfig();
      })
    } else if(appState.config.networkError) {
      content = this.renderFormAlert('LỖI MẠNG', 'Vui lòng kiểm tra lại kết nối mạng trước khi thử lại', 'THỬ LẠI', () => {
             this.getConfig();
      })
    } else if(appState.config.systemError) {
      content = this.renderFormAlert('LỖI', 'Hệ thống đang gặp sự cố vui lòng thử lại', 'THỬ LẠI', () => {
             this.getConfig();
      })
    }
    return content;
  },
  renderKeyboardDismiss: function() {
    let content = null;
    if(this.state.keyboardShow) {
      content = (
        <TouchableOpacity
          style={{position: 'absolute', bottom: Platform.OS === 'ios' ? this.heightKeyboard : 0, right: 0, zIndex: 100, flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 5, backgroundColor: '#c9ccd2' }}
          onPress={() => {
            Keyboard.dismiss()
          }}>
          <Icon name='ios-keypad' style={{fontSize: 20, lineHeight: 30, color: '#000', paddingHorizontal: 10, backgroundColor: 'transparent'}} />
          <Icon name='ios-arrow-down' style={{fontSize: 20, lineHeight: 30, color: '#000', paddingRight: 5, backgroundColor: 'transparent'}} />
        </TouchableOpacity>
      )
    }

    return content;
  },
  render:function(){
    var self= this;
    const { dispatch,state,appState, navigator, notify} = this.props;
    var content;
    if (appState.currentState === RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING || !this.state.hasSetApiGoogleMap || this.state.wakeByLocation) {
      return this.renderContentAtLoading();
    }else{
      content = (
        <SideMenu
            ref={(sideMenu)=>{this.sideMenu=sideMenu;}}
            onChange={(state)=>{
              Debug.log('SCTVFilmsSideMenu:'+state,Debug.level.USER_TRACKER)
              globalVariableManager.sideMenuMoving = false;
              self.sideMenuState=state;
              if (state) {
                popupActions.popAllPopup(0,true,0);

                self.updateSideMenu();

              } else {
                Keyboard.dismiss();
              }
            }}
            onMove={()=>{
              globalVariableManager.sideMenuMoving = true;
            }}
            openMenuOffset={Themes.current.factor.openSideMenuOffset}
            isOpen={self.sideMenuState}
            disableGestures={self.isDisableSideMenu()}
            menu={self.renderSideMenu()}>
          <this.RouterWithRedux
            navigator={this.ReduxNavigator}
            backAndroidHandler={()=>{}}
            sceneStyle={Themes.current.screen.appBackground}
            navigationBarStyle={Themes.current.screen.NavBar}
          />
        </SideMenu>
      )
    }

    return(
      <View renderToHardwareTextureAndroid={false} style={Themes.current.screen.appBackground}>
        <Animatable.View
          onStartShouldSetResponderCapture={()=>{
            if (self.hideContentState) {
              globalVariableManager.rootView.hideContent(false);
              return true;
            }
            return false;
          }}
          ref='contentView' style={{flex:1}}>
          {content}
        </Animatable.View>
        <View
          pointerEvents={'box-none'}
          style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        >
          <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} />
          <View pointerEvents={'box-none'} style={{flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
            <PopupManager rootView={self}/>
          </View>
          {!this.state.keyboardShow ? <SafeAreaView style={{flex: 0, backgroundColor: 'transparent'}} /> : null}
        </View>

        {appState.showLoading ?
          <View style={{position: 'absolute', alignItems:'center', justifyContent:'center', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0.4)'}}>
            <View style={{backgroundColor:'#fff', width:70, height:70, borderRadius:35, alignItems:'center', justifyContent:'center', elevation:2}}>
              <LottieView
                source={require('../../assets/Animation/animationLoading')} autoPlay loop />
              <Image
                source={Define.assets.Images.logoLogin}
                resizeMode={'stretch'}
                style={{width:30, height:30, position:'absolute'}}
              />
            </View>

          </View>
        :null}

        <Toast textStyle={{textAlign: 'center', color: '#fff'}} ref="toast"/>

        {this.renderKeyboardDismiss()}
      </View>
    )
  },
  UNSAFE_componentWillReceiveProps: function (nextProps) {
  },
  componentDidMount: function() {
    var self = this;
    var {dispatch} = self.props;
    if(Platform.OS === 'ios') {
      this
        .getRegion()
        .then(this.getConfig)
        .then(this.getConfigReview)
    } else {
      this
        .getRegion()
      this.getConfig()
        .then(this.getConfigReview)
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
     console.log(
       'Notification caused app to open from background state:',
       remoteMessage.notification,
     );
   });

   // Check whether an initial notification is available
   messaging()
     .getInitialNotification()
     .then(remoteMessage => {
       if (remoteMessage) {
         console.log(
           'Notification caused app to open from quit state:',
           remoteMessage.notification,
         );
       }
     });
  },
  componentDidCatch: function(e) {
    if (!Define.constants.debug) {
      Alert.alert(
        'Rất xin lỗi',
        'Đã có lỗi xảy ra trong quá trình hoạt động của ứng dụng. Chúng tôi sẽ khắc phục sớm nhất có thể. Ứng dụng cần được khởi động lại để có thể hoạt động. Xin cảm ơn.',
        [
            {
                text: "Khởi động lại",
                onPress: () => {
                  codePush.restartApp();
                },
            },
        ],
        { cancelable: false }
      );

      this.handleException(e, true);
    }
  }
})
/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
    appState:state.AppState,
    appSetting:state.AppSetting,
    navigator:state.Navigator,
    serverConnection:state.ServerConnection,
    user: state.User,
    notify: state.Notify,
    notifications: state.Notifications
  }
}

module.exports = connect(selectActions)(App);
