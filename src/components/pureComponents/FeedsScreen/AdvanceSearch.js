
var _ = require('lodash')

//LIB
import React  from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Switch,
  Slider,
  Platform,
  TouchableOpacity
} from 'react-native';

var {Actions} = require('react-native-router-flux');
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { Icon, Text, Button, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';
//action

//components
var Define = require('../../../Define');
var Debug = require('../../../Util/Debug');
var Themes = require('../../../Themes');
var Util = require('../../../Util/Util');
var Include = require('../../../Include');

var {popupActions} = require('../../popups/PopupManager');
var {globalVariableManager}= require('../../modules/GlobalVariableManager');

var ButtonWrap = require('../../elements/ButtonWrap');

//screens

// popups
import DefaultPopup from '../../popups/DefaultPopup';

class AdvanceSearch extends React.PureComponent {
  constructor() {
    super();

    this.renderAdvanceSearch = this.renderAdvanceSearch.bind(this);
    this.getTextSearch = this.getTextSearch.bind(this);
    this.getSalarySearchText = this.getSalarySearchText.bind(this);
    this.getDepositSearchText = this.getDepositSearchText.bind(this);
    this.setNativePropsTextSearch = this.setNativePropsTextSearch.bind(this);
    this.setNativePropsSalaryText = this.setNativePropsSalaryText.bind(this);
    this.setNativePropsDepositText = this.setNativePropsDepositText.bind(this);
  }

  getTextSearch() {
    let text = '';
    if(this._textSearchInputWrap) {
      text = (this._textSearchInputWrap.valueText || '').trim();
    }

    return text;
  }

  getSalarySearchText() {
    let value = 0;
    if(this.shipInputText && this.shipInputText.valueText) {
      const temp = parseInt((this.shipInputText.valueText.replace(/[.]| |₫/g, '') || '').trim());
      if(!isNaN(temp)) {
        value = temp
      }
    }

    return value;
  }

  getDepositSearchText() {
    let value = 0;
    if(this.depositInputText && this.depositInputText.valueText) {
      const temp = parseInt((this.depositInputText.valueText.replace(/[.]| |₫/g, '') || '').trim());
      if(!isNaN(temp)) {
        value = temp
      }
    }

    return value;
  }

  setNativePropsTextSearch(text) {
    if(this._textSearchInput) {
      this._textSearchInput.setNativeProps({
        text: text
      });
    }
  }

  setNativePropsSalaryText(text) {
    text += '';
    if(this._textSalarySearch) {
      this._textSalarySearch.setNativeProps({
        text: text
      });
    }
  }

  setNativePropsDepositText(text) {
    text += '';
    if(this._textDepositSearch) {
      this._textDepositSearch.setNativeProps({
        text: text
      });
    }
  }

  renderAdvanceSearch(){
    var {dispatch} = this.props;
    return(
      <View>

        <View style={{
            borderTopLeftRadius:20,
            borderTopRightRadius: 20,
            backgroundColor:Themes.current.factor.backgroundColor,
            padding:10
          }}>

          <Include.Text style={{fontSize:14,textAlign:'center',color:'#FFC300', paddingBottom: 5}}>
              Khoảng cách đang được tính từ vị trí của bạn
          </Include.Text>
          {this.props.radius ?
            <View
              style={{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Include.Text style={{color: '#fff', fontSize:13}}>Chỉ hiện thị đơn hàng {'<'} {this.props.radius} km </Include.Text>
              <Switch
                onTintColor = {'#000'}
                onValueChange={this.props.onChangeSearchResult}
                value={this.props.onlySearchResult} />
            </View> : null}
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:4}}>
            <Include.Text style={{color:'#fff'}}>Bán kính</Include.Text>
            <Slider
              style={{height:20, flex:1,marginHorizontal:6}}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={this.props.radius}
              onSlidingComplete={this.props.onChangeDistanceFilter} />
            {this.props.radius === 0?
              (<Include.Text>Tắt</Include.Text>):
              (<Include.Text style = {{color: '#fff'}}>{this.props.radius}</Include.Text>)}
            {this.props.radius === 0?
              null:
              (<Include.Text style={{color:'#fff'}}> KM</Include.Text>)}

          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{width: 85}}>
            <Include.Text style={{color:'#fff'}}>{'Tiền Ship: > '}</Include.Text>
            </View>
            <Include.TextInput
                ref={(obj)=>{this.shipInputText = obj}}
                refProp={(ref)=>{this._textSalarySearch = ref}}
                keyboardType='numeric'
                underlineColorAndroid ='transparent'
                defaultValue={this.props.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ' ₫'}
                style={[Themes.current.text.input, {color: '#000', backgroundColor: '#fff', borderRadius: 15, right: 5},Platform.OS==='ios'?{height: 30}:{}]}
                onFinishEditing ={this.props.onChangeSalarySearchText}
                onChangeText={text => {
                  if(Platform.OS === 'android') {
                    let rawValuePrepare = text.replace(/\./g, "");
                    const rawValue = rawValuePrepare.replace(" ₫","");
                    const diff = this.findCharacterChange(rawValue,this.props.salary.toString())
                    if(this.keyPressed === 'Backspace') {
                      this.props.onChangeText(text, this.keyPressed , 'salary')
                      this.keyPressed = '';
                    } else {
                      this.props.onChangeText(text, diff , 'salary')
                    }
                  } else {
                    this.props.onChangeText(text, this.keyPressed, 'salary')
                  }

                }}
                onKeyPress={(e) => {
                  this.keyPressed = e.nativeEvent.key;
                }}
              />
            <Switch
              onTintColor = {'#000'}
              onValueChange={this.props.onChangeStatusSalarySearch}
              value={this.props.salaryOn} />
          </View>
          <View style={{flexDirection:'row',alignItems:'center', paddingTop: 3}}>
          <View style={{width: 85}}>

            <Include.Text style={{color:'#fff'}}>{'Tiền Ứng: < '}</Include.Text>
            </View>
            <Include.TextInput
                ref={(obj)=>{this.depositInputText=obj}}
                refProp={(ref)=>{this._textDepositSearch=ref}}
                keyboardType='numeric'
                returnKeyType = 'done'
                underlineColorAndroid ='transparent'
                defaultValue={this.props.deposit.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ' ₫'}
                style={[Themes.current.text.input, {color: '#000', backgroundColor: '#fff', borderRadius: 15, right: 5},Platform.OS==='ios'?{height: 30}:{}]}
                onFinishEditing ={this.props.onChangeDepositSearchText}
                onChangeText={text => {
                  if(Platform.OS === 'android') {
                    let rawValuePrepare = text.replace(/\./g, "");
                    const rawValue = rawValuePrepare.replace(" ₫","");
                    const diff = this.findCharacterChange(rawValue,this.props.deposit.toString())
                    if(this.keyPressed === 'Backspace') {
                      this.props.onChangeText(text, this.keyPressed , 'deposit')
                      this.keyPressed = '';
                    } else {
                      this.props.onChangeText(text, diff , 'deposit')
                    }

                  } else {
                    this.props.onChangeText(text, this.keyPressed, 'deposit')
                  }
                }}
                onKeyPress={(e) => {
                  this.keyPressed = e.nativeEvent.key;
                }}
              />
            <Switch
              onTintColor = {'#000'}
              onValueChange={this.props.onChangeStatusDepositSearch}
              value={this.props.depositOn} />
          </View>

        </View>
        <View
          style ={{
            backgroundColor:'#01cca1',
            paddingHorizontal:4,
            paddingVertical:2,
            alignSelf:'center',
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            borderTopWidth: 1,
            borderTopColor:'#fff',
            flexDirection:'row',
            alignItems:'center'
          }}>

          <Include.TextInput
              ref={(ref)=>{this._textSearchInputWrap = ref}}
              refProp={(ref)=>{this._textSearchInput=ref}}
              underlineColorAndroid ='transparent'
              placeholder={'Địa chỉ (Cầu Giấy, Xã Đàn...)'}
              returnKeyType='search'
              placeholderTextColor='#bdc3c7'
              style={{
                  textAlign: 'center',
                  flex:1,
                  paddingRight: 5,
                  paddingLeft: 5,
                  marginLeft:10,
                  height:40,
                  fontSize: 15,
                  color: '#fff'
              }}
              onFocus ={()=>{
              }}
              onEndEditing ={()=>{
              }}
              onFinishEditing={this.props.onChangeTextSearch}/>
        </View>
        <View style={{height: 50}} />
      </View>
    )
  }

  findCharacterChange(firstString, secondString) {
    const firstArr = firstString.split("");
    const secondArr = secondString.split("");
    for (let i = 0; i < firstArr.length; i++) {
      if(firstArr[i] !== secondArr[i]) {
        return firstArr[i];
      }
    }
  }

  render() {
    return (
      <View style={{
        position:'absolute',
        bottom:-50,left:10,right:10,
        elevation:7,
        zIndex: Platform.OS === 'ios' ? 1 : null
      }}>
        <Animatable.View
          ref='searchView'
          style ={{
            opacity:1,
          }}>
          <Accordion
            sections={['1']}
            underlayColor={'transparent'}
            ref={ref => this.props.setRefsAdvanceSearch(ref)}
            touchableComponent={TouchableOpacity}
            onChange={(value)=>{
              if (value) {
                // this.refs.searchView.transitionTo({opacity:1})
              }
            }}
            renderHeader={(content, index, isActive)=>{
              return(
                <View style={{alignItems:'center',height:50}}>
                  <View
                    style={{
                      borderRadius:25,height:50,width:50,backgroundColor:Themes.current.factor.backgroundColor,
                      alignItems:'center',bottom:-25
                    }}>
                    <Icon name={isActive? 'md-arrow-dropdown':'md-arrow-dropup'}
                        style={{top:-8,fontSize:50,color:'#fff', backgroundColor: 'transparent'}} />
                  </View>

                </View>
              )
            }}
            renderContent={this.renderAdvanceSearch}
            />

        </Animatable.View>
      </View>
    )
  }
}

function selectActions(state) {
  return {
    navigator: state.Navigator,
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(AdvanceSearch);
