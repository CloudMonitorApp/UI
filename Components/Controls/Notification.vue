<template>
    <div :class="classList" v-if="show">
        <div class="notification__content">
            <h3 v-if="title">{{ title }}</h3>
            {{ message }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            handler: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                title: '',
                message: '',
                level: '',
            }
        },
        mounted() {
            this.handler.on('notification', args => {
                this.title = args.title ?? ''
                this.message = args.message
                this.level = args.level ?? 'confirm'
            })
        },
        computed: {
            show() {
                return this.message && this.message !== ''
            },
            classList() {
                let classes = ['notification vertical-spacing-bottom']

                if (this.level === 'confirm') {
                    classes.push('notification--confirm')
                }

                if (this.level === 'attention') {
                    classes.push('notification--attention')
                }

                if (this.level === 'warning') {
                    classes.push('notification--warning')
                }

                return classes
            }
        },
    }
</script>