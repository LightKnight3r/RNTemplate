var _ = require('lodash')

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
var Themes = require('../../../Themes');
import { connect } from 'react-redux';
var Define = require('../../../Define');

class BottomTabBarListService extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = _.merge(this.state,
    {})

    this.icons = [];
    this.names = [];
  }

  componentDidMount() {
    this.setAnimationValue({value: this.props.tabFocus || 0})
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  }

  componentWillUnmount() {
    this.props.scrollValue.removeListener(this.setAnimationValue);
    this._listener = null;
  }

  setAnimationValue = ({ value }) => {
    this.icons.forEach((icon, i) => {
      const progress = (Math.abs(value - i) >= 0 && Math.abs(value - i) <= 1) ? Math.abs(value - i) : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress)
        }
      });
    });

    this.names.forEach((name, i) => {
      const progress = (Math.abs(value - i) >= 0 && Math.abs(value - i) <= 1) ? Math.abs(value - i) : 1;
      name.setNativeProps({
        style: {
          color: this.iconColor(progress)
        }
      });
    });
  }

  //color between rgb(34, 111, 183) and rgb(154, 163, 170)
  iconColor(progress) {
    const red = Math.round((1 - progress) * 34 + progress * 154);
    const green = Math.round((1 - progress) * 111 + progress * 163);
    const blue = Math.round((1 - progress) * 183 + progress * 170);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return <View style={[styles.tabs, this.props.style]}>
      {this.props.tabs.map((tab, i) => {
        let icon;
        if (tab === 'Trang chủ') {
          icon = 'md-home';
        } else if (tab === 'Lịch sử') {
          icon = 'ios-timer';
        } else if (tab === 'Phản hồi') {
          icon = 'md-help-circle';
        } else if (tab === 'Tài khoản') {
          icon = 'md-person';
        }
        return <TouchableOpacity
          key={tab}
          // ref={(ref) => {
          //   if(tab === 'Đơn Facebook') {
          //     this.props.setRefsForHint('fb_order', ref);
          //   } else {
          //     this.props.setRefsForHint('system_order', ref);
          //   }
          // }}
          onPress={() => this.props.goToPage(i)}
          style={styles.tab}>
          <View
            style={{flexDirection:'column', alignSelf:'center', alignItems:'center', justifyContent:'center'}}
          >
            <View>
              <Icon
                name={icon}
                style={{fontSize: 20, backgroundColor: 'transparent', color: '#226FB7'}}
                ref={(icon) => { this.icons[i] = icon; }}
              />
              {tab === 'Tài khoản' && this.props.notifications.count ?
                <View
                  pointerEvents={'none'}
                  style={{position: 'absolute', right: -7, top: -3, width: 14, height: 14, borderRadius: 7, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center'}}>
                    <Text numberOfLines={1} style={{color: '#fff', backgroundColor: 'transparent', fontSize: 9}}>{this.props.notifications.count}</Text>
                </View> : null
              }
            </View>
            <View>
              <Text
                ref={(name) => { this.names[i] = name; }}
                style={{fontSize: 15, backgroundColor: 'transparent', color: '#226FB7'}}>
                {tab}</Text>
            </View>
          </View>

        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  },
  tabs: {
    elevation: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {height: -2, width:0},
    borderColor: '#000',
    shadowRadius: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  }
});
function selectActions(state) {
  return {
    appSetting: state.AppSetting,
    notifications: state.Notifications
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(BottomTabBarListService);
