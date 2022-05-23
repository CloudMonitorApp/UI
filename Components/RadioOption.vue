<template>
    <div class="form__field form__field--horizontal">
        <label :for="id">
            {{ label }}
            <span class="form-info__hint" v-if="hint">{{ hint }}</span>
        </label>
        <input type="radio" :name="groupName" :value="modelValue" v-model="state" :id="id" :checked="isChecked" @change="change($event)">
    </div>
</template>

<script>
    import FormMixin from '@/Components/Forms/Mixin'
    
    export default {
        emits: ['update', 'selected', 'deselected'],
        mixins: [FormMixin],
        props: {
            checked: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                formType: 'radio',
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                isChecked: this.checked,
                groupName: this.$parent.name,
                state: this.checked,
            }
        },
        methods: {
            change(event) {
                this.onInput(event)
                this.isChecked = this.$el.querySelector('input').checked
                this.$emit(this.isChecked ? 'selected' : 'deselected')
            }
        },
        watch: {
            state() {
                this.$emit('update', this.value)

                try {
                    this.$parent.setValue(this.value)
                }
                catch (e) {
                    // Is not encapsulated in Radio Group
                }
            }
        }
    }
</script>