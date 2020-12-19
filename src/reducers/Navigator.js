
// var RDActionsTypes = require( '../actions/RDActionsTypes');
var {ActionConst} = require( 'react-native-router-flux');
import { NavigationActions, StackActions } from 'react-navigation';
var Debug = require('../Util/Debug');

/**
 * Reducer for Navigator.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function Navigator(state ={
      stack: ['LoginScreen'],
      currentScreen: {
        name: 'LoginScreen'
      },
      navigating:false,
      dstScreenName:'',
    } , action) {

  // Debug.log(action)
  var stateTemp =state;
  switch (action.type) {
    case ActionConst.FOCUS:{
      stateTemp = Object.assign({}, state);
      stateTemp.navigating = false;
      if(!stateTemp.stack.length) {
        stateTemp.stack.push(action.routeName);
      }

      stateTemp.currentScreen.name = action.routeName;
      Debug.log('Navigator:FOCUS : '+action.routeName,Debug.level.USER_TRACKER);
      return  stateTemp ;
    }
    case StackActions.PUSH:{
      stateTemp = Object.assign({}, state);
      stateTemp.navigating = true;
      stateTemp.dstScreenName = action.routeName;
      stateTemp.stack.push(action.routeName);
      Debug.log('Navigator:PUSH : '+action.routeName,Debug.level.USER_TRACKER);
      return  stateTemp ;
    }
    case NavigationActions.NAVIGATE:{
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:JUMP : '+action.routeName,Debug.level.USER_TRACKER);

      return  stateTemp ;
    }
    case StackActions.RESET: {
      Debug.log('Navigator:RESET : '+ action,Debug.level.USER_TRACKER);
      stateTemp.stack = [action?.actions[0] && action?.actions[0]?.routeName ? action?.actions[0]?.routeName : action.routeName];
      return  stateTemp ;
    }

    case ActionConst.REPLACE:{
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:REPLACE : '+action.routeName,Debug.level.USER_TRACKER);
      stateTemp.stack.pop();
      stateTemp.stack.push(action.routeName);
      return  stateTemp ;
    }
    case NavigationActions.BACK:{
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:BACK : '+action.routeName,Debug.level.USER_TRACKER);
      stateTemp.stack.pop();
      return  stateTemp ;
    }
    case ActionConst.PUSH_OR_POP: {
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:PUSH_OR_POP : '+action.routeName,Debug.level.USER_TRACKER);

      return  stateTemp ;
    }
    case ActionConst.BACK_ACTION:{
      stateTemp = Object.assign({}, state);
      stateTemp.stack.pop();
      Debug.log('Navigator:BACK_ACTION : '+action.routeName,Debug.level.USER_TRACKER);
      return  stateTemp ;
    }
    case ActionConst.POP_TO:{
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:POP_TO : '+ action,Debug.level.USER_TRACKER);
      stateTemp.stack.splice(stateTemp.stack.indexOf(stateTemp?.currentScreen?.name));
      return  stateTemp ;
    }
    case NavigationActions.SET_PARAMS:{
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:REFRESH : '+action.routeName,Debug.level.USER_TRACKER);
      return  stateTemp ;
    }
    case ActionConst.ANDROID_BACK: {
      stateTemp = Object.assign({}, state);
      Debug.log('Navigator:ANDROID_BACK : '+action.routeName,Debug.level.USER_TRACKER);
      stateTemp.stack.pop();
      return  stateTemp ;
    }

    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      return stateTemp
  }
}


module.exports= Navigator;
