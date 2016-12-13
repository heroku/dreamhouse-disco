import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import config from './configReducer'
import account from './accountReducer'
import music from './musicReducer'

export default combineReducers({
      config,
      account,
      music,
      routing: routerReducer
    })
