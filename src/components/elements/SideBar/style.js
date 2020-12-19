'use strict';

var React = require('react-native');

var { StyleSheet, Platform } = React;
var Define = require('../../../Define');

module.exports = {
    container: {
      flex: 1,
    },
    menuItemContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      paddingBottom: 13,
    },
    menuIconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50
    },
    menuTextContainer: {
      paddingLeft: 10,
      justifyContent: 'center'
    },
    menuIcon: {
      color: '#70757A',
      fontSize: 32
    },
    menuTextDes: {
      color:'#363636',
      fontSize: 14,
    },
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor:'#fff'
    },
    profileContainer: {
      flexDirection: 'row',
      paddingTop: 40,
      paddingBottom: 10,
      paddingLeft: 10,
      alignItems: 'center'
    },
    imageProfile: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'transparent'
    },
    usernameContainer: {
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingLeft: 10
    },
    usernameText: {
      color: '#fff',
      fontSize: 17,
      backgroundColor:'transparent'
    }
};
