import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import styles from './styles';

export default class Save extends Component {

    onClick() {
        // console.log(456)
    }

    render() {

        return (

            <View style={styles.button}>
                <Icon name='ios-swap' style={styles.othersIcon} />
                <Text style={styles.newsLink}>Lưu lại</Text>
            </View>


        )

    }

}
