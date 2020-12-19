
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';

// import { connect } from 'react-redux';

//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Util = require('../../Util/Util');
// var Themes = require('../../Themes');
// var Include = require('../../Include');
import {Icon} from 'native-base';

var {popupActions} = require('../popups/PopupManager');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

//Actions
// var Actions_MiddleWare = require('../../actions/Actions_MiddleWare');
// var RDActions = require('../../actions/RDActions');
import UploadFilePopup from '../popups/UploadFilePopup';

class UploadFileManager{
  // static defaultProps = {}
  // static propTypes = {}
  constructor(){
    this.fileStorage = {}
    this.holdRef = {}
    this.indiRef = {}
    this.closeRef = {}
    this.sendRef = {}
    this.handleDisplayComponent = this.handleDisplayComponent.bind(this);
  }

  declineFile(id) {
    fetch(`${Define.constants.serverMediaAddr}/api/v1.0/decline-file`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: this.fileStorage[id].url
      })
    })
    .then((result) => {
      delete this.fileStorage[id]
    })
    .catch((err) => {});
  }

  addFile(id, type, file) {
    let objType = {};
    objType[type] = file;
    this.fileStorage[id] = objType
  }

  getComponent(id, closeObj, sendObj ) {

    return(
      <View ref={ref => this.holdRef[id] = ref} style={{flex:1, opacity:0.5}}>
        <Image
          style={{flex: 1,
          width: null,
          height: null,
          resizeMode: 'contain'}}
          source={{uri:this.getFile(id)['local']}}
        />
        <View
          ref={ref => this.indiRef[id] = ref}
          style={{ display:'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size={'large'}
           />
        </View>
        {closeObj ?
          <View
            ref={ref => this.closeRef[id] = ref}
            style={{display:'none',alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:15, backgroundColor:'#0984e3', top: 0, right: 0, position: 'absolute', ...closeObj.buttonStyle}}
          >
            <TouchableOpacity
              onPress={() => {
                closeObj.onPressClose();
              }}
            >
              <View
                style={{flex:1, justifyContent:'center', alignItem:'center'}}>
                <Icon name='md-close' style={{fontSize:20, color:'#fff', ...closeObj.iconStyle}} />
              </View>
            </TouchableOpacity>
          </View>
        :null}
        {sendObj?
          <View
            ref={ref => this.sendRef[id] = ref}
            style={{display:'none', height:70, width:150, flexDirection:'row', backgroundColor:'#fff', borderRadius:35, alignItems: 'center', alignSelf:'center', justifyContent:'center', position: 'absolute', top:Define.constants.heightScreen/2-50}}>
            <TouchableOpacity
              onPress={() => {
                sendObj.onPressSend();
              }}
            >
              <View
                style={{height:70, width:150, flexDirection:'row', backgroundColor:'#fff', borderRadius:35, alignItems: 'center', alignSelf:'center', justifyContent:'center'}}
              >
                <Text style={{color:'#0984e3', fontSize:25}}>GỬI ẢNH</Text>
              </View>
            </TouchableOpacity>
          </View>
        :null}
      </View>
    )
  }

  getFile(id) {
    return this.fileStorage[id];
  }

  handleDisplayComponent(id) {
    if(this.holdRef[id]) {
      this.holdRef[id].setNativeProps({
        style: {
          opacity: 1
        }
      })
    }
    if(  this.indiRef[id]) {
      this.indiRef[id].setNativeProps({
        style: {
          display: 'flex',
        }
      })
    }

    if(this.closeRef[id]) {
      this.closeRef[id].setNativeProps({
        style: {
          display: 'flex',
        }
      })
    }

    if(this.sendRef[id]) {
      this.sendRef[id].setNativeProps({
        style: {
          display: 'flex',
        }
      })
    }
  }

  upload(arg){

    var argFormat={
      fileUpload: '',
    }
    var argTemp = Util.dataProtectAndMap(arg, argFormat);

    var req ;
    // req config
    var temp = new FormData();

    if(arg.fileUpload) {
      temp.append('fileUpload', {
        uri: arg.fileUpload,
        name: arg.fileName ? arg.fileName : "image.jpg",
        type: 'multipart/form-data'
      })
      temp.append('folder', arg.folder);
    }
    req = temp;
    //
    var data = {};
    var promise = new Promise((resolve,reject)=>{

      const serverAddr = Define.constants.serverMediaAddr
      const preLinkApi = '/api/v1.0'
      const query = '/upload-single'
      fetch(`${serverAddr}${preLinkApi}${query}`,{
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: req
      })
      .then((response) => {
        return response.json()
      })
      .then((response)=>{
        if(response.code === 200) {
          var res = response;
          data={
            arg:argTemp,
            res:res,
          }
          this.addFile(arg.id, 'url', res.filename ? res.filename : '')
          this.handleDisplayComponent(arg.id);
          resolve(data);
        }else{
          if(argTemp.fileUpload) {
            globalVariableManager.rootView.showToast('Gửi ảnh thất bại');
          }
          return Promise.reject(response)
        }
      })
      .catch((err)=>{
        if(argTemp.fileUpload) {
          globalVariableManager.rootView.showToast('Gửi ảnh thất bại');
        }
        data={
          arg:argTemp,
          err:JSON.stringify(err),
          res:err,
          errObj:err,
        }
        reject(data);
      })
    })
    return promise;
  }

}

const uploadFileManager = new UploadFileManager()
module.exports = uploadFileManager;
