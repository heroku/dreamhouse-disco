import accountReducer from './accountReducer'

describe('accountReducer', () => {
  it('should return the initial state', () => {
    expect(accountReducer(undefined, {})).toEqual({
      account: {},
      fetching: false,
      fetched: false,
      error: null
    })
  })

  it('should react to an action with type ACCOUNT_LOGGED_IN')
  it('should react to an action with type ACCOUNT_LOGGED_OUT')
})
