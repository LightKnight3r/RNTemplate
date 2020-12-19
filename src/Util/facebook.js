import React  from 'react';
import {
  Linking
} from 'react-native';

import DefaultPopup from '../components/popups/DefaultPopup'
import CommentClosedGroupPopup from '../components/popups/WebviewCommentPopup'

const Debug = require('./Debug')
const {popupActions} = require('../components/popups/PopupManager')
const prefixApp = 'https://www.facebook.com';
const prefixWeb = 'https://facebook.com';
const prefixMessenger = 'http://m.me/';
var {globalVariableManager}= require('../components/modules/GlobalVariableManager');
module.exports = {
  goTo: (id, real = false) => {
    let url;
    if(real) {
      url = `${prefixApp}/${id}`;
    } else {
      url = `${prefixWeb}/${id}`;
    }

    openLink(url);
  },
  goToOrder: (id) => {
    const list = id.split("_");
    const url = `https://m.facebook.com/${list[1]}`;
    openLink(url);
  },
  goToMessenger: (id) => {
    let url = `${prefixMessenger}${id}`;
    Linking
      .canOpenURL(url)
      .then((supported) => {
        if(!supported) {
          return new Promise.reject();
        } else {
          return Linking.openURL(url);
        }
      }).catch((err) => {
        Debug.log2('[Linking] Fail when open url: ', err);
        popupActions.setRenderContentAndShow(DefaultPopup,{
          title:'Thông báo',
          description: 'Đã có lỗi xảy ra vui lòng thử lại',
          buttonTitle:'OK',
          onPress:()=>{popupActions.popPopup()}
        })
      });
  }
}

function openLink(link) {
  if(globalVariableManager.reduxManager.state.AppSetting.setOpenFb==='Trong app'){
    popupActions.setRenderContentAndShow(CommentClosedGroupPopup, {
      uri: link
    })
  }else{
    Linking
      .canOpenURL(link)
      .then((supported) => {
        if(!supported) {
          return new Promise.reject();
        } else {
          return Linking.openURL(link);
        }
      }).catch((err) => {
        Debug.log2('[Linking] Fail when open url: ', err);
        popupActions.setRenderContentAndShow(DefaultPopup,{
          title:'Thông báo',
          description: 'Đã có lỗi xảy ra vui lòng thử lại',
          buttonTitle:'OK',
          onPress:()=>{popupActions.popPopup()}
        })
      });
  }
}
