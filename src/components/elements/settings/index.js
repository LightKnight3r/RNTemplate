'use strict';

import React, { Component } from 'react';
import { Image, View, Switch, TouchableOpacity, Platform ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Text, Button, Icon, Thumbnail, InputGroup, Input } from 'native-base';
import DatePicker from 'react-native-datepicker';

var Define = require('../../../Define');
var Debug = require('../../../Util/Debug');
var Themes = require('../../../Themes');
var Util = require('../../../Util/Util');
var Include = require('../../../Include');

var {popupActions} = require('../../popups/PopupManager');
import DefaultPopup from '../../popups/DefaultPopup'
var {globalVariableManager}= require('../../modules/GlobalVariableManager');
import isEmail from 'validator/lib/isEmail';

import FadeDownDefaultPopup from '../../popups/FadeDownDefaultPopup'


import UserActions_MiddleWare from '../../../actions/UserActions_MiddleWare'
import styles from './styles';
var primary = Themes.current.factor.brandPrimary;
let _ = require('lodash');
import PropTypes from 'prop-types'

React.PropTypes = PropTypes;

class Settings extends Component {

    constructor(props) {
      super(props);
      let {user} = this.props;
      this.state = {};
      this.handleUpdateProfile = this.handleUpdateProfile.bind(this);

      this.userInfo={
        Username: _.get(user, 'memberInfo.member.name', ''),
        email: _.get(user, 'memberInfo.member.email', ''),
        phone: _.get(user, 'memberInfo.member.phone', '')
      }
      this.constructor.childContextTypes = {
        theme: React.PropTypes.object,
       }
       this.infoFromToken = null;
       this.handleLoginFacebook = this.handleLoginFacebook.bind(this);
       this.updateProfile = this.updateProfile.bind(this);
       this.forceUpdate = (!user.memberInfo.member.facebook.name);
    }

