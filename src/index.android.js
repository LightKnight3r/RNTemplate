/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component}  from 'react';
import {
  AppRegistry,
  NativeModules,
  View,
  AsyncStorage,
  Platform,
  Text,
  TextInput
} from 'react-native';

import { createStore,applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist'
//var GcmAndroid = require('react-native-gcm-android');
import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import {createReducer, setStoreInstance} from './reducers';


//
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.2;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.2;

var Util = require('./Util/Util');

var notifyFormat={
  _id:'',
  title:'',
  bigImgage:'',
  description:'',
  link:'',
  extras:{},
  createAt:0,
  expiredAt:0,
}

// if (GcmAndroid.launchNotification) {
//   var notification = GcmAndroid.launchNotification;
//   // GcmAndroid.applyBadgeCount(1);
//   // NOTE : must be console.log
//   // console.log(notification);
//   try{
//     notification.extras = JSON.parse(notification.extras);
//   }catch(ex){};
//   var temp = Util.dataProtectAndMap(notification, notifyFormat);
//   // var info = JSON.parse(notification.info);
//   Notification.create({
//     id: temp._id,
//     subject: temp.title,
//     message: temp.description,
//     bigText : temp.description,
//     smallIcon: 'ic_launcher',
//     bigStyleUrlImgage :temp.bigImgage ? temp.bigImgage:undefined,
//     autoClear: true,
//     category : 'event',
//     sound:(temp.link === 'WebRTC' && Platform.OS === 'android' )?'default_rington':'default',
//     vibrate :'default',
//     lights :'default',
//     payload: {
//       time:Date.now(),
//       deepLink:temp.link,
//       extras:temp.extras,
//     }
//   });
//   GcmAndroid.stopService();
// } else {
  var Define = require('./Define');

  // NOTE : must create global variable first of all
  var {globalVariableManager}= require('./components/modules/GlobalVariableManager');

  globalVariableManager.init();
  Util.enableDebug();
  var App = require('./containers/App');
  var todoApp = require('./reducers');

    // variable

  class GZ extends Component {
    constructor() {
      super();

      this.state = {
          loading: true,
      };

      const middlewareNav = createReactNavigationReduxMiddleware(state => state.nav);
      const enhancer = compose (
        applyMiddleware(thunk),
        autoRehydrate(),
        applyMiddleware(middlewareNav)
      );
      this.store = createStore(createReducer(), enhancer);
      setStoreInstance(this.store)
      console.disableYellowBox = true;
      Define.init(() => {
        persistStore(
          this.store,
          {storage: AsyncStorage, whitelist: ['AppSetting', 'User', 'Notify']},
          () => {this.setState({loading: false})}
        )
      })

      // const enhancer = compose(
      //   applyMiddleware(thunk),
      //   autoRehydrate()
      //   );
      // this.store = createStore(todoApp, enhancer);
      // console.disableYellowBox = true;
      // Define.init(()=>{
      //   persistStore(this.store, {storage: AsyncStorage,whitelist:['AppSetting','User', 'Notify']},
      //         ()=>{this.setState({loading:false});}
      //       )
      // })
    }

    render() {
      if(this.state.loading){
        return (<View/>)
      }else{
        return (
            <Provider store={this.store}>
              <App/>
            </Provider>
          )
      }
    }
  }



  AppRegistry.registerComponent('GZ', () => GZ);
//}
