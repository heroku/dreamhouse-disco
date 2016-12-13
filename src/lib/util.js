let _ = require('lodash')

// If referring URL starts with our domain, we are "authenticated"
export function isAuthenticated() {
  return (
    document &&
    document.referrer &&
    _.startsWith(document.referrer,
                 `${document.location.protocol}//${document.location.host}`)
  )
}
