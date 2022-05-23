export default {
    methods: {
        toast(message, title = '', type = 'success') {
            this.emitter.emit('toast', {
                title: title,
                message: message,
                type: type,
            })
        }
    },
}