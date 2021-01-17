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
  }

}

const incomingLinkingManager = new IncomingLinkingManager()

module.exports= incomingLinkingManager;
