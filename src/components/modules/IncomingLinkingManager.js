import {
  Platform,
  PermissionsAndroid,
  Linking
} from 'react-native';

const Debug = require('../../Util/Debug')
const Util = require('../../Util/Util')
import {globalVariableManager} from './GlobalVariableManager';
import UserActions_MiddleWare from '../../actions/UserActions_MiddleWare';

class IncomingLinkingManager {
  constructor() {
    this.init();
  }

  init() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleURL(url);
      }
    })

    Linking.addEventListener('url', (event) => {
      this.handleURL(event.url);
    });
  }

  handleURL(url) {
    const appName = url.replace("sanshipvietnam://", "").split("/")[0];
    if(appName === 'vimowallet') {
      this.handleViMoLinking(url)
    }
  }

  handleViMoLinking(url) {
    const path = url.replace("sanshipvietnam://vimowallet/", "").split("/");
    if(path.length === 2) {
      setTimeout(() => {
        globalVariableManager.reduxManager.dispatch(UserActions_MiddleWare.getInfoCheckout({
         token_code: path[0],
         transaction_code: path[1]
        }));
      }, 1000);
    } else {
      globalVariableManager.rootView.showToast("Giao dịch không thành công");
    }
  }
}

const incomingLinkingManager = new IncomingLinkingManager()

module.exports= incomingLinkingManager;
