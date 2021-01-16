
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  Modal,
  Image,
  Text,
  StatusBar,
  Platform
  // InteractionManager
} from 'react-native';

// import { connect } from 'react-redux';

//action
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icon} from 'native-base';
//components
var Define = require('../../Define');
// var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
// var Util = require('../../Util/Util');
var Include = require('../../Include');

var StyleConfig = require('../../Themes/StyleConfig');
var RectButton = require('../elements/RectButton');
var ButtonWrap= require('../elements/ButtonWrap');

import Popup from './Popup'
import * as Animatable from 'react-native-animatable';

var {popupActions,popupConst} = require('../popups/PopupManager');
// var {globalVariableManager}= require('../modules/GlobalVariableManager');

class UploadFilePopup extends Popup{
  static componentName = 'UploadFilePopup'
  static config=
  {
    ...Popup.config,
  }
  static containerStyle={
    ...Popup.containerStyle,
  }
  static defaultProps = {
    disableClose:true,
  }
  // static propTypes = {}
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {})
  }
  UNSAFE_componentWillMount(){
    super.UNSAFE_componentWillMount();
  }
  renderPopupContent(){
    var content = (
      <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.4)'}}>
        <View
          style={{flex:1, width:'95%', alignSelf:'center'}}
        >
          {this.props.renderImage}
        </View>
      </View>
    );
    return(content)
  }
  componentWillUnmount(){
    super.componentWillUnmount();
  }
}

/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
// function selectActions(state) {
//   return {}
// }

// export default connect(selectActions, undefined, undefined, {withRef: true})(UploadFilePopup);
export default UploadFilePopup
