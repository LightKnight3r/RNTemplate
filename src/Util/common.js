import {
  Platform,
  Linking,
  NativeModules,
  PermissionsAndroid
} from 'react-native'
const Debug = require('./Debug')
import {popupActions} from '../components/popups/PopupManager'
var RNIntent = NativeModules.RNIntent;
module.exports = {
  callNormal: (phone) => {
    var url = `tel:${phone}`;
    if(Platform.OS === 'android') {
      checkAndRequestPermission()
      .then(()=>{
        RNIntent.makeCall(url,(arg)=>{
          Debug.log(arg);
          if ((typeof arg === 'string') && arg.indexOf('ERR') === 0) {
            popupActions.setRenderContentAndShow(DefaultPopup,{
              title:'Thông báo',
              description:'Không thể tạo cuộc gọi',
              buttonTitle:'OK',
              onPress:()=>{popupActions.popPopup()}
            })
            Debug.log2('An unexpected error happened', arg,Debug.level.ERROR)
          }else{
          }
        })
      })
      .catch((err) => {
        Debug.log(err,Debug.level.ERROR)
      })
    } else {
      url = `telprompt:${phone}`;
      Linking
        .canOpenURL(url)
        .then((supported) => {
          if(supported) {
            return Linking.openURL(url);
          }
          return Promise.reject();
        })
        .catch((err) => {
          Debug.log(err,Debug.level.ERROR)
        })
    }
  },
  calculateMoneyWait: (time, moneyStrategy, priceIncrease) => {
    if (!time || !moneyStrategy) {
      return 0;
    }

    const configMoney = moneyStrategy.step || [];
    const min = moneyStrategy.minMoney;
    priceIncrease = priceIncrease || 1;
    let money = 0;
    for(let i=0; i<configMoney.length; i++) {
      if (configMoney[i].time === 0) {
        money += configMoney[i].money*time;
        break;
      } else if (time >= configMoney[i].time) {
        time -= configMoney[i].time
        money += configMoney[i].money*configMoney[i].time
      } else {
        money += configMoney[i].money*time;
        break;
      }
    }
    if(money < min) {
      money = min;
    }
    money = money*priceIncrease;
    money = Math.round(money);
    return money;
  },
  calculateMoney: (distance, moneyStrategy, priceIncrease, numDes) => {
    if (!moneyStrategy) {
      return 0
    }

    const configMoney = moneyStrategy.step || [];
    const min = moneyStrategy.minMoney;
    const moreDesPrice = moneyStrategy.moreDesPrice || 0;
    priceIncrease = priceIncrease || 1;
    numDes = numDes || 1;
    let money = 0;
    for(let i=0; i<configMoney.length; i++) {
      if (configMoney[i].distance === 0) {
        money += configMoney[i].money*distance;
        break;
      } else if (distance >= configMoney[i].distance) {
        distance -= configMoney[i].distance
        money += configMoney[i].money*configMoney[i].distance
      } else {
        money += configMoney[i].money*distance;
        break;
      }
    }
    if(money < min) {
      money = min;
    }
    if(numDes > 1) {
      money += moreDesPrice*(numDes - 1);
    }
    money = money*priceIncrease;
    money = Math.round(money/1000)*1000;
    return money;
  }
}
const checkAndRequestPermission = () => {
  return new Promise((resolve,reject)=>{
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE)
      .then((ret)=>{
        if (ret) {
          return Promise.resolve(true);
        }else{
          return PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              'title': 'Xin hãy cho chúng tôi tạo cuộc gọi',
              'message': 'Để  có thể  tạo cuộc gọi nhanh'
            }
          )
        }
      })
      .then((granted)=>{
        if (granted) {
          resolve()
        }else{
          reject()
        }
      })
    }else{
      reject()
    }
  })
}