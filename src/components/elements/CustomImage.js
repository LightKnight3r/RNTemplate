//@flow
import React from 'react';
import {Image,StyleSheet,ImageBackground, Platform, ActivityIndicator} from 'react-native';

var Define = require('../../Define');
var createReactClass = require('create-react-class');

var CustomImage= createReactClass({
  getInitialState:function(){
    return({
      state:0, // 0 ;loading , 1 : done , -1 error
    })
  },
  onLoad:function(){
    var self = this;
    self.setState({state:1});
  },
  onLoadEnd:function(){
    var self= this;
    if (self.state.state===0) {
        self.setState({state:-1});
    }

  },
  // onLoadStart:function(){
  // },
  render:function(){
    var self = this;
    if ((self.props.source && self.props.source.isStatic ) ||
      (!self.props.style || !StyleSheet.flatten(self.props.style).width || !StyleSheet.flatten(self.props.style).height)) {
      return(
        <ImageBackground {...self.props}>
          {self.props.children}
        </ImageBackground>
      )
    }

    var styleForView={
      width:StyleSheet.flatten(self.props.style).width,
      height:StyleSheet.flatten(self.props.style).height,
    }


    var children = null;
    if (self.state.state === 0) {
      children = (<ActivityIndicator size={'small'} style={styleForView} />)
    } else if (self.state.state === -1) {
      children=<Image
          source ={Define.assets.defaultIcon}
          resizeMode={'stretch'}
          style={self.props.style}/>
    }


    return(
      <ImageBackground
          renderToHardwareTextureAndroid={true}
          onLoad={self.onLoad}
          onLoadEnd={self.onLoadEnd}
          {...self.props}>
        {children}
      </ImageBackground>
    )
  }
})


module.exports = CustomImage;
