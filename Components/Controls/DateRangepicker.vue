<template>
    <div>
        <label :for="name" class="block text-sm font-medium text-gray-700">
            <slot>
                {{ label }}
            </slot>
        </label>
        <litepie-datepicker
                ref="litepie"
                :i18n="locale"
                :id="name"
                :formatter="displayFormat"
                separator=" til og med "
                v-model="dateValue"
            />
    </div>
</template>

<script>
    import Locale from '@/Mixins/Locale.js'
    import DateTime from '@/Mixins/DateTime.js'
    import LitepieDatepicker from 'litepie-datepicker-tw3';

    export default {
        emits: ['update:from', 'update:to', 'range'],
        mixins: [Locale, DateTime],
        components: { LitepieDatepicker },
        props: {
            label: {
                type: String,
                default: null
            },
            from: {
                type: String,
                default: null
            },
            to: {
                type: String,
                default: null
            },
            displayFormat: {
                type: Object,
                default() {
                    return {
                        date: 'DD MMM YYYY',
                        month: 'MMM',
                    }
                }
            },
            format: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default() {
                    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                },
            },
        },
        mounted() {
            this.$refs.litepie.pickerValue = this.dateValue.join(this.$refs.litepie.separator)
        },
        data() {
            return {
                dateValue: [this.dateTime(this.from).format(this.displayFormat.date), this.dateTime(this.to).format(this.displayFormat.date)],
            }
        },
        watch: {
            dateValue(range) {
                this.$emit('update:from', this.dateTime(range[0]).format(this.format))
                this.$emit('update:to', this.dateTime(range[1]).format(this.format))
                this.$emit('range', [this.dateTime(range[0]).format(this.format), this.dateTime(range[1]).format(this.format)])
            },
            from(value) {
                this.dateValue[0] = this.dateTime(value).format(this.displayFormat.date)
                this.$refs.litepie.pickerValue = this.dateValue.join(this.$refs.litepie.separator)
            },
            to(value) {
                this.dateValue[1] = this.dateTime(value).format(this.displayFormat.date)
                this.$refs.litepie.pickerValue = this.dateValue.join(this.$refs.litepie.separator)
            }
        }
    }
</script>