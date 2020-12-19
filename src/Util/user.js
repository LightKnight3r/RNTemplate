const Define = require('../Define')
const Debug = require('./Debug')
import {Platform} from 'react-native';

const {globalVariableManager} = require('../components/modules/GlobalVariableManager')

module.exports = {
  getNameAsAvatar(name) {
    let abbreviations = '';
    const names = name.split(" ");

    names.map(name => {
      if (name) {
        abbreviations += name[0];
      }
    })
    return abbreviations.length > 2 ? abbreviations.slice(abbreviations.length - 2, abbreviations.length).toLocaleUpperCase() : abbreviations.toLocaleUpperCase();
  }
}
