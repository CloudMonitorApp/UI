<template>
    <fieldset v-if="window._.get($el, ['parentElement', 'tagName'], '') === 'FORM'">
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
        emits: ['select'],
        props: {
            name: {
                type: String,
                required: true
            },
            horizontal: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            setValue(value) {
                this.$emit('select', value)
            }
        }
    }
</script>