//@flow
/*
 * action types
 */
const RDActionsTypes={

  // Todo:{
  //   test:'TEST',
  // },

  ServerConnection:{
    connect:'SERVER_CONNECT',
    disconnect:'SERVER_DISCONNECT',
    changeNetInfo:'SERVER_CONNECT_NET_INFO_CHANGE',
  },

  Store:{
    set:'STORE_SET',
    get:'STORE_GET',
    remove:'STORE_REMOVE',
  },

  Tips:{

  },

  AppState:{
    getConfigAnalytics: 'APP_GET_CONFIG_ANALYTICS',
    sendCrashLog: 'APP_SEND_CRASH_LOG',
    getConfigReview: "APP_GET_CONFIG_REVIEW",
    getConfigForUpdateLocation: 'APP_GET_CONFIG_FOR_UPDATE_LOCATION',
    getConfigForBackgroundLocation: 'APP_GET_CONFIG_FOR_BACKGROUND_LOCATION',
    getApiKeyGoogle: 'APP_GET_API_KEY_GOOGLE',
    getContact: 'APP_GET_CONTACT',
    showLoading: 'APP_STATE_SHOW_LOADING',
    listRegion: 'APP_STATE_LIST_REGION',
    getConfig: 'APP_STATE_GET_CONFIG',
    reportLocation: 'APP_STATE_REPORT_LOCATION',
    set: 'APP_STATE_SET',
    setDirect : 'APP_STATE_DIRECT_SET',
    constants:{
      APP_STATE_LIST:{
        LOADING:'LOADING',
        RUNNING:'RUNNING',
      },
      APP_STATE_DIRECT_LIST:{
        PORTRAIT:'PORTRAIT',
        LANDSCAPE:'LANDSCAPE',
        UNKNOWN: 'UNKNOWN'
      },
    },
    setInstanceMode: 'APP_STATE_SET_INSTANCE_MODE',
    getConfigPhoneAuthen: 'APP_GET_CONFIG_PHONE_AUTHEN',
    getMessageWarningAuthen: 'APP_GET_MESSSAGE_WARNING_AUTHEN',
    listServiceAvailable: 'APP_LIST_SERVICE_AVAILABLE',
    getNewsCategory: 'APP_GET_NEWS_CATEGORY',
    getNews: 'APP_GET_NEWS',
    getDetailNews: 'APP_GET_DETAIL_NEWS',
    getBanner: 'APP_GET_BANNER',
    getConfigForMount: 'APP_GET_CONFIG_MOUNT',
    getConfigZippo: 'APP_GET_CONFIG_ZIPPO',
    syncZippo: 'APP_SYNC_ZIPPO',
    getConfigHistoryFacebook: 'APP_GET_CONFIG_HISTORY_FACEBOOK',
    getListTopUpAddress: 'APP_LIST_TOP_UP_ADDRESS',
    getConfigForTag: 'APP_GET_CONFIG_FOR_TAG',
    getConfigLogin: 'APP_GET_CONFIG_LOGIN',
    getHotlineBookCar: 'APP_GET_HOTLINE_BOOK_CAR',
    getStateMachineRider: 'APP_GET_STATE_MACHINE_RIDER'
  },

  AppSetting:{
    getRegionByLatLng: 'APP_GET_REGION_BY_LATLNG',
    setTipFeedsSave:'APP_SET_TIP_FEEDS_SAVED',
    increaseHintPickLocation: 'APP_INCREATE_HINT_PICK_LOCATION',
    increaseHintOrder: 'APP_INCREASE_HINT_ORDER',
    increaseTipsCash:'APP_INCREASE_TIPS_CASH',
    increaseTipCart:'APP_INCREASE_TIP_CART',
    disableGuideAtFeed:'APP_DISABLE_GUIDE_AT_FEED',
    saveSetting:'APP_SETTING_SAVE',
    setQuickReceiverMess:'APP_SETTING_QUICK_RECEIVER_MESS',
    setNumberFeedsCache:'APP_SETTING_NUMBER_FEEDS_CACHE',
    setNumberFeedsDisplay:'APP_SETTING_NUMBER_FEEDS_DISPLAY',
    setSearchOptions:'APP_SETTING_SEARCH_OPTIONS',
    setShowAllLineFeed:'APP_SETTING_SHOW_ALL_LINE_FEED',
    setKeepScreenOn:'APP_SETTING_KEEP_SCREEN_ON',
    setNewFlags:'APP_SETTING_NEW_FLAGS',
    setMode: 'APP_SET_MODE',
    setRegion: 'APP_SET_REGION',
    setModeOpenFb: 'APP_SET_MODE_OPEN_FB',
    addDefaultOrigin: 'APP_ADD_DEFAULT_ORIGIN',
    deleteDefaultOrigin: 'APP_DELETE_DEFAULT_ORIGIN',
    modifyDefaultOrigin: 'APP_MODIFY_DEFAULT_ORIGIN',
    setActiveDefaultOrigin: 'APP_SET_ACTIVE_DEFAULT_LOCATION',
    setDoneSyncDefaultLocation: 'APP_SET_DONE_SYNC_DEFAULT_LOCATION',
    listDefaultLocation: 'APP_LIST_DEFAULT_LOCATION',
    showOnlyFacebookOrder: 'APP_SHOW_ONLY_FACEBOOK_ORDER',
    showTotalPosts: 'APP_SHOW_TOTAL_POSTS',
    logout: 'USER_LOGOUT',
    setActionOrderOnpress:'APP_SET_ACTION_ORDER_ONPRESS',
    switchSoundOS: 'APP_SET_SWITCH_SOUND_OS',
    constants:{
      APP_REGION_LIST:{
        'HÀ NỘI':'hn',
        // 'HỒ CHÍ MINH':'hcm'
      }
    },
    increaseTipsImageOrder: 'APP_INCREASE_TIPS_IMAGE_ORDER',
    addRecentlyLocationPick: 'APP_RECENTLY_LOCATIONS',
    switchLanguage: 'APP_SWITCH_LANGUAGE'
  },
  Package: {
    list: 'PACKAGE_LIST'
  },
  User: {
    getRegionByLatLng: 'USER_GET_REGION_BY_LATLNG',
    login: 'USER_LOGIN',
    logout: 'USER_LOGOUT',
    loginFacebook: 'USER_LOGIN_FACEBOOK',
    updatePhoneNumber: 'USER_UPDATE_PHONE',
    changePhoneNumber: 'USER_CHANGE_PHONE',
    updateProfile:'USER_UPDATE_PROFILE',
    updateAuthentication:'USER_UPDATE_AUTHENTICATION',
    sentNotifyToken:'USER_SENT_NOTIFY_TOKEN',
    sentVoipNotifyToken:'USER_SENT_VOIP_NOTIFY_TOKEN',
    resetToken: 'USER_RESET_TOKEN',
    updateLocation: 'USER_UPDATE_LOCATION',
    get: 'USER_GET',
    cardCharging: 'USER_CARD_CHARGING',
    bankCharging: 'USER_BANK_CHARGING',
    buyPackage: 'USER_BUY_PACKAGE',
    trackingAction: 'USER_TRACKING_ACTION',
    getById: 'USER_GET_BY_ID',
    getAuthenShopInf: 'USER_GET_AUTHEN_SHOP_INF',
    chooseMode: 'USER_CHOOSE_MODE',
    sendFeedBack: 'USER_SEND_FEEDBACK',
    doneTraining: 'USER_DONE_TRAINING',
    toggleReceiveOrder: 'USER_TOGGLE_ORDER',
    getByPhone: 'USER_GET_BY_PHONE',
    uploadCookies: 'USER_UPLOAD_COOKIES',
    getConfigGateway: 'USER_GET_CONFIG_GATEWAY',
    getConfigForCard: 'USER_GET_CONFIG_FOR_CARD',
    checkPhoneExist: 'USER_CHECK_PHONE_EXISTS',
    resetPassword: 'USER_RESET_PASSWORD',
    loginByPhone: 'USER_LOGIN_BY_PHONE',
    addPresenterCode: 'USER_ADD_PRESENTER_CODE',
    getInfoFromAccessToken: 'USER_GET_INFO_FROM_TOKEN',
    getHotNews:'USER_GET_HOT_NEWS',
    checkViMoLink:'USER_CHECK_VIMO_LINK',
    sendViMoLink:'USER_SEND_VIMO_LINK',
    activeViMoLink:'USER_ACTIVE_VIMO_LINK',
    requestChargeViMo:'USER_REQUEST_CHARGE_VIMO',
    confirmChargeViMo:'USER_CONFIRM_CHARGE_VIMO',
    unlinkViMo:'USER_UNLINK_VIMO',
    getInfoCheckout: 'VIMO_GET_INFO_CHECKOUT',
    createCheckout: 'VIMO_CREATE_CHECKOUT',
    getDeeplinkMomo: 'MOMO_GET_DEEPLINK',
    getInfoPaymentMomo: 'MOMO_GET_INFO_PAYMENT',
    listMoneyMoMo: 'MOMO_LIST_MONEY',
    listMoneyBank: 'BANK_LIST_MONEY',
    listMoneyVimo: 'VIMO_LIST_MONEY',
    getLinkMomoInfo: 'MOMO_GET_LINK_INFO',
    processTransactionMomo: 'MOMO_PROCESS_TRANSACTION',
    getAuthenShipperInf: 'USER_GET_AUTHEN_SHIPPER_INF',
    statisticStar : 'USER_GET_STATISTIC_STAR',
    transferSSMToCoints: 'USER_TRANSFER_SSM_TO_COINTS',
    withdrawVimo: 'USER_WITHDRAW_VIMO',
    listSSMTransaction: 'USER_LIST_SSM_TRANSACTION',
    sendShipperAuthenInf: 'USER_SEND_AUTHEN_INF',
    getLatestShipperAuthenInf: 'USER_GET_LATEST_SHIPPER_AUTHEN_INF',
    updateShipperAuthenInf: 'USER_UPDATE_SHIPPER_AUTHEN_INF',
    checkPhoneCode: 'USER_CHECK_PHONE_CODE',
    requestPhoneCode: 'USER_REQUEST_PHONE_CODE',
    resetPasswordByNewPhoneAuthen: 'USER_RESET_PASSWORD_NEW_PHONE_AUTHEN',
    changePhoneNumberByNewPhoneAuthen: 'USER_CHANGE_PHONE_NEW_PHONE_AUTHEN',
    addDefaultOrigin: 'APP_ADD_DEFAULT_ORIGIN',
    deleteDefaultOrigin: 'APP_DELETE_DEFAULT_ORIGIN',
    modifyDefaultOrigin: 'APP_MODIFY_DEFAULT_ORIGIN',
    listDefaultLocation: 'APP_LIST_DEFAULT_LOCATION',
    getConfigShipperAuthenInf: 'USER_GET_CONFIG_SHIPPER_AUTHEN_INF',
    getPoint: 'USER_GET_POINT',
    getBankCodes: 'USER_GET_BANK_CODES',
    getMountConfig: 'USER_GET_MOUNT_CONFIG',
    sendMountProfile: 'USER_SEND_MOUNT_PROFILE',
    cancelMount: 'USER_CANCEL_MOUNT',
    getMountStatus: 'USER_GET_MOUNT_STATUS',
    uploadVideoMount: 'USER_UPLOAD_MOUNT_VIDEO',
    uploadBillMount: 'USER_UPLOAD_MOUNT_BILL',
    getVideoGuide: 'USER_GET_VIDEO_GUIDE',
    checkMountServiceAvailable: 'USER_CHECK_MOUNT_SERVICE',
    listServiceRegister: 'USER_LIST_SERVICE_REGISTER',
    switchService: 'USER_SWITCH_SERVICE',
    checkPhoneToMount: 'USER_CHECK_PHONE_TO_MOUNT',
    getConfigPoint: 'USER_GET_CONFIG_POINT',
    getPointHistory: 'USER_GET_POINT_HISTORY',
    loginWithoutPassword: 'USER_GET_LOGIN_WITHOUT_PASSWORD',
    getBannerFood: 'USER_GET_BANNER_FOOD',
    calculateMoneyMultiOrderType: 'USER_CALCULATE_MONEY_MULTI_ORDER_TYPE'
  },

  Chat: {
    listHistory: 'CHAT_LIST_HISTORY',
    getConversationInf: 'CHAT_GET_CONVERSATION_INF',
    getHistory: 'CHAT_GET_HISTORY',
    newMessage: 'CHAT_NEW_MESSAGE',
    typingMessage: 'CHAT_TYPING_MESSAGE',
    getHistoryByConversation: 'CHAT_GET_MESSAGE_BY_CONVERSATION',
    getHistoryByUser: 'CHAT_GET_MESSAGE_BY_USER',
    sendMessage: 'CHAT_SEND_MESSAGE',
    reSendMessage: 'CHAT_RESEND_MESSAGE',
    seenMessage: 'CHAT_SEEN_MESSAGE',
    clear: 'CHAT_CLEAR',
    clearMessages: 'CHAT_CLEAR_MESSAGES'
  },

  Feeds:{
    get:'FEEDS_GET',
    getViaEvent: 'FEED_GET_VIA_EVENT',
    getFeedsSaved: 'FEEDS_GET_SAVED',
    save:'FEEDS_SAVE',
    deleteFeedSaved: 'FEEDS_DELETE_SAVED',
    deleteAllFeedsSaved: 'FEEDS_DELETE_ALL',
    notify:'FEEDS_NOTIFY',
    comment:'FEEDS_COMMENT',
    getComments: 'FEEDS_GET_COMMENT',
    createOrder: 'FEED_CREATE_NEW',
    like:'FEED_LIKE_USER',
    dislike:'FEED_DISLIKE_USER',
    getHistoryOrder: 'FEED_GET_HISTORY',
    getTotalPostsByTypes: 'FEED_GET_TOTAL_POST_BY_TYPES',
    clear: 'FEEDS_CLEAR',
    getStatisticsByWeek:'FEEDS_GET_STATISTICS_BY_WEEK',
    getStatisticsByDay:'FEEDS_GET_STATISTICS_BY_DAY',
    getStatisticsByMonth:'FEEDS_GET_STATISTICS_BY_MONTH',
    getFinalTime:'FEES_GET_FINAL_TIME',
    clearNewFeed: 'FEEDS_CLEAR_NEW_FEED',
    getConfigFeedFacebook: 'FEEDS_GET_CONFIG_FEED_FACEBOOK'
  },

  Notify: {
    add: 'NOTIFY_ADD',
    remove: 'NOTIFY_REMOVE',
    removeAllNotify: 'REMOVE_ALL'
  },

  Notifications: {
    add: 'NOTIFICATION_ADD',
    removeAllNotify: 'NOTIFICATION_REMOVE_ALL',
    notify: 'NOTIFICATION_NOTIFY',
    updateSeen: 'NOTIFICATION_UPDATE_SEEN',
    countNotify: 'NOTIFICATION_COUNT',
    updateCount: 'NOTIFICATION_UPDATE_COUNT',
    seenAllNotify: 'NOTIFICATION_SEEN_ALL',
    getDetailNotification: 'NOTIFICATION_GET_DETAIL',
    clear: 'NOTIFICATION_CLEAR'
  },

  Shipper: {
    getNearest: 'SHIPPER_GET_NEAREST',
    clear: 'CLEAR_SHIPPER_NEAREST'
  },

  //
  constants:{
    REQUEST_SUBTYPE:{
      REQUEST:'REQUEST',
      ERROR:'ERROR',
      SUCCESS:'SUCCESS',
    },
  }

}

module.exports= RDActionsTypes
