/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-18 15:07:59
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-18 15:12:21
 */

const Session = {
  get (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  set (key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
  },
  add (key, addVal) {
    let oldVal = this.get(key)
    this.set(key, [...oldVal, addVal])
  },
  removeItem  (key, i) {
    let val = this.get(key)
    val.splice(i, 1)
    this.set(key, val)
  },
  remove (key) {
    sessionStorage.removeItem(key)
  }
}
export default Session
