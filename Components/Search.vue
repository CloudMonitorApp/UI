<template>
    <div>
        <label for="search" class="block text-sm font-medium text-gray-700">
            <slot name="label">
                {{ label }}
            </slot>
        </label>
        <div class="mt-1">
            <input type="text" v-model="query" name="search" id="search" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" :placeholder="placeholder" aria-describedby="search-description" />
        </div>
        <p class="mt-2 text-sm text-gray-500" id="search-description" v-if="$slots['hint']">
            <i class="fal fa-info-circle mr-2 text-gray-400"></i>
            <slot name="hint" />
        </p>
    </div>
</template>

<script>
    export default {
        emits: ['search'],
        props: {
            label: {
                type: String
            },
            hint: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: ''
            },
            api: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                query: '',
            }
        },
        methods: {
            search() {
                this.$emit('search', this.query)
                this.api.query(this.query)
            },
        },
        watch: {
            query(value) {
                this.search(value)
            }
        }
    }
</script>