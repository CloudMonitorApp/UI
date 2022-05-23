export default {
    computed: {
        locale() {
            return this.$page.props.auth.user.locale
        },
    },
    methods: {
       getAlternateLocale(first, second) {
           return this.locale === first ? second : first
       } 
    }
}