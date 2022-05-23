import Locale from './Locale.js'

export default {
    mixins: [Locale],
    computed: {
        dateFormat() {
            return {
                date: 'YYYY-MM-DD'
            }
        }
    },
    methods: {
        dateTime(time) {
            return window.dayjs(time).locale(this?.locale || 'en')
        },
    }
}