import {
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
const _ = require('lodash')
const EventEmitter = require('react-native/Libraries/vendor/emitter/EventEmitter')
const Debug = require('../../Util/Debug')
const Util = require('../../Util/Util')
import Geolocation from 'react-native-geolocation-service';
import { globalVariableManager } from './GlobalVariableManager';

class LocationManager extends EventEmitter {
  constructor() {
    super()

    // properties
    this.currentLocation = null // {lat, lng, timeUpdated}
    this.watchID = null
    this.retry = 0;
    this.firstTime = true;
    this.listPromise = [];
    this.isGetting = false;
    // setup methods
    // this.getCurrentLocation();
  }

  checkAndRequestPermission(){
    return new Promise((resolve,reject)=>{
      if (Platform.OS === 'android') {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((ret)=>{
          if (ret) {
            return Promise.resolve(true);
          }else{
            Alert.alert(
              '',
              'Hãy cho phép HeyU sử dụng các quyền sau để việc tạo, nhận đơn trở lên dễ dàng ',
              [
                {text: 'OK',
                  onPress: () => {
                    return PermissionsAndroid.requestMultiple(
                      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
                    )}
                },
              ],
              { cancelable: false }
            )
          }
        })
        .then((granted)=>{
          if (granted) {
            resolve()
          } else {
            reject();
          }
        })
      }else{
        resolve()
      }
    })
  }

  checkAndRequestPermissionAR(mode){
    return new Promise((resolve,reject)=>{
      if (Platform.OS === 'android' && mode === 'shipper' && Platform.Version >= 29) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION)
        .then((ret)=>{
          if (ret) {
            return Promise.resolve(true);
          }else{
            Alert.alert(
              '',
              'Hãy cho phép HeyU sử dụng các quyền sau để việc tạo, nhận đơn trở lên dễ dàng ',
              [
                {text: 'OK',
                  onPress: () => {
                    return PermissionsAndroid.requestMultiple(
                      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION]
                    )}
                },
              ],
              { cancelable: false }
            )
          }
        })
        .then((granted)=>{
          if (granted) {
            resolve()
          } else {
            reject();
          }
        })
      }else{
        resolve()
      }
    })
  }

  startWatchingLocation() {
    this.checkAndRequestPermission()
    .then(()=>{
      this.watchID = Geolocation.watchPosition((position) => {
          this.updateLocation(position)
      })
    })
    .catch(() => {})
  }

  getCurrentLocation(timeout) {
    const options = _.clone(globalVariableManager.reduxManager.state.AppState.configForUpdateLocation.options);
    if(timeout) {
      options.timeout = timeout;
    }

    if(Platform.OS === 'ios') {
      return new Promise((resolve, reject) => {
        this.checkAndRequestPermission()
        .then(()=>{
            Geolocation.getCurrentPosition(
              (position) => {
                resolve(this.updateLocation(position))
              },
              (err) => {
                reject(err)
              },
              options
            );
        })
        .catch((err) => {
          reject(err);
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        this.listPromise.push({resolve, reject})
        if(!this.isGetting) {
          this.getCurrentLocationProcess(options)
        }
      })
    }

  }
  invokeSuccess(location) {
    this.listPromise.forEach((promiseReturn) => {
      promiseReturn.resolve(location)
    })
    this.listPromise = [];
    this.isGetting = false;
  }
  invokeReject(err) {
    this.listPromise.forEach((promiseReturn) => {
      promiseReturn.reject(err)
    })
    this.listPromise = [];
    this.isGetting = false;
  }
  getCurrentLocationProcess(options) {
    this.isGetting = true;
    this.checkAndRequestPermission()
    .then(()=>{
        Geolocation.getCurrentPosition(
          (position) => {
              this.invokeSuccess(this.updateLocation(position))
          },
          (error) => {
            Geolocation.getCurrentPosition(
              (position) => {
                this.invokeSuccess(this.updateLocation(position))
              },
              (err) => {
                this.invokeReject(err)
              },
              options
            );
          },
          options
        );
    })
    .catch((err) => {
      this.invokeReject(err)
    })
  }

  tryGetCurrentPosition(resolve,reject){
    if(Platform.OS === 'android'){
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(this.updateLocation(position))
        },
        (err) => {
          if (this.retry<2) {
            this.retry ++;
            this.tryGetCurrentPosition(resolve,reject)
          }else{
            // console.log(err)
            // console.log(JSON.stringify( err))
            reject(err)
          }
        },
        {enableHighAccuracy: false, timeout: 20000 }//, maximumAge: 30000}
      );
    }else{
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(this.updateLocation(position))
        },
        (err) => {
          if (this.retry<3) {
            this.retry ++;
            this.tryGetCurrentPosition(resolve,reject)
          }else{
            // console.log(err)
            // console.log(JSON.stringify( err))
            reject(err)
          }
        },
        {enableHighAccuracy: false, timeout: 20000 } //, maximumAge: 30000}
      );
    }

  }

  getImmediateLocation() {
    return this.currentLocation
  }

  stopWatchingLocation() {
    if(this.watchID) {
      Geolocation.clearWatch(this.watchID)
    }
    this.currentLocation = null
  }

  updateLocation(position) {
    Debug.log2('Position: ', position)
    this.currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      bearing: position.coords.heading,
      speed: position.coords.speed,
      timeUpdated: position.timestamp,
      updatedAt: position.timestamp
    }

    return this.currentLocation;
  }
}

const locationManager = new LocationManager()

module.exports= locationManager;
