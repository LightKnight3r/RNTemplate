
var _ = require('lodash')

//LIB
import React  from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';

var {Actions} = require('react-native-router-flux');
import { connect } from 'react-redux';
//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');
import UserActions_MiddleWare from '../../actions/UserActions_MiddleWare'

var I18n = require('../../Util/i18n');


var {popupActions} = require('../popups/PopupManager');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

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

class HomeScreen extends Screen{
  static componentName = 'HomeScreen'
  static sceneConfig ={
    ...Screen.sceneConfig
  }
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props){
    super(props);
    // this.translate = I18n.t("HomeScreen");
    this.state = _.merge(this.state,
    {})
  }

  static renderLeftButton(scene){
    return (
      <View style={Themes.current.screen.leftButtonWrapNavBar}>
        <TouchableOpacity
          key={'_menu'}
          style={{width: 50}}
          // ref={(ref) => {this.props.setRefsForHint?this.props.setRefsForHint('_menu',ref):null}}
          onPress={()=>{globalVariableManager.rootView.drawSideMenu(true)}}>
          <View
            style={{backgroundColor: 'transparent',top:Platform.OS === 'android' ? 7 : 0,left:0,paddingLeft: 10, paddingRight:10,height:Define.constants.navBarHeight,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',}}>
            <Icon name='ios-menu' style={{fontSize: 32, lineHeight: 36, color: '#fff'}} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  // static renderRightButton(scene){
  //   return (
  //     <View style={Themes.current.screen.rightButtonWrapNavBar}>
  //       <Include.Text>RightButton</Include.Text>
  //     </View>
  //   )
  // }
  // static renderTitle(scene){
  //   return(
  //     <View style={Themes.current.screen.titleWrapNavBarCenter}>
  //       <Include.Text style={Themes.current.text.navBartitle}>HomeScreen</Include.Text>
  //     </View>
  //   )
  // }

  onRefresh(){
    super.onRefresh();
    var {dispatch} = this.props;
  }
  hangle(){
    this.props.dispatch(UserActions_MiddleWare.logout())
    .then(res=>{
    })
    .catch(err=>{
    })
  }
  onGetMore(){
    super.onGetMore();
    var {dispatch} = this.props;
  }
  renderScreenContent(){
    var {dispatch} = this.props;
    var content = null;
    content =(
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <Include.ScrollView
          style={[Themes.current.screen.bodyView,this.props.bodyStyle]}
          refreshing={false}
          onRefresh={this.onRefresh}
          onGetMore={this.onGetMore}
        >
          <Include.Text>Content</Include.Text>
          <TouchableOpacity onPress={()=>{this.hangle()}}>
            <Include.Text>haha</Include.Text>
          </TouchableOpacity>
        </Include.ScrollView>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </View>
    )
    return content;
  }
  componentDidMount(){
    super.componentDidMount();
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
    user: state.User,
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(HomeScreen);
