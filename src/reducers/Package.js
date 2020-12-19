var _ = require('lodash')

var RDActionsTypes = require( '../actions/RDActionsTypes');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var RDUtil = require('./RDUtil');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

function initLoading(){
  let retObj={};
  Object.keys(RDActionsTypes.Package).forEach((key)=>{
    if (key === 'constants') { return;}
    retObj[key] = {loading:0};
  })
  return retObj;
}

const packageInfFormat = {
  "_id": "",
  "name": "",
  "price": 0,
  "bonus": 0,
  "time": 0
}

function Package(state ={
                ...initLoading(),
                list: [],
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case RDActionsTypes.Package.list:{
      stateTemp = RDUtil.processReducerLoading(state,action,'list',
                {
                  onRequest: (stateTempIn) => {
                    stateTempIn.list = [];
                    return stateTempIn;
                  },
                  onSuccess:(stateTempIn)=>{ 
                    const packages = action.data.res.data;
                    packages.forEach((packageInf) => {
                      stateTempIn.list.push(Util.dataProtectAndMap(packageInf,packageInfFormat));
                    });
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


module.exports= Package;
