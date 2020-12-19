
// var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');
import RDActions_MiddleWare from './RDActions_MiddleWare'

// LIB

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDActions = require('./RDActions');

// NOTE : stuck when call getState (when dispatch another action in a action)

/*
 * action creators
 */

class TempActions_MiddleWare extends RDActions_MiddleWare {
  constructor(){
    super('TempActions_MiddleWare',true);
    this.init();
  }
  actionsList={
    action:{
      query:'',
      argFormat:{},
      argMap:{},
      limitProcess:1,
      onArg:undefined, //(arg,getState)=>{return arg;},
      onError:undefined, // (dispatch,getState,data)=>{return true},
      onDone:undefined, // (dispatch,getState,data)=>{return true},
    },
  }
}


module.exports= new TempActions_MiddleWare();
