import CryptoJS from 'crypto-js'

const KEY = import.meta.env.VITE_APP_ENCRYPT_REQUEST_KEY
const IV = import.meta.env.VITE_APP_ENCRYPT_REQUEST_IV

export default {
  /**
   * 加密
   *
   * @param plaintext 明文
   * @returns {string<#noparse>}</#noparse>
   */
  encrypt (plaintext) {
    const key = CryptoJS.enc.Utf8.parse(KEY)
    const secretData = CryptoJS.enc.Utf8.parse(plaintext)
    const encrypted = CryptoJS.AES.encrypt(
      secretData,
      key,
      {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      <#noparse>}</#noparse>
    )
    return encrypted.toString()
  <#noparse>}</#noparse>,
  /**
   * 解密
   *
   * @param cipherText 密文
   * @returns {*<#noparse>}</#noparse>
   */
  decrypt (cipherText) {
    const key = CryptoJS.enc.Utf8.parse(KEY)
    const decrypt = CryptoJS.AES.decrypt(
      cipherText,
      key,
      {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      <#noparse>}</#noparse>
    )
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  <#noparse>}</#noparse>
<#noparse>}</#noparse>
