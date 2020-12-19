var _ = require('lodash')

var RDActionsTypes = require( '../actions/RDActionsTypes');

// components
var {globalVariableManager}= require('../components/modules/GlobalVariableManager');
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDUtil = require('./RDUtil');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

function initLoading(){
  let retObj={};
  Object.keys(RDActionsTypes.Notify).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

var notifyFormat={
  _id:'',
  title:'',
  description:'',
  link:'',
  icon:'',
  extras:{},
  notifiedAt:0,
}

function Notify(state ={
                ...initLoading(),
                lists:{
                  shop:[],
                  ship:[]
                }
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.Notify.add:{
      stateTemp = RDUtil.processReducerLoading(state,action,'add',
                {
                  onRequest: (stateTempIn) => {
                    if(_.get(globalVariableManager.reduxManager.state.AppSetting, 'mode', '') === 'shop'){
                      stateTempIn.lists.shop.unshift(action.data);
                    } else{
                      stateTempIn.lists.ship.unshift(action.data);
                    }
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.Notify.remove: {
      stateTemp = RDUtil.processReducerLoading(state,action,'remove',
                {
                  onRequest: (stateTempIn) => {
                    const id = action.data.id;
                    if(_.get(globalVariableManager.reduxManager.state.AppSetting, 'mode', '') === 'shop'){
                      const index = _.findIndex(stateTempIn.lists.shop, (element) => {
                        return element._id === id
                      })
                      if(index !== -1) {
                        stateTempIn.lists.shop.splice(index, 1);
                      }
                    } else{
                      const index = _.findIndex(stateTempIn.lists.ship, (element) => {
                        return element._id === id
                      })
                      if(index !== -1) {
                        stateTempIn.lists.ship.splice(index, 1);
                      }
                    }
                    return stateTempIn;
                  }
                })
      break;
    }
    case RDActionsTypes.Notify.removeAllNotify: {
      stateTemp = RDUtil.processReducerLoading(state,action,'removeAllNotify',
                {
                  onRequest: (stateTempIn) => {
                    if(_.get(globalVariableManager.reduxManager.state.AppSetting, 'mode', '') === 'shop'){
                      stateTempIn.lists.shop = [];
                    } else{
                      stateTempIn.lists.ship = [];
                    }

                    return stateTempIn;
                  }
                })
      break;
    }
    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      break;
  }

  return stateTemp;

}


module.exports= Notify;
