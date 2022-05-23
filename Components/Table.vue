<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-visible sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">
                    <table :class="['min-w-full divide-y divide-gray-200', isLoading ? 'blur-sm' : '']">
                        <thead class="bg-gray-50">
                            <tr>
                                <slot name="thead" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                            </tr>
                        </thead>

                        <tbody v-if="api">
                            <tr v-for="(row, rowIdx) in api.data()" :key="row.id" :class="rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <slot name="tbody" :row="row" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />
                            </tr>
                        </tbody>
                        <tbody v-else-if="rows">
                            <tr v-for="(row, rowIdx) in rows" :key="row.id" :class="rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                                <slot name="tbody" :row="row" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <slot name="tbody" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" classTr="odd:bg-white even:bg-gray-50" />
                        </tbody>

                        <slot />
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rows: {
                type: Array,
                default() {
                    return null
                }
            },
            api: {
                type: Object,
                default() {
                    return null
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isLoading() {
                return this.api
                    ? this.api.loading()
                    : this.loading
            }
        }
    }
</script>