<template>
    <Combobox as="div" v-model="selected">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
            <slot>
                <span v-html="label" />
            </slot>
        </ComboboxLabel>
        <div class="relative mt-1">
            <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query($event.target.value)" :display-value="displayValue" ref="input" />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <i v-if="canRemove && selected" class="fal fa-times mr-2 text-gray-400 hover:bg-gray-100 p-1.5 h-5 w-5 rounded-full flex items-center pt-2" @click="selected = null; $emit('change', null)"></i>
                <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions ref="options" v-if="values.length > 0 && ! api.loading()" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="item in values" :key="getValue(item)" :value="item" as="template" v-slot="{ active, selected }" @click="this.$emit('change', item)" @keyup.enter="this.$emit('change', item)">
                    <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <slot name="option" :item="item" :selected="selected" :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                            <span :class="['block truncate', selected && 'font-semibold']">
                                {{ getLabel(item) }}
                            </span>

                            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </slot>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>

<script>
    import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
    import {
        Combobox,
        ComboboxButton,
        ComboboxInput,
        ComboboxLabel,
        ComboboxOption,
        ComboboxOptions,
    } from '@headlessui/vue'

    export default {
        emits: ['update:modelValue', 'update:id', 'change'],
        components: {
            CheckIcon,
            Combobox,
            ComboboxButton,
            ComboboxInput,
            ComboboxLabel,
            ComboboxOption,
            ComboboxOptions,
            SelectorIcon,
        },
        props: {
            modelValue: {
                type: Object,
                default() {
                    return null
                }
            },
            id: {
                type: Number,
                default: null
            },
            label: {
                type: String
            },
            placeholder: {
                type: String,
                default: 'Select one'
            },
            displayValue: {
                type: Function,
                default() {
                    return null
                }
            },
            display: {
                type: String,
                default: 'name'
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
            searchProperties: {
                type: Array,
                default() {
                    return null
                }
            },
            searchParams: {
                type: Function,
                default() {
                    return (keyword) => { return {} }
                }
            },
            canRemove: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selected: this.modelValue,
                keyword: '',
            }
        },
        created() {
            if (this.id) {
                this.api.get({include: this.id}, r => {
                    this.selected = r.data.data.find(d => {
                        return d.id === this.id
                    })
                })
            }
        },
        computed: {
            values() {
                return this.api.data()
            },
        },
        methods: {
            getLabel(option) {
                if (! option) {
                    return
                }

                return option[this.display]
            },
            getValue(option) {
                if (! option) {
                    return
                }

                return option[this.value]?.toString()
            },
            query(keyword) {
                if (keyword === this.keyword) {
                    return
                }

                this.api.query(keyword, this.searchParams(keyword))
                this.keyword = keyword
            },
        },
        watch: {
            selected(newValue, oldValue) {
                this.keyword = ''
                this.$emit('update:modelValue', newValue)
                this.$emit('update:id', newValue?.id)
                this.api.query('')
            },
            id(newValue, oldValue) {
                this.api.get({include: newValue}, r => {
                    this.selected = r.data.data.find(d => {
                        return d.id === newValue
                    })
                })
            }
        }
    }
</script>