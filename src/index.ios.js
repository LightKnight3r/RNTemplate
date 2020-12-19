/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React,{Component}  from 'react';
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
  View,
  AsyncStorage,
  Text,
  TextInput
} from 'react-native';

import { createStore,applyMiddleware,compose  } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist'
//
var Define = require('./Define');
var Debug = require('./Util/Debug');
var Util = require('./Util/Util');
Util.enableDebug();

// NOTE : must create global variable first of all
var {globalVariableManager}= require('./components/modules/GlobalVariableManager');
globalVariableManager.init();

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.2;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.2;

var App = require('./containers/App');
var todoApp = require('./reducers');

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

class SanShip extends Component {
  constructor() {
    super();
    this.state = {
        loading: true,
    };
    const enhancer = compose(
      applyMiddleware(thunk),
      autoRehydrate()
      );
    this.store = createStore(todoApp, enhancer);
    console.disableYellowBox = true;
    Define.init(()=>{
      persistStore(this.store, {storage: AsyncStorage,whitelist:['AppSetting', 'User', 'Notify']},
            ()=>{this.setState({loading:false});}
          )
    })
  }

  render() {
    if(this.state.loading){
      return (<View/>)
    }else{
      return (
          <Provider store={this.store}>
            <App wakeByLocation={this.props.UIApplicationLaunchOptionsLocationKey}/>
          </Provider>
        )
    }
  }
}



AppRegistry.registerComponent('sanship', () => SanShip);
