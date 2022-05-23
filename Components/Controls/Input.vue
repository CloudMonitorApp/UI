<template>
    <div>
        <label :for="name" class="block text-sm font-medium text-gray-700">
            <slot>
                {{ label }}
            </slot>
        </label>
        <div class="mt-1">
            <textarea v-if="multiline" v-model="value" :id="name" :name="name" :maxlength="maxlength" rows="3" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
            <input :type="type" :maxlength="maxlength" :min="min" :max="max" v-else v-model="value" :id="name" :name="name" class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" :placeholder="placeholder" />
        </div>
        <p class="mt-2 text-sm text-gray-500" v-if="$slots.info || info">
            <slot name="info">
                {{ info }}
            </slot>
        </p>
    </div>
</template>

<script>
    export default {
        emits: ['update:modelValue'],
        props: {
            modelValue: {
                type: [Number, String],
            },
            label: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: ''
            },
            info: {
                type: String,
                default: null
            },
            multiline: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default() {
                    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                },
            },
            type: {
                type: String,
                default: 'text'
            },
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            maxlength: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                value: this.modelValue
            }
        },
        watch: {
            value(value) {
                this.$emit('update:modelValue', value)
            },
            modelValue(value) {
                this.value = value
            }
        }
    }
</script>
