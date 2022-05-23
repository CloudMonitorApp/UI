<template>
    <div class="selection-list-overlay-container">
        <button class="button button--small button--icon button--text" data-icon="">{{ title }}</button>
        <fieldset class="selection-list selection-list--overlay">
            <div>
                <legend>{{ header }}</legend>
            </div>
            <div class="selection-list__option" v-for="option in options" :key="option">
                <input type="checkbox" @click="toggle(option)">
                <label>
                    <slot :option="option" name="label">
                        {{ option }}
                    </slot>
                </label>
            </div>
        </fieldset>
    </div>
</template>

<script> 
    

    export default {
        emits: ['select'],
        props: {
            title: {
                type: String
            },
            header: {
                type: String
            },
            options: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                selected: []
            }
        },
        methods: {
            toggle(option) {
                this.selected.some(e => e.id === option.id)
                    ? this.selected = this.selected.filter(e => e.id !== option.id)
                    : this.selected.push(option)

                this.$emit('select', this.selected)
            }
        }
    }
</script>