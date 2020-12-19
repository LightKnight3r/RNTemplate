var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Switch,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
var {Actions} = require('react-native-router-flux');
import { Icon, Text, Button, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
//action
//components
var Define = require('../../../Define');
var Debug = require('../../../Util/Debug');
var Themes = require('../../../Themes');
var Util = require('../../../Util/Util');
var Include = require('../../../Include');
var {popupActions} = require('../../popups/PopupManager');
var {globalVariableManager}= require('../../modules/GlobalVariableManager');
var ButtonWrap = require('../../elements/ButtonWrap');
//screens
import NotifyScreen from '../../screens/NotifyScreen';
// popups
import DefaultPopup from '../../popups/DefaultPopup';
export default class Service extends React.PureComponent {
  render() {
    return(
      <TouchableOpacity
        onPress={() => {
          if (this.props.service.active) {
            if(!this.props.service.blockCreate) {
              Actions[this.props.service.link]({
                ...this.props.service.extras,
                serviceId: this.props.service._id
              });
            }
          } else {
            popupActions.setRenderContentAndShow(DefaultPopup, {
              title: 'Thông báo',
              description: this.props.service.message,
              buttonTitle: 'OK',
              buttonTitle2: this.props.service.source ? 'Tìm hiểu thêm' : null,
              onPress: () => {
                popupActions.popPopup();
              },
              onPress2: () => {
                popupActions.popPopup();
                if (this.props.service.source) {
                  Actions.WebviewScreen({
                    source: this.props.service.source
                  });
                }
              }
            });
          }
        }}
        style={{width: Define.constants.widthScreen * 0.25, height: Define.constants.widthScreen * 0.25, justifyContent: 'center', alignItems: 'center', marginTop: 15}}
      >
        <Image style={{width: 50, height: 50, borderRadius: 25}} resizeMode={'stretch'} source={{uri: this.props.service.icon}} />
        <Text style={{fontSize: 14, color: !this.props.service.blockCreate ? '#454F63' : '#b2bec3', marginTop: 5, fontWeight: 'bold', textAlign:'center'}}>{this.props.service.name}</Text>
      </TouchableOpacity>
    )
  }
}