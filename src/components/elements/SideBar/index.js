
var _ = require('lodash')
const moment = require('moment')
//LIB
import React  from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Container, Content, Text, Icon, List, ListItem, Thumbnail } from 'native-base';
var {Actions, ActionConst} = require('react-native-router-flux');
import { connect } from 'react-redux';

//action
import UserActions_MiddleWare from '../../../actions/UserActions_MiddleWare'
//components
var Define = require('../../../Define');
var Debug = require('../../../Util/Debug');
var Themes = require('../../../Themes');
var Util = require('../../../Util/Util');
var UserUtil = require('../../../Util/user');
var Include = require('../../../Include');

import ReactComponent from '../../ReactComponent'

import styles from './style';
import NewTag from '../NewTag'

var {popupActions} = require('../../popups/PopupManager');
import DefaultPopup from '../../popups/DefaultPopup'

import LinearGradient from 'react-native-linear-gradient';

var {globalVariableManager}= require('../../modules/GlobalVariableManager');

class SideBar extends ReactComponent{
  static componentName = 'SideBar'
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {
      onHeadFlag: true
    })
    this.renderMenu = this.renderMenu.bind(this);

  }

  initMenu() {
    const self = this
    this.config = [{
      icon: 'md-help-circle',
      text: 'Help',
      onPress: () => {
        popupActions.setRenderContentAndShow(DefaultPopup,{
          buttonTitle:'OK',
          onPress:() => {
            popupActions.popPopup();
          },
          title:'Hỗ trợ',
          description:'Welcome to RNTemplate'
        })
      }
    }]

  }

  getTypeNavigator(targetScreen) {
    const {navigator, appSetting, user} = this.props;
    const currentScreen = navigator.currentScreen.name

    let type = ActionConst.PUSH;
    if(currentScreen !== 'FeedsScreenContainer' && currentScreen !== 'ServiceAvailableListContainer') {
      type = ActionConst.REPLACE;
    }
    if(currentScreen === 'ProfileScreen' && !user.memberInfo.member.facebook.name) {
      type = ActionConst.PUSH;
    }
    if ((currentScreen == targetScreen) ) {
      type = 'refresh'
    }
    return type;
  }

  renderMenu() {
    let boundStyles,paddingStyles,paddingIconStyles = {};
    return this.config.map((item, index) => {
      if(item.image === Define.assets.Images.news || item.icon === 'ios-log-out') {
        boundStyles = { width:'100%', borderTopWidth:1, borderTopColor:'#DADCE0',paddingTop:15}
        paddingStyles = {marginTop:10,};
        paddingIconStyles = {paddingTop:15}
      } else {
        boundStyles = {}
        paddingStyles = {}
        paddingIconStyles = {}
      }
      return (
        <TouchableOpacity
          key={index}
          onPress = {item.onPress}>
          <View style={[styles.menuItemContainer,paddingStyles]}>
            {item.icon?
              <View style={[styles.menuIconContainer,paddingIconStyles]}>
                <Icon name={item.icon} style={{...styles.menuIcon, ...(item.style ||{})}}/>
              </View>
            :null}
            {item.image?
              <View style={[styles.menuIconContainer,paddingIconStyles]}>
                <Image resizeMode={'stretch'} source={item.image} style={{width: 25, height:25}}/>
              </View>
              :null}
            <View style={[styles.menuTextContainer,boundStyles]}>
              <Include.Text style={[styles.menuTextDes]}>{item.text}</Include.Text>
            </View>
            {item.count ?
              <View
                pointerEvents={'none'}
                style={{position: 'absolute', right: 10, bottom: 20, width: 20, height: 20, borderRadius: 10, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center'}}>
                  <Include.Text numberOfLines={1} style={{color: '#fff', backgroundColor: 'transparent'}}>{item.count}</Include.Text>
              </View>
            : null}
            <NewTag tagName={item.text}/>
          </View>
        </TouchableOpacity>
      )
    })
  }


  onScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.y;

    if (contentOffset < 10) {
      if (!this.state.onHeadFlag) {
        this.setState({onHeadFlag: true});
      }
    } else {
      if (this.state.onHeadFlag) {
        this.setState({onHeadFlag: false});
      }
    }
  }

  scrollToTop = () => {
    this.scrollView && this.scrollView.scrollTo({x: 0, y: 0, animated: true})
  }

  renderContent(){
    this.initMenu()
    var self = this;
    var {dispatch, user, appSetting} = this.props;
    var phone =  _.get(user, 'memberInfo.member.phone', '')

    var content = null;
    content=(
      <View style={styles.background}>

        <View style={{flex: 1}}>
          <Include.ScrollView
            refProp={(ref) => this.scrollView = ref}
            contentContainerStyle={{paddingTop:15}}
            onScroll={this.onScroll}
          >
            {this.renderMenu()}
          </Include.ScrollView>
        </View>
        <SafeAreaView style={{flex: 0}} />
      </View>
    )
    return(content)
  }
}

/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(SideBar);
// export default SideBar
