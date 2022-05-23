export default {
    data() {
        return {
            _redirect: {
                messages: {
                    success: {
                        title: 'Success!',
                        message: 'Informationed saved.'
                    }
                }
            }
        }
    },
    computed: {
        redirect() {
            return {
                withToast: (url, msg =  null, title = null, type = 'success') => {
                    this.$inertia.get(url, {}, {
                        onSuccess: () => {
                            setTimeout(() => {
                                this.emitter.emit('toast', {
                                    title: title || this._redirect.messages[type].title,
                                    message: msg || this._redirect.messages[type].message,
                                    type: type,
                                })
                            }, 400)
                        }
                    })
                },
                success: (url, messagge =  null, title = null) => {
                    this.redirect.withToast(url, messagge, title, 'success')
                },
                to: (url) => {
                    this.$inertia.get(url)
                }
            }
        }
    }
}