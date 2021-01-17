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
    getApiKeyGoogle: 'APP_GET_API_KEY_GOOGLE',
    showLoading: 'APP_STATE_SHOW_LOADING',
    getConfig: 'APP_STATE_GET_CONFIG',
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
  },

  AppSetting:{
    saveSetting:'APP_SETTING_SAVE',
    setKeepScreenOn:'APP_SETTING_KEEP_SCREEN_ON',
    setNewFlags:'APP_SETTING_NEW_FLAGS',
    logout: 'USER_LOGOUT',
    constants:{
      APP_REGION_LIST:{
        'HÀ NỘI':'hn',
        // 'HỒ CHÍ MINH':'hcm'
      }
    },
    switchLanguage: 'APP_SWITCH_LANGUAGE'
  },
  Package: {
    list: 'PACKAGE_LIST'
  },
  User: {
    login: 'USER_LOGIN',
    logout: 'USER_LOGOUT',
    loginFacebook: 'USER_LOGIN_FACEBOOK',
    updateProfile:'USER_UPDATE_PROFILE',
    updateAuthentication:'USER_UPDATE_AUTHENTICATION',
    sentNotifyToken:'USER_SENT_NOTIFY_TOKEN',
    sentVoipNotifyToken:'USER_SENT_VOIP_NOTIFY_TOKEN',
    updateLocation: 'USER_UPDATE_LOCATION',
    getInfo: 'USER_GETINFO',
    getInfoFromAccessToken: 'USER_GET_INFO_FROM_TOKEN',
    loginWithoutPassword: 'USER_GET_LOGIN_WITHOUT_PASSWORD',
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
  },

  Notifications: {
    add: 'NOTIFICATION_ADD',
    notify: 'NOTIFICATION_NOTIFY',
    updateSeen: 'NOTIFICATION_UPDATE_SEEN',
    updateCount: 'NOTIFICATION_UPDATE_COUNT',
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
