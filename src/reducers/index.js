import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import account from './accountReducer'
import music from './musicReducer'

export default combineReducers({
      account,
      music,
      routing: routerReducer
    })
