/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:10:05
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-13 11:10:44
 */

import Cookies from 'js-cookie'

const SessionIdKey = 'Admin-SessionId'

export function getSessionId () {
  return Cookies.get(SessionIdKey)
}

export function setSessionId (sessionId) {
  return Cookies.set(SessionIdKey, sessionId)
}

export function removeSessionId () {
  return Cookies.remove(SessionIdKey)
}
