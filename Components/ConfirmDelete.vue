<template>
    <span ref="action">
        <slot>
            <icon-button sm secondary icon="fal fa-trash-alt" class="ml-1" />
        </slot>
    </span>

    <modal v-model:open="show">
        <template v-slot:header>
            <slot name="header">
                Delete item
            </slot>
        </template>
        <slot name="text">
            Please confirm that you wish to delete the item.
        </slot>
        <template v-slot:buttons>
            <form-button delete @click="confirm">
                Delete
            </form-button>
            <div class="mx-1" />
            <form-button outline @click="show = false">
                Cancel
            </form-button>
        </template>
    </modal>
</template>

<script>
    import Modal from '@/Components/Modal.vue'
    import FormButton from '@/Components/Button.vue'
    import IconButton from '@/Components/IconButton.vue'

    export default {
        emits: ['deleted'],
        components: {
            Modal,
            FormButton,
            IconButton,
        },
        props: {
            api: {
                type: Object,
                default() {
                    return null
                }
            },
            object: {
                type: Object,
                default() {
                    return null
                }
            },
            key: {
                type: String,
                default: 'id',
            }
        },
        data() {
            return {
                show: false,
            }
        },
        mounted() {
            this.$refs.action.querySelector('*').addEventListener('click', () => { this.show = true })
        },
        methods: {
            confirm() {
                if (this.api) {
                    this.api.delete(this.object[this.key], () => {
                        this.$emit('deleted', this.object)
                        this.show = false
                    })
                }
                else {
                    this.$emit('deleted', this.object)
                    this.show = false
                }
            }
        }
    }
</script>