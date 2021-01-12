/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';
import codePush from "react-native-code-push";

import React, { Component }  from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

import { createReduxContainer, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
//
var Define = require('./src/Define');
var Util = require('./src/Util/Util');
Util.enableDebug();

// NOTE : must create global variable first of all
var {globalVariableManager} = require('./src/components/modules/GlobalVariableManager');
globalVariableManager.init();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.3;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.3;

var App = require('./src/containers/App');
import {createReducer, setStoreInstance} from './src/reducers';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// var store = createStoreWithMiddleware(todoApp);
// variable
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class GZ extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
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
  }

  render() {
    if (this.state.loading) {
      return <View />
    } else {
      return (
        <Provider store={this.store}>
          <App wakeByLocation={this.props.UIApplicationLaunchOptionsLocationKey} />
        </Provider>
      )
    }
  }
}

const updateDialog = {
  appendReleaseDescription: false,
  descriptionPrefix: " Description: ",
  mandatoryContinueButtonLabel: "Cài đặt",
  mandatoryUpdateMessage: "Bản cập nhật mới cải tiến sửa lỗi ứng dụng. Bạn vui lòng cho phép ứng dụng cài đặt. Sau đó chờ trong giây lát. Xin cảm ơn.",
  optionalIgnoreButtonLabel: "Bỏ qua",
  optionalInstallButtonLabel: "Cài đặt",
  optionalUpdateMessage: "Bản cập nhật mới cải tiến sửa lỗi ứng dụng. Bạn vui lòng cho phép ứng dụng cài đặt. Sau đó chờ trong giây lát. Xin cảm ơn.",
  title: "Cập nhật ứng dụng"
}
AppRegistry.registerComponent('gz', () => codePush({ updateDialog, installMode: codePush.InstallMode.IMMEDIATE, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(GZ));
