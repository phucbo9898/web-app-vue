import _ from 'lodash'

class PreviewText {
    convertToPreviewText(text: string, max: number = 90) {
        const preText = _.truncate(text, {
            length: max,
            separator: ''
        })

        if (text?.length > max) {
            return {
                isLong: true,
                text: preText
            }
        }
        return {
            isLong: false,
            text: preText
        }
    }
}

export default new PreviewText()