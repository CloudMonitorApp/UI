<template>
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.id === state">{{ tab.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <div v-for="tab in tabs" :key="tab.name" @click="state = tab.id" :class="[tab.id === state ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer']" :aria-current="tab.id === state ? 'page' : undefined">
                        {{ tab.name }}
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div ref="container">
        <spacer />
        <slot />
    </div>
</template>

<script>
    import Spacer from '@/Components/Spacer.vue'

    export default {
        emits: ['update:modelValue'],
        components: {
            Spacer,
        },
        props: {
            modelValue: {
                type: String,
                required: true
            },
            tabs: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                state: this.modelValue,
            }
        },
        mounted() {
            this.refreshVisibleContent()
        },
        methods: {
            refreshVisibleContent() {
                this.$refs.container.querySelectorAll(':scope > [id]').forEach(c => {
                    c.getAttribute('id') === this.state
                        ? c.classList.remove('hidden')
                        : c.classList.add('hidden')
                })
            }
        },
        watch: {
            state(value) {
                this.refreshVisibleContent()
                this.$emit('update:modelValue', value)
            },
            modelValue(value) {
                this.refreshVisibleContent()
                this.state = value
            }
        }
    }
</script>