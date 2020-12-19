// import {
//   GoogleAnalyticsTracker,
//   GoogleTagManager,
//   GoogleAnalyticsSettings
// } from 'react-native-google-analytics-bridge';

import {
  AppState
} from 'react-native';

import analytics from '@react-native-firebase/analytics';

const _ = require('lodash');
const ms = require('ms');
const Define = require('../../Define');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

const AppStateActions_MiddleWare = require('../../actions/AppStateActions_MiddleWare');

class Analytics {
  constructor() {
    this.tracker = null;

    this.lastTimeGetConfig = Date.now();

    this.config = {};
  }

  init() {
    this.getConfig();

    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  getConfig() {
    // globalVariableManager.reduxManager.dispatch(AppStateActions_MiddleWare.getConfigAnalytics())
    // .then((result) => {
    //   this.lastTimeGetConfig = Date.now();
    //
    //   if(!_.isEqual(this.config, result.res.data)) {
    //     this.config = result.res.data;
    //
    //     if(this.config.isOpen) {
    //       // GoogleAnalyticsSettings.setOptOut(false);
    //       this.tracker = analytics();
    //     } else {
    //       // GoogleAnalyticsSettings.setOptOut(true);
    //       this.tracker = null;
    //     }
    //   }
    // })
  }

  track(...arg) {
    if(this.tracker) {
      const fnc = arg.shift();

      if(typeof this.tracker[fnc] === 'function') {
        this.tracker[fnc](...arg);
      }
    }
  }

  handleAppStateChange(currentAppState) {
    switch (currentAppState) {
      case 'active': {
        if(Date.now() - this.lastTimeGetConfig >= ms('1d')) {
          setTimeout(() => {
            this.getConfig();
          }, 500);
        }

        break;
      }

      default:
    }
  }
}

module.exports = new Analytics
