<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
           <p class="text-sm font-bold text-blue-700">
               {{ title }}
           </p>
        <p class="text-sm text-blue-700">
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import { InformationCircleIcon } from '@heroicons/vue/solid'

    export default {
        components: {
            InformationCircleIcon,
        },
        props: {
            title: {
                type: String,
                default: null
            },
            type: {
                type: String,
                default: ''
            }
        },
        computed: {
            classList() {
                let classes = ['notification vertical-spacing-bottom']

                if (this.type === 'confirm') {
                    classes.push('notification--confirm')
                }

                if (this.type === 'attention') {
                    classes.push('notification--attention')
                }

                if (this.type === 'warning') {
                    classes.push('notification--warning')
                }

                return classes
            }
        }
    }
</script>