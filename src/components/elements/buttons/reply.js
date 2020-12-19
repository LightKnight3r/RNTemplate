import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

export default class Save extends Component {

    render() {

        return (

            <TouchableOpacity style={{marginRight: 25}}>
                <View style={{flexDirection:'row'}}>
                    <Icon name='ios-swap' style={styles.othersIcon} />
                    <Text style={styles.newsLink}>Lưu lại</Text>
                </View>
            </TouchableOpacity>

        )

    }

}
