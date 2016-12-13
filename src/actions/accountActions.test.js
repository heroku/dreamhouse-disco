import { login, logout } from './accountActions'

describe('actions', () => {
  describe('login', () => {
    it('should have a type of "ACCOUNT_LOGGED_IN"', () => {
      expect(login().type).toEqual('ACCOUNT_LOGGED_IN')
    })

    it('should pass on the object we pass it', () => {
      expect(login('stuff').payload).toEqual('stuff')
    })
  })

  describe('logout', () => {
    it('should have a type of "ACCOUNT_LOGGED_OUT"', () => {
      expect(logout().type).toEqual('ACCOUNT_LOGGED_OUT')
    })
  })
})
