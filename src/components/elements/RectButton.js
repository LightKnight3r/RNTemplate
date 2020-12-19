//LIB
import React from 'react';

var {
  View,
  TouchableOpacity
} = require('react-native');

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Include = require('../../Include');
//variable

var createReactClass = require('create-react-class');


var RectButton = createReactClass({
  getDefaultProps:function(){
    var self = this;
    return{
      onPress:self._handlePress,
    }
  },
  _handlePress() {
    Debug.log('Pressed!');
  },
  render:function(){
    var self = this;
    var widthButton = Define.constants.widthScreen*1.4/4;
    return(
      <TouchableOpacity onPress={self.props.onPress}>
        <View style={[{
              width:widthButton,height:45,
              margin:4,
              borderRadius:4,
              justifyContent:'center',backgroundColor:'#58a12b'
            },self.props.style]}>
          {self.props.backgroundImage?
            <View style={[{position:'absolute',top:0,bottom:0,left:0,right:0},self.props.backgroundImageStyle ]}>
              <Include.Image
                resizeMode='stretch'
                tintColor={self.props.backgroundImageColor}
                style={[{
                  flex:1,
                  width:self.props.style.width?self.props.style.width: widthButton,
                  height:self.props.style.height?self.props.style.height: 45,
                  // width:170,height:40
                  // transform:[{scaleX:1},{scaleY:1}]
                },
                self.props.imageStyle,
                ]}
                source={self.props.backgroundImage}/>
            </View>
            :
            null
          }
          <View  style={[{alignSelf:'flex-start',paddingHorizontal:5},self.props.contentStyle ]}>
            {self.props.children}
            <Include.Text numberOfLines={1} custom={true} style={[{color:'#FFF',marginLeft:5,fontSize:13},self.props.textStyle]}>{self.props.text}</Include.Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  },
})

module.exports=RectButton;
