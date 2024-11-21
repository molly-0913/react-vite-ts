import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './lang/en.json'
import zh_CN from './lang/zh_CN.json'

const resources = {
  en_US: {
    translation: en_US
  },
  zh_CN: {
    translation: zh_CN
  },
}

let lng = 'en_US'

// 配置 i18next
i18n
  .use(initReactI18next) // 使用 react-i18next
  .init({
    resources,
    lng: lng,
    interpolation: {
      escapeValue: false
    }
  })
  export default i18n