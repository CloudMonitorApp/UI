export default {
    computed: {
        _array() {
            return {
                remove: (collection, object, property = 'id') => {
                    return collection.filter(c => {
                        return c[property] !== object[property]
                    })
                },
                sort: (collection, property = 'id', direction = 'asc') => {
                    const sortBy = (key) => {
                        return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)
                    }

                    return collection.concat().sort(sortBy(property))
                }
            }
        }
    }
}