import { useEncryptStore } from '@/stores/encrypt'
import CryptoJS from 'crypto-js'
import { Buffer } from 'buffer'

export function encrypt(text: any) {
  const { aesKey } = useEncryptStore()
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const encStr = CryptoJS.AES.encrypt(text, key, {
    iv: key, // AES向量
    mode: CryptoJS.mode.CBC, // 指定CBC模式
    padding: CryptoJS.pad.Pkcs7 // 指定pkcs7填充模式
  }).toString()
  return Buffer.from(encStr, 'base64')
}

export function decrypt(byteList: any) {
  const { aesKey } = useEncryptStore()
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const buf = Buffer.from(byteList, 'hex')
  const ciphertext = buf.toString('base64')
  const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: key, // AES向量
    mode: CryptoJS.mode.CBC, // 指定CBC模式
    padding: CryptoJS.pad.Pkcs7 // 指定pkcs7填充模式
  })
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function encryptV2(text: any) {
  const { aesKey } = useEncryptStore()
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const encStr = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB, // 指定ECB模式
    padding: CryptoJS.pad.Pkcs7 // 指定pkcs7填充模式
  }).toString()
  return Buffer.from(encStr, 'base64')
}

export function decryptV2(byteList: any) {
  const { aesKey } = useEncryptStore()
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const buf = Buffer.from(byteList, 'hex')
  const ciphertext = buf.toString('base64')
  const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
    mode: CryptoJS.mode.ECB, // 指定ECB模式
    padding: CryptoJS.pad.Pkcs7 // 指定pkcs7填充模式
  })
  return bytes.toString(CryptoJS.enc.Utf8)
}
