
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Button,
  Image,
  ActivityIndicator ,
  Modal,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  StatusBar,
  AppState
} from 'react-native';

var {Actions} = require('react-native-router-flux');
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";

//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');
var StatusBarAndroid = require('react-native-android-statusbar');
var I18n = require('../../Util/i18n');
import CodePush from 'react-native-code-push';

var {popupActions} = require('../popups/PopupManager');
var {globalVariableManager}= require('../modules/GlobalVariableManager');
import AnalyticsManager from '../modules/Analytics';
var locationManager = require('../modules/LocationManager');

var ButtonWrap = require('../elements/ButtonWrap');
var RDActions = require( '../../actions/RDActions');
//screens
import Screen from './Screen'

// popups
import DefaultPopup from '../popups/DefaultPopup'
import NoNetworkPopup from '../popups/NoNetworkPopup'

// actions
import UserActions_MiddleWare from '../../actions/UserActions_MiddleWare'
import AppStateActions_MiddleWare from '../../actions/AppStateActions_MiddleWare'

//variable

// var styles = StyleSheet.create({
//
// })

//

class LoginScreen extends Screen{
  static componentName = 'LoginScreen'
  static sceneConfig ={
    ...Screen.sceneConfig,
    hideNavBar: true
  }
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {})
    this.handleNavigateScreen = this.handleNavigateScreen.bind(this);
  }
  // static renderRightButton(scene){
  //   return (
  //     <View style={Themes.current.screen.rightButtonWrapNavBar}>
  //       <Include.Text>RightButton</Include.Text>
  //     </View>
  //   )
  // }
  // static renderLeftButton(scene){
  //   return (
  //     <View style={Themes.current.screen.leftButtonWrapNavBar}>
  //       <Include.Text>LeftButton</Include.Text>
  //     </View>
  //   )
  // }
  // static renderTitle(scene){
  //   return(
  //     <View style={Themes.current.screen.titleWrapNavBarCenter}>
  //       <Include.Text style={Themes.current.text.navBartitle}>title</Include.Text>
  //     </View>
  //   )
  // }

  onRefresh(){
    super.onRefresh();
    var {dispatch} = this.props;
  }

  onGetMore(){
    super.onGetMore();
    var {dispatch} = this.props;
  }



  renderAutoLogin() {
    let content = null;

    if(this.state.reLogin) {
      content = (
        <View style={{position: 'absolute', alignItems:'center', justifyContent:'center', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0.4)'}}>
          <View style={{backgroundColor:'#fff', width:70, height:70, borderRadius:35, alignItems:'center', justifyContent:'center', elevation:2}}>
            <LottieView
              source={require('../../../assets/Animation/animationLoading')} autoPlay loop />
            <Image
              source={Define.assets.Images.logoLogin}
              resizeMode={'stretch'}
              style={{width:30, height:30, position:'absolute'}}
            />
          </View>

          <View
            style={{marginTop: 10}}>
            <Include.Text style={{fontSize: 18, color: '#1e1e1e', fontStyle: 'italic'}}>Đang đăng nhập lại...</Include.Text>
          </View>
        </View>
      )
    }

    return content;
  }
  renderScreenContent(){
    var {dispatch, user,tips, appState, appSetting} = this.props;
    var content = null;

    content = (
      <View style={{flex:1, backgroundColor:'#fff', paddingTop:Platform.OS === 'ios'?0:StatusBar.currentHeight}}>
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <Animatable.View
            animation="zoomIn"
            easing="linear"
            duration={1500}
            style={{
                justifyContent:'center',
                alignItems:'center',
                flex: 1
              }}>

              <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingTop: 20}}>
                <Include.Image source={Define.assets.Images.logoLogin}
                  resizeMode={'stretch'}
                  style={{width: 70, height: 70}} />
                <Include.Text style={{fontSize: 25, color:'#07BDA1'}}>RNTemplate</Include.Text>
              </View>
          </Animatable.View>
          <Animatable.View
            animation="zoomIn"
            easing="linear"
            duration={1500}
            style={{
                justifyContent:'center',
                alignItems:'center',
                flex: 1,
                paddingBottom:15
              }}>

              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Include.Text style={{fontSize: 32, color:'#1697B4'}}>{I18n.t('LoginScreen').greeting}</Include.Text>
                <Include.Text style={{fontSize: 18, color:'#707070'}}>{I18n.t('LoginScreen').instruction}</Include.Text>
              </View>
          </Animatable.View>
            <Animatable.View
              animation="fadeIn"
              easing="linear"
              duration={1500}
              style={{
                  justifyContent:'center',
                  alignItems:'center',
                  flex: 1
                }}>
            <TouchableOpacity
              onPress={() => {
                if(appSetting.language !== 'en') {
                  popupActions.setRenderContentAndShow(DefaultPopup,{
                    title: 'Thông báo',
                    description:'Khởi động lại để áp dụng ngôn ngữ',
                    buttonTitle:'OK',
                    onPress:() => {
                      dispatch(RDActions.AppSetting.switchLanguage('en'))
                      popupActions.popPopup();
                      setTimeout(() => {
                        CodePush.restartApp();
                      }, 300);
                    }
                  })

                }
              }}
              delayLongPress={4000}
              onLongPress={()=>{

              }}>
              <LinearGradient
                {...Themes.current.linearConfig}
                style={{ flexDirection:'row', borderRadius: 25, height: 50,  backgroundColor:appSetting.language === 'en' ? null : 'grey', alignItems: 'center', justifyContent: 'center', width: 280,marginTop: 20}}>
                  <Include.Image source={Define.assets.Images.phoneLogin}
                  resizeMode={'stretch'}
                  style={{width: 40, height: 40, marginLeft:5}} />
                  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Include.Text style={{color: '#fff', fontSize:16, backgroundColor:'transparent'}}>
                      {I18n.t('LoginScreen').textEn}
                    </Include.Text>
                  </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
            <Animatable.View
              animation="fadeIn"
              easing="linear"
              duration={1500}
              style={{
                  justifyContent:'center',
                  alignItems:'center',
                  flex: 1
                }}>
            <TouchableOpacity
              onPress={() => {
                if(appSetting.language !== 'vi') {
                  popupActions.setRenderContentAndShow(DefaultPopup,{
                    title: 'Alert',
                    description:'Reload to apply language',
                    buttonTitle:'OK',
                    onPress:() => {
                      dispatch(RDActions.AppSetting.switchLanguage('vi'))
                      popupActions.popPopup();
                      setTimeout(() => {
                        CodePush.restartApp();
                      }, 300);
                    }
                  })
                }
              }}
              delayLongPress={4000}
              onLongPress={()=>{

              }}>
              <LinearGradient
                {...Themes.current.linearConfig}
                style={{ flexDirection:'row', backgroundColor:appSetting.language === 'vi' ? null : 'grey', borderRadius: 25, height: 50, alignItems: 'center', justifyContent: 'center', width: 280,marginTop: 20}}>
                  <Include.Image source={Define.assets.Images.phoneLogin}
                  resizeMode={'stretch'}
                  style={{width: 40, height: 40, marginLeft:5}} />
                  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Include.Text style={{color: '#fff', fontSize:16, backgroundColor:'transparent'}}>
                      {I18n.t('LoginScreen').textVi}
                    </Include.Text>
                  </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
            <Animatable.View
              animation="fadeIn"
              easing="linear"
              duration={1500}
              style={{
                  justifyContent:'center',
                  alignItems:'center',
                  flex: 1
                }}>
            <TouchableOpacity
              onPress={() => {
                if(appSetting.language !== 'zh') {
                  popupActions.setRenderContentAndShow(DefaultPopup,{
                    title: '警报',
                    description:'重新加载以应用语言',
                    buttonTitle:'好',
                    onPress:() => {
                      dispatch(RDActions.AppSetting.switchLanguage('zh'))
                      popupActions.popPopup();
                      setTimeout(() => {
                        CodePush.restartApp();
                      }, 300);
                    }
                  })
                }
              }}
              delayLongPress={4000}
              onLongPress={()=>{

              }}>
              <LinearGradient
                {...Themes.current.linearConfig}
                style={{ flexDirection:'row', backgroundColor:appSetting.language === 'vi' ? null : 'grey', borderRadius: 25, height: 50, alignItems: 'center', justifyContent: 'center', width: 280,marginTop: 20}}>
                  <Include.Image source={Define.assets.Images.phoneLogin}
                  resizeMode={'stretch'}
                  style={{width: 40, height: 40, marginLeft:5}} />
                  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Include.Text style={{color: '#fff', fontSize:16, backgroundColor:'transparent'}}>
                      {I18n.t('LoginScreen').textZh}
                    </Include.Text>
                  </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <View>
          <Include.Image source={Define.assets.Images.imageLogin}
            resizeMode={'stretch'}
            style={{width: Define.constants.widthScreen, height: Define.constants.widthScreen/3.46, alignSelf:'center'}} />
        </View>

        {this.renderAutoLogin()}
      </View>
    );
    return content;
  }


  handleNavigateScreen(info,needTurnOnLocation) {
    const {appSetting, dispatch, user} = this.props;
    if (!info || !info?.res) {
      const inf = {
        res: info || user?.memberInfo
      };
      info = inf;
    }
    let screenName = 'SwitchModeScreen';
    let optionsScene = {
      type: 'reset'
    };

    if(!info?.res?.member?.facebook?.name) {
      screenName = 'PolicyScreen';
    } else if(appSetting.mode === 'shipper' && appSetting.regionNew && !needTurnOnLocation) {
      screenName = 'FeedsScreenContainer'
    } else if(appSetting.mode === 'shop' && appSetting.regionNew && !needTurnOnLocation) {
      screenName = 'ServiceAvailableListContainer'
    }
    dispatch(RDActions['AppState']['showLoadingOnRequest']({show:false}))
    Actions[screenName](optionsScene);
  }

  handleAppStateChange = (newState) => {
    switch (newState) {
      case 'active':
        break;
      case 'background':
        break;
      default:
        break;
    }
  }

  componentDidMount(){
    super.componentDidMount();

    StatusBar.setBarStyle('dark-content');
  }
  componentWillUnmount(){
    StatusBar.setBarStyle('light-content');

    AppState.removeEventListener('change', this.handleAppStateChange);
  }
}


/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  // console.log(state)
  return {
    navigator: state.Navigator,
    user: state.User,
    tips:state.Tips,
    appState: state.AppState,
    appSetting: state.AppSetting
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(LoginScreen);
