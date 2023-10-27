import { extend, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import i18n from '@/lang'
//@ts-ignore
import _ from 'lodash'

// Install rules and localization
for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
        ...validation
    })
}

configure({
    defaultMessage: (field, values) => {
      // override the field name.
      if (!field.includes('ignore')) {
        values._field_ = i18n.t(`fields.${field}`)
      }
      return i18n.t(`validation.${values._rule_}`, values) as string
    }
  })

export const emailRegex = /^[a-zA-Z0-9_-]+([.]?[a-zA-Z0-9_-])*([a-zA-Z0-9_-]+|[.]?)@([\w-]+\.)+[\w-]{2,4}$/
extend('email', {
    validate(value) {
        return emailRegex.test(value)
    }
})
extend('check_password', {
    validate(value) {
        const passwordRegex = /^((?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])| (?=.*[A-Z])(?=.*[!@\#$%&\/=?_.,:;\\-])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@\#$%&\/=?_.,:;\\-])|(?=.*[0-9])(?=.*[!@\#$%&\/=?_.,:;\\-]))/
        return passwordRegex.test(value) && (value.length === new Blob([value]).size)
    },
})

extend('max', {
    validate(value: any, event: any) {
        return new Blob([value]).size <= (event.length * 4) && _.toArray(value).length <= event.length
    }
})

extend('min', {
    validate(value: any, event: any) {
        return new Blob([value]).size >= (event.length * 4) && _.toArray(value).length >= event.length
    }
})

export const checkScript = (value: string) => ((value.includes('<script') && value.includes('</script')) || value.includes('<?') || value.includes('<%'))
extend('no_script_tag', {
  validate(value) {
    return !checkScript(value)
  }
})
