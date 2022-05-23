<template>
    <div class="relative flex items-start">
        <div class="flex items-center h-5">
            <input :id="name" aria-describedby="comments-description" :name="name" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" :checked="checked" />
        </div>
        <div class="ml-3 text-sm">
            <label :for="name" class="font-medium text-gray-700">{{ label }}</label>
            <p id="comments-description" class="text-gray-500"><slot /></p>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ['update:modelValue'],
        props: {
            label: {
                type: String
            },
            name: {
                type: String,
                default() {
                    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                },
            },
            modelValue: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                checked: this.checked
            }
        },
        watch: {
            modelValue(value) {
                this.isChecked = value
            },
            checked(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
</script>