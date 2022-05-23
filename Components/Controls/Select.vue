<template>
    <Listbox as="div" v-model="selected">
        <ListboxLabel class="block text-sm font-medium text-gray-700">
            <slot name="title">
                <span v-html="title" />
            </slot>
        </ListboxLabel>
        <div class="mt-1 relative">
            <ListboxButton class="cursor-pointer relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <template v-if="selected">
                    <slot name="selected" :item="selected">
                        {{ getLabel(selected) }}
                    </slot>
                </template>
                <template v-else>
                    <span class="text-gray-500">
                        {{ placeholder }}
                    </span>
                </template>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions ref="list" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="item in values" :key="getValue(item)" :value="item" v-slot="{ active, selected }">
                        <li :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
                            <slot name="option" :item="item" :selected="selected" :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                    {{ getLabel(item) }}
                                </span>
                            </slot>
                            <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script>
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
    import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

    export default {
        emits: ['update:modelValue', 'update:id', 'change'],
        components: {
            Listbox,
            ListboxButton,
            ListboxLabel,
            ListboxOption,
            ListboxOptions,
            CheckIcon,
            SelectorIcon,
        },
        props: {
            modelValue: {
                type: [Object, String, Number]
            },
            id: {
                type: [Number, String],
            },
            title: {
                type: String
            },
            options: {
                type: Array,
                default() {
                    return []
                }
            },
            placeholder: {
                type: String,
                default: 'Select one'
            },
            label: {
                type: String,
                default: 'label'
            },
            value: {
                type: String,
                default: 'id'
            },
            api: {
                type: Object,
                default() {
                    return null
                }
            },
        },
        data() {
            return {
                _options: this.options,
                selected: this.modelValue,
            }
        },
        computed: {
            values() {
                return this.api
                    ? this.api.data()
                    : this._options
            },
        },
        mounted() {
            if (this.id) {
                this.selected = this.values.find(v => { return v.id === this.id }) || ''
            }

            if (this.api) {
                this.api.get()
            }
        },
        methods: {
            clear() {
                this.selected = ''
            },
            getLabel(option) {
                if (! option) {
                    return
                }

                return option[this.label]
            },
            getValue(option) {
                if (! option) {
                    return
                }

                return option[this.value]?.toString()
            },
        },
        watch: {
            selected(value) {
                this.$emit('update:modelValue', value)
                this.$emit('update:id', value?.id || value)
                this.$emit('change', value)
            },
            options(value) {
                this._options = value
            },
            id(value) {
                this.selected = this.values.find(v => { return v.id === value }) || ''
            },
        }
    }
</script>