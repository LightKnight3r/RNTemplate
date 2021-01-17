
var _ = require('lodash')

//LIB
import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

var { Actions } = require('react-native-router-flux');
import { connect } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Toast } from 'native-base';
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
var uploadFileManager = require('../modules/UploadFileManager');

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
const STEP = {
  START_CREATE: 0,
  HAS_INFO: 1,
}
class CreateStoreScreen extends Screen {
  static componentName = 'CreateStoreScreen'
  static sceneConfig = {
    ...Screen.sceneConfig
  }
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props) {
    super(props);
    this.translate = I18n.t("CreateStoreScreen");
    this.state = _.merge(this.state,
      {
        step: STEP.START_CREATE,
        bottom: 0,
        nameStore: '',
        address: '',
        idBank: '',
        cardHolder: '',
        nameBank: '',
        contact: [],
        note: '',
        hasWechat: 0,
        hasAli: 0,
        wechat: '',
        ali: '',
        portrait: {},
        idCardFront: {},
        idCardBackSide: {},
        imageStore: {},
      })

    this.idImg = '';
    this.uploadSuccess = true;
    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  onRefresh() {
    super.onRefresh();
    var { dispatch } = this.props;
  }

  onGetMore() {
    super.onGetMore();
    var { dispatch } = this.props;
  }

  uploadFile(response, item) {
    this.idImg = `SS_${Date.now()}`;
    uploadFileManager.addFile(this.idImg, 'local', response.sourceURL);

    this.uploadSuccess = false;
    const dataUpload = {
      fileUpload: response.sourceURL,
      folder: 'qc-mobile',
      id: this.idImg,
    }
    uploadFileManager.upload(dataUpload)
      .then((result) => {
        const imageName = `${Define.constants.serverMediaAddr}${result.res.filename}`;
        this.uploadSuccess = true;
        this.setState({
          [item]: { id: this.idImg, link: imageName }
        });
      })
      .catch((err) => {
        this.setState({ [item]: '' });
      })
  }

  declineFile(item) {
    globalVariableManager.rootView.showToast(this.translate.errUpload)
    let id = this.state[item].id
    uploadFileManager.declineFile(id)
      .then(res => {
        this.setState({ [item]: {} })
      })
      .catch(err => {
        globalVariableManager.rootView.showToast(this.translate.errUpload);
      })
  }

  selectPhotoTapped(item) {
    this.setState({ deleteImage: 0 })
    const options = {
      quality: 0.5,
      maxWidth: 1500,
      maxHeight: 1500,
      title: `${this.translate.titleUpImage}`,
      chooseFromLibraryButtonTitle: `${this.translate.fromLib}`,
      takePhotoButtonTitle: `${this.translate.takeImage}`,
      cancelButtonTitle: `${this.translate.cancel}`,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    // ImagePicker.showImagePicker(options, (response) => {
    //   Debug.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   }
    //   else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   }
    //   else {
    //     this.uploadFile(response, item);
    //   }
    // });
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(response => {
      this.uploadFile(response, item);
    });

  }

  renderInfoStore() {
    if (this.state.step === STEP.START_CREATE) {
      return (
        <Include.ScrollView style={[Themes.current.screen.bodyView, this.props.bodyStyle, { flex: 1, marginBottom: this.state.bottom > 0 ? this.state.bottom + 8 : this.state.bottom, paddingTop: 20 }]}>
          <Include.Text>{this.translate.phone}: {this.props.phone}</Include.Text>
          <View style={{ paddingHorizontal: 10, justifyContent: 'center', marginBottom: 10 }}>
            <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600', marginBottom: 6 }}>{this.translate.name}</Include.Text>
            <Include.TextInput
              style={{ backgroundColor: '#E8F6F6', fontSize: 15, height: 40, width: '86%', color: '#000', alignSelf: 'center' }}
              autoFocus={true}
              placeholder={this.translate.username}
              underlineColorAndroid='transparent'
              placeholderTextColor="#bababa"
              onChangeText={nameStore =>
                this.setState({ nameStore })
              }
            />
          </View>
          <View style={{ paddingHorizontal: 10, justifyContent: 'center', marginBottom: 10 }}>
            <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600', marginBottom: 6 }}>{this.translate.address}</Include.Text>
            <Include.TextInput
              style={{
                backgroundColor: '#E8F6F6', fontSize: 15, height: 40, width: '86%', color: '#000', alignSelf: 'center',
              }}
              placeholder={this.translate.username}
              underlineColorAndroid='transparent'
              placeholderTextColor="#bababa"
              onChangeText={address =>
                this.setState({ address })
              }
            />
          </View>
          <View style={{ paddingHorizontal: 10, justifyContent: 'center', marginBottom: 10 }}>
            <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600', marginBottom: 6 }}>{this.translate.banking}</Include.Text>
            <View style={{ width: '86%', alignSelf: 'center', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Include.Text style={{ width: '36%' }}>{this.translate.stk}: </Include.Text>
                <Include.TextInput
                  style={{
                    backgroundColor: '#E8F6F6', fontSize: 15, height: 40, flex: 1, color: '#000',
                  }}
                  placeholder={this.translate.username}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  placeholderTextColor="#bababa"
                  onChangeText={idBank =>
                    this.setState({ idBank })
                  }
                />
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Include.Text style={{ width: '36%' }}>{this.translate.cardHolder}: </Include.Text>
                <Include.TextInput
                  style={{
                    backgroundColor: '#E8F6F6', fontSize: 15, height: 40, flex: 1, color: '#000', right: 0
                  }}
                  placeholder={this.translate.username}
                  underlineColorAndroid='transparent'
                  placeholderTextColor="#bababa"
                  onChangeText={cardHolder =>
                    this.setState({ cardHolder })
                  }
                />
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <Include.Text style={{ width: '36%' }}>{this.translate.infoBank}: </Include.Text>
                <Include.TextInput
                  style={{
                    backgroundColor: '#E8F6F6', fontSize: 15, height: 40, flex: 1, color: '#000',
                  }}
                  placeholder={this.translate.username}
                  underlineColorAndroid='transparent'
                  placeholderTextColor="#bababa"
                  onChangeText={nameBank =>
                    this.setState({ nameBank })
                  }
                />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
            <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600', marginBottom: 6 }}>{this.translate.contact}</Include.Text>
            <View style={{ width: '86%', alignSelf: 'center' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', marginBottom: 4 }}
                onPress={() => {
                  this.setState({ hasWechat: !this.state.hasWechat })

                }}>
                <View style={{ width: 16, height: 16, borderWidth: 1, borderColor: this.state.hasWechat ? '#16a596' : '#000', marginRight: 12 }}>
                  {this.state.hasWechat ?
                    <Icon name='checkmark' style={{ fontSize: 20, color: '#16a596', backgroundColor: 'transparent', alignSelf: 'center', marginTop: -4 }} />
                    : null}
                </View>
                <Include.Text>{this.translate.wechat}</Include.Text>
              </TouchableOpacity>
              {this.state.hasWechat ?
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginBottom: 6 }}>
                  <Include.TextInput
                    style={{
                      backgroundColor: '#E8F6F6', fontSize: 15, height: 40, flex: 1, color: '#000',
                    }}
                    placeholder={this.translate.username}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#bababa"
                    onChangeText={wechat =>
                      this.setState({ wechat })
                    }
                  />
                </View>
                : null}
              <TouchableOpacity
                style={{ flexDirection: 'row', marginBottom: 4 }}
                onPress={() => {
                  this.setState({ hasAli: !this.state.hasAli })
                }}>
                <View style={{ width: 16, height: 16, borderWidth: 1, borderColor: this.state.hasAli ? '#16a596' : '#000', marginRight: 12 }}>
                  {this.state.hasAli ?
                    <Icon name='checkmark' style={{ fontSize: 20, color: '#16a596', backgroundColor: 'transparent', alignSelf: 'center', marginTop: -4 }} />
                    : null}
                </View>
                <Include.Text>{this.translate.aliwang}</Include.Text>
              </TouchableOpacity>
              {this.state.hasAli ?
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginBottom: 10 }}>
                  <Include.TextInput
                    style={{
                      backgroundColor: '#E8F6F6', fontSize: 15, height: 40, flex: 1, color: '#000',
                    }}
                    placeholder={this.translate.username}
                    underlineColorAndroid='transparent'
                    placeholderTextColor="#bababa"
                    onChangeText={ali =>
                      this.setState({ ali })
                    }
                  />
                </View>
                : null}
            </View>
          </View>
        </Include.ScrollView>
      )
    }
    return null
  }
  renderImage() {
    if (this.state.nameStore && this.state.address && !this.state.idBank && !this.state.cardHolder && !this.state.nameBank && !this.state.contact.length && this.state.step === STEP.HAS_INFO) {
      return (
        <Include.ScrollView
          style={[Themes.current.screen.bodyView, this.props.bodyStyle, { flex: 1 }]}
          refreshing={false}
          onRefresh={this.onRefresh}
          onGetMore={this.onGetMore}
        >
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
              <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600' }}>{this.translate.imageFace}</Include.Text>
              {!this.state.portrait.id ?
                <TouchableOpacity
                  onPress={() => { this.selectPhotoTapped('portrait') }}
                  style={{ alignItems: 'center', marginVertical: 5, borderWidth: 1, alignSelf: 'center', borderRadius: 4, width: Define.constants.widthScreen * 0.5, height: 50, justifyContent: 'center', borderColor: '#16a596', flexDirection: 'row' }}
                >
                  <Include.Text style={{ color: '#828282', alignSelf: 'center', fontSize: 15, left: 10 }}>{this.translate.pickImage}</Include.Text>
                </TouchableOpacity>
                :
                <View>
                  <View style={{ marginTop: 10, alignSelf: 'center', width: 50, borderRadius: 4, height: 50, borderWidth: 1, borderColor: '#CCCCCC', opacity: this.uploadSuccess ? 1 : 0.5 }}>
                    {!this.uploadSuccess ?
                      <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: Platform.OS === 'ios' ? 1 : null, justifyContent: 'center', alignItems: 'center', elevation: 2 }}>
                        <ActivityIndicator size={'large'} />
                      </View> : null
                    }
                    <Image
                      source={{ uri: this.state.portrait.link }}
                      style={{
                        borderRadius: 4,
                        resizeMode: 'stretch',
                        width: 50,
                        height: 50
                      }} />
                    <TouchableOpacity
                      onPress={() => {
                        this.declineFile('portrait');
                      }}
                      style={{ backgroundColor: '#fff', elevation: 3, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, borderRadius: 10, zIndex: Platform.OS === 'ios' ? 2 : null }}
                    >
                      <Icon name={'ios-close'} style={{ color: '#1697B4', backgroundColor: 'transparent', fontSize: 20, alignSelf: 'center' }} />
                    </TouchableOpacity>
                  </View>
                </View>
              }
            </View>
            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
              <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600' }}>{this.translate.cardId}</Include.Text>
              {!this.state.idCardFront.id ?
                <TouchableOpacity
                  onPress={() => { this.selectPhotoTapped('idCardFront') }}
                  style={{ alignItems: 'center', marginVertical: 5, borderWidth: 1, alignSelf: 'center', borderRadius: 4, width: Define.constants.widthScreen * 0.5, height: 50, justifyContent: 'center', borderColor: '#16a596', flexDirection: 'row' }}
                >
                  <Image source={Define.assets.Images.photoFeedback}
                    style={{
                      resizeMode: 'stretch',
                      borderRadius: 3,
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      left: 10
                    }}
                  />
                  <Include.Text style={{ color: '#828282', alignSelf: 'center', fontSize: 15, left: 10 }}>{this.translate.pickIdCardF}</Include.Text>
                </TouchableOpacity>
                :
                <View>
                  <View style={{ marginTop: 10, alignSelf: 'center', width: 50, borderRadius: 4, height: 50, borderWidth: 1, borderColor: '#CCCCCC', opacity: this.uploadSuccess ? 1 : 0.5 }}>
                    {!this.uploadSuccess ?
                      <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: Platform.OS === 'ios' ? 1 : null, justifyContent: 'center', alignItems: 'center', elevation: 2 }}>
                        <ActivityIndicator size={'large'} />
                      </View> : null
                    }
                    <Image
                      source={{ uri: this.state.idCardFront.link }}
                      style={{
                        borderRadius: 4,
                        resizeMode: 'stretch',
                        width: 50,
                        height: 50
                      }} />
                    <TouchableOpacity
                      onPress={() => {
                        this.declineFile('idCardFront');
                      }}
                      style={{ backgroundColor: '#fff', elevation: 3, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, borderRadius: 10, zIndex: Platform.OS === 'ios' ? 2 : null }}
                    >
                      <Icon name={'ios-close'} style={{ color: '#1697B4', backgroundColor: 'transparent', fontSize: 20, alignSelf: 'center' }} />
                    </TouchableOpacity>
                  </View>
                </View>}
              {!this.state.idCardBackSide.id ?
                <TouchableOpacity
                  onPress={() => { this.selectPhotoTapped('idCardFront') }}
                  style={{ alignItems: 'center', marginVertical: 5, borderWidth: 1, alignSelf: 'center', borderRadius: 4, width: Define.constants.widthScreen * 0.5, height: 50, justifyContent: 'center', borderColor: '#16a596', flexDirection: 'row' }}
                >
                  <Image source={Define.assets.Images.photoFeedback}
                    style={{
                      resizeMode: 'stretch',
                      borderRadius: 3,
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      left: 10
                    }}
                  />
                  <Include.Text style={{ color: '#828282', alignSelf: 'center', fontSize: 15, left: 10 }}>{this.translate.pickIdCardB}</Include.Text>
                </TouchableOpacity>
                :
                <View>
                  <View style={{ marginTop: 10, alignSelf: 'center', width: 50, borderRadius: 4, height: 50, borderWidth: 1, borderColor: '#CCCCCC', opacity: this.uploadSuccess ? 1 : 0.5 }}>
                    {!this.uploadSuccess ?
                      <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: Platform.OS === 'ios' ? 1 : null, justifyContent: 'center', alignItems: 'center', elevation: 2 }}>
                        <ActivityIndicator size={'large'} />
                      </View> : null
                    }
                    <Image
                      source={{ uri: this.state.idCardBackSide.link }}
                      style={{
                        borderRadius: 4,
                        resizeMode: 'stretch',
                        width: 50,
                        height: 50
                      }} />
                    <TouchableOpacity
                      onPress={() => {
                        this.declineFile('idCardBackSide');
                      }}
                      style={{ backgroundColor: '#fff', elevation: 3, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, borderRadius: 10, zIndex: Platform.OS === 'ios' ? 2 : null }}
                    >
                      <Icon name={'ios-close'} style={{ color: '#1697B4', backgroundColor: 'transparent', fontSize: 20, alignSelf: 'center' }} />
                    </TouchableOpacity>
                  </View>
                </View>}
            </View>
            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
              <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600' }}>{this.translate.imageStore}</Include.Text>
              {!this.state.imageStore.id ?
                <TouchableOpacity
                  onPress={() => { this.selectPhotoTapped('imageStore') }}
                  style={{ alignItems: 'center', marginVertical: 5, borderWidth: 1, alignSelf: 'center', borderRadius: 4, width: Define.constants.widthScreen * 0.5, height: 50, justifyContent: 'center', borderColor: '#16a596', flexDirection: 'row' }}
                >
                  <Image source={Define.assets.Images.photoFeedback}
                    style={{
                      resizeMode: 'stretch',
                      borderRadius: 3,
                      width: 30,
                      height: 30,
                      position: 'absolute',
                      left: 10
                    }}
                  />
                  <Include.Text style={{ color: '#828282', alignSelf: 'center', fontSize: 15, left: 10 }}>{this.translate.pickImageSotre}</Include.Text>
                </TouchableOpacity>
                :
                <View>
                  <View style={{ marginTop: 10, alignSelf: 'center', width: 50, borderRadius: 4, height: 50, borderWidth: 1, borderColor: '#CCCCCC', opacity: this.uploadSuccess ? 1 : 0.5 }}>
                    {!this.uploadSuccess ?
                      <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: Platform.OS === 'ios' ? 1 : null, justifyContent: 'center', alignItems: 'center', elevation: 2 }}>
                        <ActivityIndicator size={'large'} />
                      </View> : null
                    }
                    <Image
                      source={{ uri: this.state.imageStore.link }}
                      style={{
                        borderRadius: 4,
                        resizeMode: 'stretch',
                        width: 50,
                        height: 50
                      }} />
                    <TouchableOpacity
                      onPress={() => {
                        this.declineFile('imageStore');
                      }}
                      style={{ backgroundColor: '#fff', elevation: 3, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, borderRadius: 10, zIndex: Platform.OS === 'ios' ? 2 : null }}
                    >
                      <Icon name={'ios-close'} style={{ color: '#1697B4', backgroundColor: 'transparent', fontSize: 20, alignSelf: 'center' }} />
                    </TouchableOpacity>
                  </View>
                </View>}
            </View>
            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
              <Include.Text style={{ marginRight: 4, fontSize: 18, fontWeight: '600' }}>{this.translate.note}</Include.Text>
              <Include.TextInput
                style={{ backgroundColor: '#E8F6F6', fontSize: 15, height: 40, width: '88%', color: '#000', alignSelf: 'center' }}
                placeholder={this.translate.username}
                textContentType={'username'}
                underlineColorAndroid='transparent'
                placeholderTextColor="#bababa"
                onChangeText={note =>
                  this.setState({ username: note })
                }
              />
            </View>
          </View>
        </Include.ScrollView>
      )
    }
    return null
  }
  handleSubmit() {
    if (this.state.step === STEP.HAS_INFO) {

    } else {
      this.setState({ step: STEP.HAS_INFO })
    }
    Keyboard.dismiss()
  }
  renderBtnStep() {
    if (this.state.nameStore && this.state.address && !this.state.idBank && !this.state.cardHolder && !this.state.nameBank && !this.state.contact.length && this.state.step === STEP.START_CREATE) {
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
        {this.renderInfoStore()}
        {this.renderImage()}
        {this.renderBtnStep()}
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
  componentWillUnmount() {
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

export default connect(selectActions, undefined, undefined, { withRef: true })(CreateStoreScreen);
