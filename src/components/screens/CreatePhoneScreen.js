
var _ = require('lodash')

//LIB
import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

var { Actions } = require('react-native-router-flux');
import { connect } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import LinearGradient from 'react-native-linear-gradient';
//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');
var I18n = require('../../Util/i18n');

var { popupActions } = require('../popups/PopupManager');
var { globalVariableManager } = require('../modules/GlobalVariableManager');

var ButtonWrap = require('../elements/ButtonWrap');

//screens
import Screen from './Screen'

// popups
import DefaultPopup from '../popups/DefaultPopup';

// actions

//variable

// var styles = StyleSheet.create({
//
// })

//
var heightScreen = Dimensions.get('window').height;

class CreatePhoneScreen extends Screen {
  static componentName = 'CreatePhoneScreen'
  static sceneConfig = {
    ...Screen.sceneConfig
  }
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props) {
    super(props);
    this.translate = I18n.t("CreatePhoneScreen");
    this.state = _.merge(this.state,
      { 
        phone: '',
        bottom: 0
     })
     this.handleSubmit = this.handleSubmit.bind(this)
     this.keyboardWillShow = this.keyboardWillShow.bind(this)
     this.keyboardWillHide = this.keyboardWillHide.bind(this)
  }

  // static renderLeftButton(scene){
  //   return (
  //     <View style={Themes.current.screen.leftButtonWrapNavBar}>
  //       <Include.Text>LeftButton</Include.Text>
  //     </View>
  //   )
  // }
  // static renderRightButton(scene){
  //   return (
  //     <View style={Themes.current.screen.rightButtonWrapNavBar}>
  //       <Include.Text>RightButton</Include.Text>
  //     </View>
  //   )
  // }
  static renderTitle(scene) {
    return (
      <View style={Themes.current.screen.titleWrapNavBarCenter}>
        <Include.Text style={Themes.current.text.navBartitle}>{I18n.t(scene.title).title}</Include.Text>
      </View>
    )
  }

  onRefresh() {
    super.onRefresh();
    var { dispatch } = this.props;
  }

  onGetMore() {
    super.onGetMore();
    var { dispatch } = this.props;
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

  handleSubmit() {
    Actions.CreateStoreScreen({ phone: this.state.phone })
    Keyboard.dismiss()
  }

  renderBtn() {
    if (this.state.phone) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.handleSubmit()
          }}>
          <LinearGradient
            {...Themes.current.linearConfig}
            style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute', bottom: this.state.bottom }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Include.Text style={{ color: '#fff', fontSize: 16, backgroundColor: 'transparent' }}>
                {this.translate.continue}
              </Include.Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )
    } return null
  }

  renderScreenContent() {
    var { dispatch } = this.props;
    var content = null;
    content = (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        <View style={{ paddingHorizontal: 10, flex: 1, marginTop: heightScreen / 6 }}>
          <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600', alignSelf: 'center', marginBottom: 10 }}>{this.translate.phone}</Include.Text>
          <PhoneInput
            containerStyle={{ alignSelf: 'center', width: '86%' }}
            disableArrowIcon={false}
            defaultCode="CN"
            layout="first"
            onChangeFormattedText={phone =>
              this.setState({phone})
            }
            withDarkTheme
            withShadow
          />
        </View>
        {this.renderBtn()}
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
      </View>
    )
    return content;
  }
  componentDidMount() {
    super.componentDidMount();
  }

  UNSAFE_componentWillMount() {
    super.UNSAFE_componentWillMount()
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    } else {
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
  }
  componentWillUnmount(){
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    } else {
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
  }
}


/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
    navigator: state.Navigator,
  }
}

export default connect(selectActions, undefined, undefined, { withRef: true })(CreatePhoneScreen);
