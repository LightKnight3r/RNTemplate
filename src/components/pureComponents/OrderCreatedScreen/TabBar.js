var _ = require('lodash')

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
var Themes = require('../../../Themes');
import { connect } from 'react-redux';
var Define = require('../../../Define');
import LinearGradient from 'react-native-linear-gradient';

class TabBar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = _.merge(this.state, {
      tabFocus: this.props.tabFocus || 0
    })
  }

  render() {
    let title = 'LỊCH SỬ';

    return (
      <View
        style={{
          height:Define.constants.navBarHeight+ 40 + (Define.constants.isIphoneX ? 30 : 0),
          width: Define.constants.widthScreen,
          borderBottomWidth:0,
          shadowColor:'#000000',
          shadowOpacity:0.5,
          shadowOffset:{height:2, width:0},
          shadowRadius:1,
          borderColor:'#000',
          zIndex: 2,
          elevation:3
        }}>
        <LinearGradient {...Themes.current.linearConfig}>
          <View style={Themes.current.screen.titleWrapNavBarCenter} pointerEvents={'none'}>
            <Text style={Themes.current.text.navBartitle}>{title}</Text>
          </View>
        </LinearGradient>
        <LinearGradient {...Themes.current.linearConfig}>
          <View style={[styles.tabs, this.props.style]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{}}>
              <View style={{width: Define.constants.widthScreen, flexDirection: 'row'}}>
                {this.props.tabs.map((tab, i) => {
                  let borderWidth;
                  let backgroundColorText;
                  let colorText;
                  if(this.state.tabFocus === i) {
                    borderWidth = 0;
                    backgroundColorText = '#fff';
                    colorText = '#0c7b93';
                  } else {
                    borderWidth = 1;
                    backgroundColorText = 'transparent';
                    colorText = '#ebebeb';
                  }

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({tabFocus: i});
                        this.props.goToPage(i);
                      }}
                      style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        paddingHorizontal: 10, borderRadius: 15, borderWidth: borderWidth, top: 5,
                        borderColor: '#ebebeb', backgroundColor: backgroundColorText, marginHorizontal: 5, paddingVertical: 5, flex: 1, marginVertical: 5
                      }}
                    >
                      <Text style={{color: colorText, backgroundColor: 'transparent', fontWeight:'bold'}} numberOfLines={1} ellipsizeMode={'tail'}>{tab.toUpperCase()}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.tabFocus !== nextProps.tabFocus) {
      this.setState({tabFocus: nextProps.tabFocus});
    }
  }
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: 'transparent'
  }
});
function selectActions(state) {
  return {
    appSetting: state.AppSetting,
    notifications: state.Notifications
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(TabBar);
