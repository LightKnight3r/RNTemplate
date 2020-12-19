var _ = require('lodash');
// LIB
var {
  Platform,
} = require('react-native');

var {Actions, ActionConst} = require('react-native-router-flux');
var DeviceInfo = require('react-native-device-info');
var RNFS = require('react-native-fs');
// components
var Define = require('../Define');
var Debug = require('../Util/Debug');

var RDActionsTypes = require( '../actions/RDActionsTypes');
var UserActions_MiddleWare = require( '../actions/UserActions_MiddleWare');
var {popupActions} = require('../components/popups/PopupManager');
import DefaultPopup from '../components/popups/DefaultPopup';
import NoNetworkPopup from '../components/popups/NoNetworkPopup'

//var
var {globalVariableManager} = require('../components/modules/GlobalVariableManager');

// var styles={
//   error:{
//     backgroundColor:'fff',
//     borderWidth:1,
//     borderColor:'#000',
//     borderRadius:4,
//     width:Define.constants.widthScreen*2/3,
//     alignItems:'center',
//   },
//   success:{
//     backgroundColor:'fff',
//     borderWidth:1,
//     borderColor:'#000',
//     borderRadius:4,
//     width:Define.constants.widthScreen*2/3,
//     alignItems:'center',
//   },
// }


/**
 * Reducer Tracker.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function Tracker(state ={} , action) {
  Debug.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',Debug.level.MARK);
  Debug.log('Reducers:Tracker:'+action.type+':'+action.subtype+':',Debug.level.USER_TRACKER);

  switch (action.subtype) {
    case RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS:
    switch (action.type) {
      case RDActionsTypes.Feeds.like:{
        popupActions.setRenderContentAndShow(
          DefaultPopup,
          {
            title:action.data.res.state ? 'Thích' : 'Đã thích',
            description:'Bạn '+ (action.data.res.state ? 'thích ' : 'đã thích ') + state.Feeds.mapId[action.data.arg.facebookId].facebook.name,
            description2:'(Lưu ý: dữ liệu được cập nhật vào bài đăng tới của shop)',
            onPressPopup:()=>{popupActions.popPopup()}
          });

        break;
      }
      case RDActionsTypes.Feeds.dislike:{
        popupActions.setRenderContentAndShow(
          DefaultPopup,
          {
            title:action.data.res.state ? 'Ghét' : 'Đã ghét',
            description:'Bạn '+ (action.data.res.state ? 'ghét ' : 'đã ghét ') + state.Feeds.mapId[action.data.arg.facebookId].facebook.name,
            description2:'(Lưu ý: dữ liệu được cập nhật vào bài đăng tới của shop)',
            onPressPopup:()=>{popupActions.popPopup()}
          });

        break;
      }
      default :
        break
      }
      break;
    case RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR:
      Debug.log(JSON.stringify(action.data),Debug.level.DATA_ERROR);
      if (action.data.errObj && action.data.errObj.data && action.data.errObj.data.code == 1993) {
        // popupActions.setRenderContentAndShow(
        //   DefaultPopup,
        //   {
        //     title:'',
        //     description:'Phiên đăng nhập đã hết hạn',
        //     onPressPopup:()=>{popupActions.popPopup()}
        //   })
        if(globalVariableManager.reduxManager.state.User.memberInfo?.member?.memberToken) {
          popupActions.popAllPopup();
          setTimeout(()=>{
            globalVariableManager.reduxManager.dispatch(UserActions_MiddleWare.logout())
              .then(() => {
                Actions.LoginScreen({
                  type: 'reset'
                })
              })
              .catch(() => {
                Actions.LoginScreen({
                  type: 'reset'
                })
              })
            globalVariableManager.rootView.drawSideMenu(false);
          },200)
        }
      } else if (action.data.errObj && action.data.errObj.message === 'Network Error') {
        popupCount = _.includes(popupActions.getPopupStack(), 'NoNetworkPopup')
        if(!popupCount){
          popupActions.setRenderContentAndShow(NoNetworkPopup)
        }
      }

      switch (action.type) {
        default:
          // display popup error
          if (action.data) {
            if (Define.constants.debug) {
              popupActions.setRenderContentAndShow(
                DefaultPopup,
                {
                  title:'ERROR:'+action.type,
                  description:JSON.stringify(action.data),
                  onPressPopup:()=>{popupActions.popPopup()}
                });
            }
          }
      }

      break;

    default:
  }

  var info =undefined;
  if (action.data&&action.data.res&&action.data.res.message && action.data.res.message!=='callback timeout') {
    info = action.data.res;
  }
  else if (action.data &&action.data.message && action.data.message!=='callback timeout') {
    info =action.data;
  }
  else if(action.data && action.data.errObj && action.data.errObj.data && action.data.errObj.data.message ){
    info= action.data.errObj.data;
  }
  // else if(action.data && action.data.body){
  //   info= action.data;
  // }

  //
  //
  if (info !== undefined && info.code && info.message && info.code !== 1993) {
      popupActions.setRenderContentAndShow(
      DefaultPopup,
      {
        title:info.message.head,
        description:info.message.body,
        onPress:() => {
          popupActions.popPopup();
        },
        buttonTitle:'OK'
      })
  }

  //
  Debug.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',Debug.level.MARK);

  // firstRunTracker=false;
  globalVariableManager.reduxManager.setState(state);

  return state;
}



module.exports= Tracker;
