const Define = require('../../Define');
if (window.navigator) {
  window.navigator.userAgent = "react-native";
}
class GlobalVariableManager{
  constructor(){
    this.init = this.init.bind(this);
  }
  init(){
    this.reduxManager =require('./ReduxManager').reduxManager;
    this.navigatorManager = require('./NavigatorManager').navigatorManager;
  }
}

const globalVariableManager = new GlobalVariableManager();

module.exports={globalVariableManager};
