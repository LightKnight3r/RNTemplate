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
import BellNotifyScreen from '../../screens/BellNotifyScreen';
// popups
import DefaultPopup from '../../popups/DefaultPopup';
export default class Navbar extends React.PureComponent {
  render() {
    const heightLogo = Define.constants.navBarHeight * 0.6;
    const widthLogo = heightLogo * 2000 / 866;
    const {point, notify} = this.props;
    return (
      <View style={{
        height:Define.constants.navBarHeight,
        width: Define.constants.widthScreen,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {height: 2, width: 0},
        shadowRadius: 1,
        borderColor: '#000',
        zIndex: 2,
        elevation: 3
      }}>
        <View
          style={Themes.current.screen.leftButtonWrapNavBar}
        >
          <Image style={{width: widthLogo, height: heightLogo}} resizeMode={'stretch'} source={Define.assets.Images.logoHeyU} />
        </View>
        <View style={[Themes.current.screen.rightButtonWrapNavBar, {flexDirection: 'row'}]}>
          <TouchableOpacity style={{flexDirection: 'row'}}
            onPress={()=>{Actions.PointHistoryScreen()}}>
            <Image style={{width: 20, height: 20, marginRight: 5}} resizeMode={'stretch'} source={Define.assets.Images.point} />
            <Text style={{color: '#454F63'}}>{point.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.BellNotifyScreen({
                type: 'push'
              })
            }}
            style={{paddingLeft: 15}}
          >
            <Icon name='ios-notifications' style={{ backgroundColor: 'transparent', marginTop: 0, color: '#1795b5', fontSize: 25 }} />
            {this.props.notify.lists.shop.length ?
              <View
                pointerEvents={'none'}
                style={{ position: 'absolute', top: -5, right: -5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center' }}>
                <Include.Text numberOfLines={1} style={{ color: '#fff', backgroundColor: 'transparent', fontSize: 13 }}>{this.props.notify.lists.shop.length}</Include.Text>
              </View>
            : null}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}