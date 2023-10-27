import Vue from 'vue'
import VueI18n from 'vue-i18n'
// @ts-ignore
import ValidationViLocale from '@/validations/lang/vi.json'
// @ts-ignore
import ValidationEnLocale from '@/validations/lang/en.json'
// User defined lang
import viLocale from './vi'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
    en: {
      ...enLocale,
      ...{
        fields: ValidationEnLocale.fields,
        validation: ValidationEnLocale.messages
      }
    },
    vi: {
      ...viLocale,
      ...{
        fields: ValidationViLocale.fields,
        validation: ValidationViLocale.messages
      }
    }
  }
  
  export const getLocale = () => {
    const language = JSON.parse(String(sessionStorage.getItem('vuex')))?.setting?.setting?.setting_language?.code
    return language ? language : 'vi'
  }
  
  const i18n = new VueI18n({
    locale: getLocale(),
    messages
  })
  
  export default i18n