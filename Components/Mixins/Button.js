import { Link } from '@inertiajs/inertia-vue3';
    
export default {
    components: {
        Link,
    },
    props: {
        href: {
            type: [String, Object],
            default() {
                return null
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * xs
         * sm
         * base
         * lg
         * xl
         */
        /*size: {
            type: String,
            default: 'base'
        },*/
        xs: {
            type: Boolean,
            default: false
        },
        sm: {
            type: Boolean,
            default: false
        },
        lg: {
            type: Boolean,
            default: false
        },
        xl: {
            type: Boolean,
            default: false
        },
        /**
         * success
         * edit
         * delete
         * default
         */
        success: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        },
        /**
         * primary
         * secondary
         * outline
         */
        secondary: {
            type: Boolean,
            default: false,
        },
        outline: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonCSS() {
            let style = this.secondary ? 'secondary' : (this.outline ? 'outline' : 'primary')
            let color = this.success ? 'green' : (this.delete ? 'red' : (this.edit ? 'indigo' : 'indigo'))
            let size = this.xs ? 'xs' : (this.sm ? 'sm' : (this.lg ? 'lg' : this.xl ? 'xl' : 'base'))

            return this.buttonClasses(color)[style][size]
        }
    }
}