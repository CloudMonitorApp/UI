<template>
    <div class="form__field form__field--horizontal">
        <label :for="id">
            {{ label }}
            <span class="form-info__hint" v-if="hint">{{ hint }}</span>
        </label>
        <input
                type="radio"
                :name="$parent.name"
                :value="value"
                :id="id"
                :checked="checked"
                @change="$parent.value = value">
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Boolean, Number],
                default: true
            },
            hint: {
                type: String
            },
            label: {
                type: String
            },
        },
        data() {
            return {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                checked: this.$parent.value === this.value,
            }
        }
    }
</script>