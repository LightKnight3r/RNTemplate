
var ExtraDimensions = require('react-native-extra-dimensions-android');
var DeviceInfo = require('react-native-device-info');

import {
  Dimensions, Platform,PixelRatio, StatusBar
} from 'react-native';

var PlatformConfig = require('./PlatformConfig');
var RNFS = require('react-native-fs');
//variable
var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

var screenSizeByInch = Math.sqrt(Math.pow(widthScreen,2) + Math.pow(heightScreen,2))  / (PixelRatio.get()*160) * 2;

var assets={
  Home:{
    home_icon_menu : require('../assets/Home/home_icon_menu.png'),
  },
  Menu:{
    icon_back:  require('../assets/Menu/icon_back.png'),
  },
  Images:{
  },
  Button:{
    fb: require('../assets/Button/fb.png'),
    huongdan: require('../assets/Button/huongdan.png'),
  },
  Animation:{
    animationLoading: require('../assets/Animation/animationLoading.json')
  }
}

var mapAssets={
}


var Define = {
  assets: (__DEV__ || Platform.OS === 'ios')? assets:PlatformConfig.default.processAsset(assets,mapAssets),
  constants:{
    hybridVersion: PlatformConfig.default.hybridVersion,
    heightOfStatusBarAndroid : 0,
    heightOfSoftMenuBarAndroid: 0,
    availableHeightScreen: heightScreen,
    widthScreen:widthScreen,
    heightScreen:heightScreen,
    screenSizeByInch:screenSizeByInch,
    deviceId:DeviceInfo.getUniqueID(),

    nativeVersion:DeviceInfo.getBuildNumber(),
    currentHybridVersion:0,

    imageThumbRate:(20/9),
    smallImageThumbRate:(9/6),
    videoHeight:widthScreen<heightScreen?widthScreen:heightScreen,
    videoWidth:widthScreen<heightScreen? heightScreen:widthScreen,

    fontScale : Math.floor(4),

    navBarHeight: Platform.OS === 'android' ? 70 : PlatformConfig.default.navBarHeight,
    X : (widthScreen<heightScreen? widthScreen : heightScreen)/ ((screenSizeByInch<7)?9.25:12) ,
    serverAddr :'http://localhost:8000',
    proxyAddr: 'http://localhost:3000',

    apiVersion:2,

    serverApiToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicGFzc3dvcmQiOiJzaGVlcDEyMzQ1Njc4IiwiaWF0IjoxNDc0OTcwMzc3fQ.38hjO99PEhzk1IT8l16zbKemikhPHHAqZzsSw8lmWtE',
    apiKeyGoogleMap: 'AIzaSyBIidO3qxiwdjdX_GT1fLRvfGM8E8D4WIc',
    googleIDTrack: 'UA-87788343-1',
    font:PlatformConfig.font,
    fontBold:PlatformConfig.fontBold,
    dataBase:'database.db',
    // crashLog: RNFS.DocumentDirectoryPath + '/CrashLog.txt',
    // trackingLog: RNFS.DocumentDirectoryPath + '/TrackingLog.txt',
    alarmListTable:'AlarmList',
    footballTeamsTable:'FootballTeams',
    signoutBeforeDisconnect:true,
    accountTest:{
      user:'',   // TODO : must = '' when release
      pass:'',
    },
    getMoreHeight:100,
    getMoreHeightMin:1,
    timeoutToHideContent:5000,
    timeoutToHideContent2:10000,
    elevation:3,
    periodOfAccelerometer:1000,
    requestTimeout:26000,
    debug:true,  // must false in release
    debugStyle:false,
    review:false,
    debugTrackerLogLength:166,
    logLevel:10,  // must be 10 when release
    funnyMode:false,
    timeIntervalOrder: 1000,
    timeIntervalComment: 3000,
    defaultLocation: {
      latitude: 21.00540294210722,
      longitude: 105.8455963432789
    },
    defaultLocationDelta: {
      latitudeDelta: 0.0072,
      longitudeDelta: 0.0081,
    },
    defaultLocationDeltaShowShipper: {
      latitudeDelta: 0.06,
      longitudeDelta: 0.04,
    }
  },
  config:{
    properties:{
      dtid: "0",
      spid: "0",
    },
    currentHybridVersion:0,
    waitToken: true,
    token: '',
    voipToken: ''
  },
  init:function(cb=()=>{}){
    var self = this;

    if (Platform.OS === 'android') {
        self.constants.heightOfStatusBarAndroid = StatusBar.currentHeight;
        self.constants.heightOfSoftMenuBarAndroid = screenHeight-heightScreen;

        self.constants.availableHeightScreen= heightScreen-StatusBar.currentHeight;
    }

    if (self.constants.debug) {
      self.assets = assets;
    }

    var assetsContent={};
    if (Platform.OS === 'android') {
      // get a list of files and directories in the main bundle
      RNFS.readDir(RNFS.DocumentDirectoryPath+'/ASSETS')
        .then((result) => {
          result.forEach((current)=>{
            try{
              var fileNameArray = current.name.split('.');
              assetsContent[fileNameArray[0]] = current;
            }
            catch(ex){}
          })
          self.assets = PlatformConfig.default.processAsset(assets,mapAssets,assetsContent);
          return Promise.reject();
        })
      .catch(()=>{
        if (cb && typeof cb === 'function') {
          cb();
        }
      })
    } else if(Platform.OS === 'ios') {
      if (cb && typeof cb === 'function') {
        return cb();
      }

      const path = 'file://'+RNFS.DocumentDirectoryPath+'/assets';
      RNFS.exists(path)
        .then((isExist) => {
          if(isExist) {
            self.assets = PlatformConfig.default.processAsset(assets,mapAssets, 'assets', true);
          }
          return Promise.reject();
        })
        .catch(()=>{
          if (cb && typeof cb === 'function') {
            cb();
          }
        })
    }
    return self;
  },
};

module.exports = Define;
