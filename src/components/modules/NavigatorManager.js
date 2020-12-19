var _ = require('lodash');
import { Platform, PermissionsAndroid, AppState } from 'react-native';

const Debug = require('../../Util/Debug');
const Util = require('../../Util/Util');
import { globalVariableManager } from './GlobalVariableManager';
import { connect } from 'react-redux';
var { Actions, ActionConst } = require('react-native-router-flux');
import RDActions from '../../actions/RDActions';
const Define = require('../../Define');
var {
  PopupManager,
  popupActions,
  popupConst
} = require('../popups/PopupManager');
const NotificationsActions_MiddleWare = require('../../actions/NotificationsActions_MiddleWare');
const UserActions_MiddleWare = require('../../actions/UserActions_MiddleWare');
import NotifyPopup from '../popups/NotifyPopup';
import Popup from '../popups/Popup';
import DefaultPopup from '../popups/DefaultPopup';

const EventEmitter = require('react-native/Libraries/vendor/emitter/EventEmitter');

class NavigatorManager extends EventEmitter {
  constructor() {
    super();

    this.config();
    this.DefaultPopup = DefaultPopup;
    this.NotifyPopup = NotifyPopup;
    this.Popup = Popup;
  }

  config() {
    this.forcePopup = ['WebRTC', 'WebRTCPopup', 'NewOrderPopup', 'NewOrderBikePopup'];

    this.forceScreen = [];
  }

  handleNavigator(link, extras = {}) {
    if (!link) {
      return;
    }

    if (link === 'OrderCreatedScreen') {
      link = 'ServiceAvailableListContainer';
      extras = {
        orderCreatedScreen: {
          ...extras,
          time: Date.now()
        },
        serviceId: Define.constants.serviceOrderSystem[0],
        tabFocus: 1
      }
    }

    if (link === 'OrderSystemScreen') {
      link = 'OrderSystemContainer';
      extras = {
        orderSystemScreen: {
          ...extras,
          time: Date.now()
        },
        time: Date.now(),
        serviceId: Define.constants.serviceOrderSystem[0]
      }
    }

    if (globalVariableManager.reduxManager.state.AppSetting.mode === 'shop' && (link === 'FeedbackAndPolicyScreen' || link === 'FeedBackScreen')) {
      link = 'ServiceAvailableListContainer';
      extras = {
        feedbackScreen: {
          ...extras,
          time: Date.now()
        },
        tabFocus: 2
      }
    }

    const isScreen = this.checkIsScreen(link);

    if (isScreen) {
      this.handleOpenScreen(link, extras);
    } else {
      this.handleOpenPopup(link, extras);
    }
  }

  handleOpenScreen(link, extras) {
    const {AppSetting, Navigator} = globalVariableManager.reduxManager.state;
    let extrasSend = {
      ...extras,
      time: Date.now()
    }

    if (extrasSend.serviceAvailableListScreen) {
      extrasSend.serviceAvailableListScreen = {
        ...extrasSend.serviceAvailableListScreen,
        time: Date.now()
      }
    }

    if (extrasSend.orderCreatedScreen) {
      extrasSend.orderCreatedScreen = {
        ...extrasSend.orderCreatedScreen,
        time: Date.now()
      }
    }

    if (extrasSend.feedbackScreen) {
      extrasSend.feedbackScreen = {
        ...extrasSend.feedbackScreen,
        time: Date.now()
      }
    }

    if (extrasSend.accountScreen) {
      extrasSend.accountScreen = {
        ...extrasSend.accountScreen,
        time: Date.now()
      }
    }

    if(link === 'DetailNotificationScreen') {
      globalVariableManager.reduxManager.dispatch((NotificationsActions_MiddleWare.getDetailNotification({_id:extras._id})))
      .then((result) => {
        extrasSend = result.res.data.data.extras
        if (Actions[link]) {
          Actions[link]({
            ...extrasSend,
            type: this.getTypeNavigator(link)
          });
        }
        this.handleAddDefaultOriginPlaceFromNotify(link, extrasSend)
      })
    } else if (link === 'ServiceAvailableListContainer' || link === 'FeedsScreenContainer') {
      if ((link === 'ServiceAvailableListContainer' && AppSetting.mode === 'shop') || (link === 'FeedsScreenContainer' && AppSetting.mode === 'shipper')) {
        if (Navigator.currentScreen.name === 'DetailOrderSystemScreenForShop' && extrasSend.tabFocus === 1
          && extrasSend.orderCreatedScreen && extrasSend.orderCreatedScreen.id) {
            return (
              Actions.refresh({
                ...extrasSend.orderCreatedScreen
              })
            );
        }

        Actions.popTo(link);

        setTimeout(() => {
          Actions.refresh(extrasSend);
        }, 500);
      }
    } else {
      if (Actions[link]) {
        Actions[link]({
          ...extrasSend,
          type: this.getTypeNavigator(link)
        });
      }
      this.handleAddDefaultOriginPlaceFromNotify(link, extrasSend)
    }
  }
  handleAddDefaultOriginPlaceFromNotify(link, extras) {
    if(link === "DefaultLocationForShopScreen") {
      if(extras && extras.lat && extras.lng && extras.locationName
        && typeof extras.lat === 'number'
        && typeof extras.lng === 'number'
      ) {
        const defaultOriginPlace = {
          location: {
            lat: extras.lat,
            lng: extras.lng,
          },
          name: extras.locationName
        }
        globalVariableManager.reduxManager.dispatch(UserActions_MiddleWare.addDefaultOrigin(defaultOriginPlace));
      }
    }
  }

  handleOpenPopup(link, extras) {
    const appSetting = globalVariableManager.reduxManager.state.AppSetting;

    if(this[link]) {
      if ((link === 'NewOrderPopup' || link === 'NewOrderBikePopup') && _.get(appSetting, 'mode', '') !== 'shipper') {
        return;
      }

      popupActions.setRenderContentAndShow(this[link], extras);
    }
  }

  checkIsScreen(link) {
    let isScreen = false;
    if (link.includes('Screen') || link.includes('Container')) {
      isScreen = true;
    }

    return isScreen;
  }

  getTypeNavigator(targetScreen) {
    const navigator = globalVariableManager.reduxManager.state.Navigator;
    const user = globalVariableManager.reduxManager.state.User;
    const currentScreen = navigator.currentScreen.name;

    let type = ActionConst.PUSH;
    // if(currentScreen !== 'FeedsScreenContainer' && currentScreen !== 'OrderCreateScreen') {
    //   type = ActionConst.REPLACE;
    // }
    //
    // if(currentScreen === 'ProfileScreen' && !user.memberInfo.member.facebook.name) {
    //   type = ActionConst.PUSH;
    // }

    if (targetScreen === 'FeedsScreenContainer' || targetScreen === 'ServiceAvailableListContainer') {
      type = 'reset'
    }

    if ((currentScreen == targetScreen) ) {
      type = 'refresh'
    }
    return type;
  }
}

const navigatorManager = new NavigatorManager();

module.exports = { navigatorManager };
