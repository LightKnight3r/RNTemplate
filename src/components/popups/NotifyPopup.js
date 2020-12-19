var _ = require('lodash')
//LIB
import React from 'react';
import {
  View,
  TouchableOpacity
  // InteractionManager
} from 'react-native';

// import { connect } from 'react-redux';

//action

//components
var Define = require('../../Define');
// var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');
import RDActions from '../../actions/RDActions'

// var StyleConfig = require('../../Themes/StyleConfig');
var RectButton = require('../elements/RectButton');
var ButtonWrap = require('../elements/ButtonWrap');

import Popup from './Popup'

var { popupActions, popupConst } = require('../popups/PopupManager');
var { globalVariableManager } = require('../modules/GlobalVariableManager');

class NotifyPopup extends Popup {
  static componentName = 'NotifyPopup'
  static config =
    {
      ...Popup.config,
      group: popupConst.NOTIFY_GROUP,
      movePopupIn: (contentObject) => {
        var contentRefObject = contentObject.objRef;
        return contentRefObject.fadeInDown(600);
      },
      movePopupOut: (contentObject) => {
        var contentRefObject = contentObject.objRef;
        return contentRefObject.fadeOutUp(200);
      }
    }
  static containerStyle = {
    ...Popup.containerStyle,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
  // static propTypes = {}
  constructor(props) {
    super(props);
    this.state = _.merge(this.state,
      {})
  }
  renderPopupContent() {
    var self = this;
    const { notiObj } = self.props;

    let sourceImage = {
      uri: notiObj.icon
    }

    if(!sourceImage.uri) {
      sourceImage = Define.assets.Images.logoLogin;
    }

    return (
      <TouchableOpacity
        style={{ backgroundColor: '#f9f7f7', top: 5, borderRadius: 10, width: Define.constants.widthScreen - 10, elevation: Define.constants.elevation, borderColor: '#000', paddingBottom: 3 }}
        onPress={() => {
          globalVariableManager.reduxManager.dispatch(RDActions['Notify']['removeOnRequest']({ id: notiObj._id }));
          globalVariableManager.navigatorManager.handleNavigator(notiObj.link, notiObj.extras);
          popupActions.popPopup(undefined, undefined, popupConst.NOTIFY_GROUP);
        }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 10, backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Include.Image style={{ width: 20, height: 20, borderRadius: 5 }} source={sourceImage} />
            <Include.Text style={{ marginLeft: 5 }}>HeyU</Include.Text>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
              <Include.Text>{Util.formatDateFromNow(notiObj.notifiedAt)}</Include.Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
            <Include.Text style={{ left: 0, right: 0, fontSize: 17, color: '#000', marginVertical: 0, fontWeight:'bold' }}>{notiObj.title}</Include.Text>
            <Include.Text style={Themes.current.text.fadeDownPopup}>{notiObj.description}</Include.Text>
          </View>
          <View style={{ width: 30, height: 3, backgroundColor: '#cec8c8', borderRadius: 1.5, alignSelf: 'center' }}></View>
      </TouchableOpacity>
    )
  }
  componentDidMount() {
    super.componentDidMount();
    const { time2Close } = this.props;
    this.timeout = setTimeout(() => {
      popupActions.popPopup(undefined, undefined, popupConst.NOTIFY_GROUP);
    }, 5000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
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

// export default connect(selectActions, undefined, undefined, {withRef: true})(NotifyPopup);
export default NotifyPopup
