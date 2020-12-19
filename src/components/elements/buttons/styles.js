'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;

module.exports = {

    newsLink: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
        top:Platform.OS === 'android' ? -4 : 0,
    },

    othersIcon: {
        fontSize: 20,
        marginLeft: Platform.OS === 'android' ? 15 : 0,
        paddingLeft: Platform.OS === 'android' ? 0 : 0,
        paddingRight: 5,
        marginTop: Platform.OS === 'android' ? -2 : 3,
        color: '#666'
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:6
    }

};
