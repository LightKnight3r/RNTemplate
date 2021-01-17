
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
  Keyboard,
  TouchableOpacity,
  StatusBar,
  AppState,
  SafeAreaView
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
    this.translate = I18n.t(props.navigator.currentScreen.name);
    this.state = _.merge(this.state,
    {
      showChooseLanguage : 0,
      language: '',
      bottom: 0,
      username: '',
      password: ''
    })
    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.listLanguage = [
      {name: this.translate.textVi, code: 'vi'},
      {name: this.translate.textEn, code: 'en'},
      {name: this.translate.textZh, code: 'zh'}
    ]
  }

  onRefresh(){
    super.onRefresh();
    var {dispatch} = this.props;
  }

  onGetMore(){
    super.onGetMore();
    var {dispatch} = this.props;
  }

  keyboardWillShow(e) {
    const heightKeyboard = e.endCoordinates.height;
    if (Platform.OS === 'ios') {
      this.setState({
        bottom: heightKeyboard
      })
    }
  }

  keyboardWillHide(e) {
    if (Platform.OS === 'ios') {
      this.setState({
        bottom: 0
      })
    }
  }
  handleSubmit(){
    this.props.dispatch(UserActions_MiddleWare.login({username: this.state.username.toLowerCase(), password: this.state.password}))
    .then(res=>{
      this.handleAfterLogin()
    })
    .catch(err=>{
      Actions.pop()
    })
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
    let languageSelected = _.find(this.listLanguage, {code: appSetting.language})
    content = (
      <View style={{flex:1, backgroundColor:'#fff' , marginBottom: this.state.bottom}}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{position:'absolute', right: 10, height: 40, width:150, borderWidth:0.5, borderRadius: 4, top: 6, zIndex: 10, borderColor:'#E8F6F6'}}>
            <TouchableOpacity 
              onPress={() => { this.setState({showChooseLanguage: !this.state.showChooseLanguage}) }}
              style={{justifyContent:'center', flex: 1, backgroundColor:'#E8F6F6'}}>
              <Include.Text style={{marginLeft: 6}}>{appSetting.language ? languageSelected.name : this.translate.textChooseLanguage}</Include.Text>
            </TouchableOpacity>
          </View>
          {this.state.showChooseLanguage ?
          <View style={{position:'absolute', backgroundColor:'#E8F6F6', right: 10, width:150, borderWidth:0.5, borderRadius: 6, top: 56, zIndex: 10, borderColor:'#E8F6F6'}}>
            {this.listLanguage.map(item => {
              return(
                <TouchableOpacity 
                  style={{height:30, borderBottomWidth: 2, borderColor:'#fff', justifyContent:'center'}}
                  onPress={() => {
                    this.setState({showChooseLanguage: 0, language: item.name}) 
                    popupActions.setRenderContentAndShow(DefaultPopup,{
                      title: this.translate.noti,
                      description: this.translate.desNoti,
                      buttonTitle:'OK',
                      onPress:() => {
                        dispatch(RDActions.AppSetting.switchLanguage(item.code))
                        popupActions.popPopup();
                        setTimeout(() => {
                          CodePush.restartApp();
                        }, 300);
                      }
                    })
                  }}>
                  <Include.Text style={{marginLeft: 6}}>{item.name}</Include.Text>
                </TouchableOpacity>
              )
            })}
          </View>
          :null}
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

              <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Include.Text style={{fontSize: 32, color:'#1697B4'}}>{this.translate.greeting}</Include.Text>
                <Include.Text style={{fontSize: 18, color:'#707070'}}>{this.translate.instruction}</Include.Text>
              </View>
          </Animatable.View>
          <View style ={{alignItems:'center', flex: 1, paddingBottom:15}}>
            <Include.TextInput
              style={{ backgroundColor: '#E8F6F6', fontSize: 15, height: 60, width: '80%', color: '#000', paddingLeft: 20, marginBottom: 4, borderRadius: 8}}
              autoFocus={true}
              placeholder= {this.translate.username}
              textContentType= {'username'}
              underlineColorAndroid='transparent'
              placeholderTextColor="#bababa"
              onChangeText={note =>
                this.setState({ username: note })
              }
            />
            <Include.TextInput
              style={{ backgroundColor: '#E8F6F6', fontSize: 15, height: 60, width: '80%', color: '#000', paddingLeft: 20, borderRadius: 8}}
              placeholder= {this.translate.password}
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              textContentType= {'password'}
              placeholderTextColor="#bababa"
              onChangeText={note =>
                this.setState({ password: note })
              }
            />
            <TouchableOpacity 
              onPress={()=>{
                Keyboard.dismiss()
                this.handleSubmit()}}>
              <LinearGradient
                {...Themes.current.linearConfig}
                style={{ flexDirection:'row', borderRadius: 25, height: 50,  backgroundColor:appSetting.language === 'en' ? null : 'grey', alignItems: 'center', justifyContent: 'center', width: 280,marginTop: 20}}>
                <Include.Image source={Define.assets.Images.phoneLogin}
                  resizeMode={'stretch'}
                  style={{width: 40, height: 40, marginLeft:5}} />
                  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Include.Text style={{color: '#fff', fontSize:16, backgroundColor:'transparent'}}>
                      {this.translate.login}
                    </Include.Text>
                  </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {this.renderAutoLogin()}
      </View>
    );
    return content;
  }

  handleAfterLogin(info) {
    const {appSetting, dispatch, user} = this.props;
    if (!info || !info?.res) {
      const inf = {
        res: info || user?.memberInfo
      };
      info = inf;
    }
    let screenName = 'HomeScreen';
    let optionsScene = {
      type: 'reset'
    };

    if(!info?.res?.data?.name) {
      screenName = 'HomeScreen';
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

  UNSAFE_componentWillMount() {
    super.UNSAFE_componentWillMount()
    var {dispatch,user,appSetting} = this.props;
    const token = _.get(user, 'memberInfo.token', '');
    if (token) {
      this.setState({
        reLogin: true
      })

      dispatch(UserActions_MiddleWare.getInfo())
      .then(this.handleAfterLogin())
      .catch(err => {
        this.setState({
          reLogin: false
        })
      });
    }
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    } else {
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
  }

  componentWillUnmount(){
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    } else {
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
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
