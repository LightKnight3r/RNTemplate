var _ = require('lodash')

import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
var {popupActions} = require('../popups/PopupManager')
var { Actions } = require('react-native-router-flux')
var { globalVariableManager } = require('../modules/GlobalVariableManager')
import ReactComponent from '../ReactComponent'

class OrderTag extends ReactComponent {
  static componentName = 'OrderTag'

  constructor(props) {
    super(props)
    this.state = _.merge(this.state,{})
  }

  renderContent() {
    var {appState, tags} = this.props
    var tagsObj = appState.tags
    var content = null
    var contentArr = []
    if(tags.length > 0) {
      tags.forEach((item) => {
        if(tagsObj[item]) {
          content = (
            <View style={{marginRight: 4}}>
              <TouchableOpacity
                onPress = {() => {
                  if(tagsObj[item].link) {
                    globalVariableManager.navigatorManager.handleNavigator(tagsObj[item].link, tagsObj[item].extras || {})
                  }
                }}
              >
                <Image
                  source={{uri: tagsObj[item].icon || ''}}
                  style={{width: 50, height: 20, backgroundColor: 'transparent', resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          )
        } else {
          content = null
        }

        if(content) {
          contentArr.push(content)
        }
      })
    }

    return(
      <View>
        {contentArr}
      </View>
    )
  }
}
/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
 function selectActions(state) {
   return {
     appState:state.AppState,
   }
 }
export default connect(selectActions, undefined, undefined, {withRef: true})(OrderTag)
