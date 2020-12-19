
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
  TouchableOpacity
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
import RegisterServicePopop from '../../popups/RegisterServicePopop';
import LinearGradient from 'react-native-linear-gradient';

export default class MyListItem extends React.PureComponent {
  render() {
    return (
      <View
        style={styles.container}>
        <LinearGradient
          {...Themes.current.linearConfig}>
          <View style={{height:Define.constants.navBarHeight, flexDirection: 'row', position: 'absolute', alignItems: 'center'}}>
            <TouchableOpacity
              key={'_menu'}
              style={{width: 50}}
              ref={(ref) => {this.props.setRefsForHint?this.props.setRefsForHint('_menu',ref):null}}
              onPress={()=>{globalVariableManager.rootView.drawSideMenu(true)}}>
              <View
                style={{backgroundColor: 'transparent',top:Platform.OS === 'android' ? 7 : 0,left:0,paddingLeft: 10, paddingRight:10,height:Define.constants.navBarHeight,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',}}>
                  <Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36, color: '#fff'}} />
              </View>
            </TouchableOpacity>

            {this.props.serviceRunning ?
              <TouchableOpacity
                style={{alignItems: 'center', flexDirection: 'row', marginLeft: 5,top:Platform.OS === 'android' ? 7 : 0}}
                onPress={() => {
                  popupActions.setRenderContentAndShow(RegisterServicePopop,{
                    handleSwitchServiceSuccess: this.props.handleSwitchServiceSuccess
                  })
                }}
              >
                  <View>
                    <Icon name='ios-funnel' style={{color:'#fff', fontSize:25,backgroundColor: 'transparent'}}></Icon>

                      <View
                        pointerEvents={'none'}
                        style={{position: 'absolute', top: -3, right: -3, width: 13, height: 13, borderRadius: 6.5, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center'}}>
                          <Include.Text numberOfLines={1} style={{color: '#fff', backgroundColor: 'transparent',fontSize:11}}>{this.props.countService}</Include.Text>
                      </View>

                  </View>
                  <Include.Text style={{color:'#fff', fontSize:16,backgroundColor: 'transparent', paddingLeft:6}}>Dịch vụ</Include.Text>
              </TouchableOpacity> : null
            }
          </View>

          <View style={styles.rightNavbar}>
            <Include.Text style={{color: '#fff', fontSize: 14, backgroundColor: 'transparent', marginRight: 5}}>{this.props.switchOrderValue ? 'Trực tuyến' : 'Ngoại tuyến'}</Include.Text>

            {Platform.OS === 'ios' ?
              <View
                key={'_switch_order_system'}
                ref={(ref) => {this.props.setRefsForHint?this.props.setRefsForHint('_switch_order_system',ref):null}}
                style={{backgroundColor: 'transparent'}}>
                <Switch
                  disabled={this.props.disabledOrder}
                  onTintColor={'#3498db'}
                  thumbTintColor={'#fff'}
                  value={this.props.switchOrderValue ? true : false}
                  onValueChange={this.props.onToggleOrder}/>
              </View>
             :<View
               style={{backgroundColor: 'transparent'}}>
               <Switch
                 key={'_switch_order_system'}
                 ref={(ref) => {this.props.setRefsForHint?this.props.setRefsForHint('_switch_order_system',ref):null}}
                 disabled={this.props.disabledOrder}
                 onTintColor={'#3498db'}
                 thumbTintColor={'#fff'}
                 value={this.props.switchOrderValue ? true : false}
                 onValueChange={this.props.onToggleOrder}/>
             </View>
           }


            <ButtonWrap
              key={'_notify'}
              ref={(ref) => {this.props.setRefsForHint?this.props.setRefsForHint('_notify',ref):null}}
              onPress={()=>{
                Actions.BellNotifyScreen({
                  type: 'push'
                })
            }}>
              <Icon name='ios-notifications' style={styles.notifyIcon} />
              {this.props.notify.lists.ship.length > 0 ?
                <View
                  pointerEvents={'none'}
                  style={{position: 'absolute', top: 0, right: 1, width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center'}}>
                    <Include.Text numberOfLines={1} style={{color: '#fff', backgroundColor: 'transparent'}}>{this.props.notify.lists.ship.length}</Include.Text>
                </View>
              : null}
            </ButtonWrap>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const styles = {
  container: {
    height:Define.constants.navBarHeight,
    width: Define.constants.widthScreen,
    borderBottomWidth:0,
    shadowColor:'#000000',
    shadowOpacity:0.5,
    shadowOffset:{height:2, width:0},
    shadowRadius:1,
    borderColor:'#000',
    zIndex: 2,
    elevation:3
  },
  rightNavbar: {
    position:'absolute',
    top: Platform.OS === 'android' ? 9 : 0,
    right:0,
    height:Define.constants.navBarHeight,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    flexDirection: 'row'
  },
  notifyIcon: {
    backgroundColor: 'transparent',
    fontSize: 27,
    lineHeight: 36,
    color: '#fff',
    paddingHorizontal: 5,
    marginTop:Platform.OS === 'android' ? -2 : 0
  }
}
