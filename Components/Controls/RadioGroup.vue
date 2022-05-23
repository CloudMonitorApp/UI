<template>
    <fieldset v-if="fieldset">
        <legend>
            <div class="fieldset__legend">
                <slot name="title" />
            </div>
        </legend>
        <slot />
    </fieldset>
    <template v-else>
        <slot />
    </template>
</template>

<script>
    export default {
        emits: ['update:modelValue'],
        props: {
            modelValue: {
                type: [String, Boolean, Number]
            },
            name: {
                type: String,
                default() {
                    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                },
            },
            horizontal: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.fieldset = window._.get(this.$el, ['parentElement', 'tagName'], '') === 'FORM'
            })
        },
        data() {
            return {
                value: this.modelValue,
                fieldset: false
            }
        },
        watch: {
            value(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
</script>