export default class API {
    constructor(route, init = null, params = {}, meta = {}) {
        this._route = route
        this._params = params
        this._meta = meta
        this._data = []
        this._loading = false
        this._saving = false
        this._debounce = null
        this._endpoints = {
            index: 'index',
            destroy: 'destroy',
            show: 'show',
            store: 'store',
            update: 'update',
        }
        this._callback = null

        if (init) {
            this.data(init.data)
            this.meta(init.meta)
        }
    }

    data(data = null) {
        if (data) {
            this._data = data
            return this
        }

        return this._data
    }

    meta(meta = null) {
        if (meta) {
            this._meta = meta
            return this
        }

        return this._meta
    }

    params(params) {
        this._params = params
        return this
    }

    get(params = {}, callback = null) {
        let _params = this._params
        clearTimeout(this._debounce)
        this._loading = true
        Object.assign(this._params, params)

        this._debounce = setTimeout(() => {
            window.axios.get(window.route(this._route +'.'+ this._endpoints.index, this._params)).then(r => {
                this._data = r.data.data
                this._meta = r.data.meta
                this._loading = false

                if (callback) {
                    callback(r)
                }
            })
        }, this._debounce ? 1000 : 0)

        this.params(_params)

        return this
    }

    show(params = {}, callback = null) {
        let _params = this._params
        clearTimeout(this._debounce)
        this._loading = true
        Object.assign(this._params, params)

        this._debounce = setTimeout(() => {
            window.axios.get(window.route(this._route +'.'+ this._endpoints.show, this._params)).then(r => {
                this._data = r.data.data
                this._meta = r.data.meta
                this._loading = false

                if (callback) {
                    callback(r)
                }
            })
        }, this._debounce ? 1000 : 0)

        this.params(_params)

        return this
    }

    post(params = {}, data = {}, callback = null) {
        let _params = this._params
        this._saving = true
        Object.assign(this._params, params)

        window.axios.post(window.route(this._route + '.'+ this._endpoints.store, this._params), data).then(r => {
            this._saving = false

            if (this._callback) {
                this._callback(r)
            }

            if (callback) {
                callback(r)
            }
        })

        this.params(_params)

        return this
    }

    update(params = {}, data = {}, callback = null) {
        let _params = this._params
        this._saving = true
        Object.assign(this._params, params)

        window.axios.put(window.route(this._route + '.'+ this._endpoints.update, this._params), data).then(r => {
            this._saving = false

            if (this._callback) {
                this._callback(r)
            }

            if (callback) {
                callback(r)
            }
        })

        this.params(_params)

        return this
    }

    delete(id, callback, params = {}) {
        let _params = this._params
        Object.assign(this._params, params, {id: id})
        
        window.axios.delete(window.route(this._route +'.'+ this._endpoints.destroy, this._params)).then(r => {
            this.data(this.data().filter(d => {
                return d.id !== id
            }))

            if (callback) {
                callback(r)
            }
        })

        this.params(_params)

        return this
    }

    loading() {
        return this._loading
    }

    saving() {
        return this._saving
    }

    query(keyword = '', params = {}) {
        this.get(Object.assign({query: keyword}, params))
    }

    exclude(ids = []) {
        this.params({exclude: ids.join(',')})
        return this
    }

    only(ids = []) {
        this.params({only: ids.join(',')})
        return this
    }

    goTo(pageNumber) {
        this.get({page: pageNumber})
    }

    save(data = {}, update = false, id = {}, params = {}) {
        update ? this.update(Object.assign(id, params), data) : this.post(params, data)
        return this
    }

    onSuccess(callback) {
        this._callback = callback
        return this
    }
}