    updateProfile(objUpdate) {
      var {dispatch,user} = this.props;
      dispatch(UserActions_MiddleWare.updateProfile(objUpdate))
      .then(()=>{
        globalVariableManager.rootView.showToast('Cập nhật thông tin thành công');
        dispatch(UserActions_MiddleWare.get())
        .then(() => {
          if(this.forceUpdate) {
            return (
              Actions.SwitchModeScreen({
                type: 'reset'
              })
            )
          }
        })
      })
      .catch(err => {
        popupActions.setRenderContentAndShow(FadeDownDefaultPopup,
        {
          description:'Cập nhật thông tin thất bại'
        })
      })
    }
    handleUpdateProfile() {
      let {dispatch, user} = this.props;
      let message = '';
      let username = this.userInfo.Username.trim();
      let email = this.userInfo.email.trim();
      const objUpdate = {
        name:this.userInfo.Username,
        email:this.userInfo.email,
      };
      if(username === '') {
        message += 'Họ và tên không được để trống';
      }
      if(email === '') {
        if(!message) {
          message = 'Email không được để trống'
        } else {
          message += '\nEmail không được để trống';
        }
      }
      if (user.memberInfo.member.facebook.name
          && objUpdate.name.trim() === _.get(user, 'memberInfo.member.name', '')
          && objUpdate.email.trim() === _.get(user, 'memberInfo.member.email', '')) {
        message = 'Bạn chưa thay đổi thông tin cập nhật'
      }
      if(message) {
        globalVariableManager.rootView.showToast(message)
      } else {
        this.updateProfile(objUpdate);
      }
    }
    handleLoginFacebook(accessToken) {
      const self = this;
      Debug.log2(`handleLogin`, accessToken);
      let {dispatch, appSetting} = this.props;
      let token = '';
      let objUpdate = {};
      dispatch(UserActions_MiddleWare.loginFacebook())
        .then(access_token => {
          token = access_token;
          return dispatch(UserActions_MiddleWare.getInfoFromAccessToken({access_token}));
        })
        .then((result) => {
          this.infoFromToken = result.res.data;
          this.infoFromToken.access_token = token;

          objUpdate = {
            name: this.infoFromToken.name,
            email: this.infoFromToken.email,
            avatar: this.infoFromToken.picture,
            id: this.infoFromToken.id,
            access_token: this.infoFromToken.access_token
          }

          this.updateProfile(objUpdate);

        })
        .catch(err => {
          globalVariableManager.rootView.showToast('Đã có lỗi xảy ra với quá trình đăng nhập Facebook');
        });
    }
    render() {
      var {user,dispatch,appSetting} = this.props;
      let isAuthen = false;
      if(appSetting.mode === 'shipper') {
        isAuthen = _.get(user, 'memberInfo.member.ship.isAuthen', 0);
      } else {
        isAuthen = _.get(user, 'memberInfo.member.shop.isAuthen', 0);
      }
        return (
          <View style={styles.container}>
            <View style={{justifyContent: 'center'}}>
              <View  style={styles.bg}>
                  <View style={{marginTop: 20,flexDirection:'row'}}>
                    {appSetting.mode === 'shipper'?
                      <Image style={{position: 'absolute', top: 10, right: 10, left: 10, width: 100, height: 100, backgroundColor: 'transparent'}} source={isAuthen ? Define.assets.Images.daxacthucship : Define.assets.Images.chuaxacthuc} /> : null}
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{alignSelf: 'center'}}>
                          {user.memberInfo.member.facebook.picture?
                            <View>
                              <Thumbnail source={{uri:user.memberInfo.member.facebook.picture}} style={styles.profilePic} />
                            </View>:
                            <View style={{width:60,height:60}}></View>
                          }
                        </TouchableOpacity>
                    </View>
                  </View>
                  {user.memberInfo.member.facebook.name ? null :
                    <TouchableOpacity
                      onPress={() => {
                        this.handleLoginFacebook();
                      }}>
                      <View style={{backgroundColor: '#3b5998', borderRadius: 25, height: 40, marginTop:15, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginHorizontal:20}}>
                        <Include.Text style={{color: '#fff', fontWeight: 'bold'}}>
                          Cập nhật thông tin qua Facebook
                        </Include.Text>
                      </View>
                    </TouchableOpacity>
                  }
                  <View style={styles.signupContainer}>
                      <View style={styles.inputGrp}>
                          <Icon name='ios-person-outline' style={styles.icon} />
                          <TextInput
                              underlineColorAndroid ='transparent'
                              placeholder='Họ và tên'
                              defaultValue={_.get(user, 'memberInfo.member.name', '')}
                              blurOnSubmit={false}
                              placeholderTextColor='#bdc3c7' style={styles.input}
                              onChangeText ={(text)=>{this.userInfo.Username=text}}
                              onSubmitEditing={() => {
                                if (this.refs.EmailInput) {
                                  this.refs.EmailInput.focus();
                                }
                              }}/>
                      </View>
                      <View style={styles.inputGrp}>
                          <Icon name='ios-mail-open-outline' style={styles.icon}/>
                          <TextInput ref='EmailInput' underlineColorAndroid ='transparent' placeholder='Email' defaultValue={user.memberInfo.member.email?user.memberInfo.member.email:''} placeholderTextColor='#bdc3c7' style={styles.input}
                            onChangeText ={(text)=>{this.userInfo.email=text }}
                            onSubmitEditing={() => {
                              if (this.refs.AddrInput) {
                                this.refs.AddrInput.focus();
                              }
                            }}
                            />
                      </View>
                      <TouchableOpacity
                        onPress={() => {}}>
                        <View style={[styles.inputGrp,{paddingVertical:8}]}>
                            <Icon name='ios-call-outline' style={{color: '#fff'}}/>
                            <Include.Text style={{color:'#ffffff',fontSize:15, paddingLeft: 15}}>{this.userInfo.phone} </Include.Text>
                            {/*<TextInput underlineColorAndroid ='transparent' placeholder='Số điện thoại' defaultValue={this.userInfo.phone} placeholderTextColor='#bdc3c7' style={styles.input}
                              editable={false} />*/}
                        </View>
                      </TouchableOpacity>
                  </View>

                  <Button
                    style={{alignSelf: 'center'}}
                    onPress={this.handleUpdateProfile}>
                    <Text>Cập nhật</Text>
                  </Button>

                  {appSetting.mode === 'shop' ?
                    <TouchableOpacity
                      onPress={() => {
                        Actions.AuthenticationScreen({
                          type: 'reset'
                        })
                      }}>
                      <Include.Text style={{paddingRight: 20, paddingTop: 5, color: '#3498db', textAlign: 'right', fontSize: 16}}>Thông tin xác thực</Include.Text>
                    </TouchableOpacity>
                  : null}

                  <Include.Text style={{alignSelf: 'center', backgroundColor: 'transparent', color: '#ecf0f1', fontStyle: 'italic', paddingTop: 5}}>{`Mã giới thiệu: ${_.get(user, 'memberInfo.member.phone')}`}</Include.Text>
              </View>
            </View>
          </View>
        )
    }
}

// function bindAction(dispatch) {
//     return {
//     }
// }
//
// export default connect(null, bindAction)(Settings);
export default Settings;
