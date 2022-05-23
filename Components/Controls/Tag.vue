<template>
    <Combobox as="div" v-model="choose">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">
            <slot>
                <span v-html="label" />
            </slot>
        </ComboboxLabel>
        <div class="relative mt-1">
            <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" @change="query($event.target.value)" @keydown.enter="enter($event)" ref="input" />
            <ComboboxButton ref="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="values.length > 0 && ! api.loading()" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="item in values" :key="getValue(item)" :value="item" as="template" v-slot="{ active, selected }">
                    <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <slot name="option" :item="item" :selected="selected" :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                            <span :class="['block truncate', selected && 'font-semibold']">
                                {{ getLabel(item) }}
                            </span>
                        </slot>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>

    <div>
        <span v-for="tag in selected" :key="tag.id" @click="remove(tag)" class="tag-component">
            <i class="fal fa-times mr-2 text-gray-400 mt-0.5"></i>
            <slot :option="tag" name="tag">
                {{ tag.name }}
            </slot>
        </span>
    </div>
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
        emits: ['update:modelValue', 'update:id'],
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
                type: [Array],
                default() {
                    return []
                }
            },
            id: {
                type: [Array],
            },
            label: {
                type: String
            },
            placeholder: {
                type: String,
                default: 'Select one'
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
            canCreate: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                selected: this.modelValue,
                keyword: '',
                choose: null,
            }
        },
        created() {
            this.$nextTick(() => {
                try {
                    this.api.get({only: this.id.join(',')}, r => {
                        this.selected = r.data.data
                        this.api.exclude(this.id).get()
                    })
                }
                catch(e) {
                    // Catch uncaught proxy
                }
            })
        },
        computed: {
            values() {
                return this.api.data().filter(v => {
                    if (this.keyword === '') {
                        return true
                    }

                    return (this.searchProperties || [this.display]).some(p => {
                        if (! v.hasOwnProperty(p)) {
                            return false
                        }

                        return this.keyword.toLowerCase().split(' ').some(k => {
                            return v[p].toLowerCase().includes(k)
                        })
                    })
                })
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
            select(item) {
                this.selected.push(item)
                this.$refs.input.$el.value = ''
                this.api.exclude(this.selected.map(s => { return s.id }))
                this.$emit('update:modelValue', item)
                this.$emit('update:id', this.selected.map(s => { return this.getValue(s) }))
            },
            remove(item) {
                this.selected = this.selected.filter(t => {
                    return t.id !== item.id
                })

                this.api.exclude(this.selected.map(s => { return s.id }))
                this.$emit('update:modelValue', item)
                this.$emit('update:id', this.selected.map(s => { return this.getValue(s) }))
            },
            query(keyword) {
                if (keyword === this.keyword) {
                    return
                }

                this.api.query(keyword)
                this.keyword = keyword
            },
            enter(e) {
                if (! this.canCreate) {
                    return 
                }

                let api = Object.assign(Object.create(Object.getPrototypeOf(this.api)), this.api)
                let data = {}
                data[this.canCreate] = e.target.value

                api.save(data, false).onSuccess((r) => {
                    this.select(r.data.data)
                })
            }
        },
        watch: {
            choose(value) {
                this.select(value)
                this.api.get()
            }
        }
    }
</script>